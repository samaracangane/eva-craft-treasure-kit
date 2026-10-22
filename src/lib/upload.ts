import { supabase } from "@/integrations/supabase/client";

export const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
export const MAX_BYTES = 8 * 1024 * 1024;

export function validateImage(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return `"${file.name}": use JPG, PNG ou WebP.`;
  if (file.size > MAX_BYTES) return `"${file.name}": a imagem deve ter no máximo 8 MB.`;
  return null;
}

/** Uploads to the private bucket and returns a long-lived signed URL. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  const err = validateImage(file);
  if (err) throw new Error(err);
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) throw new Error(error.message);
  const { data, error: e2 } = await supabase.storage
    .from("site-media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
  if (e2 || !data) throw new Error(e2?.message ?? "Falha ao gerar link da imagem");
  return data.signedUrl;
}
