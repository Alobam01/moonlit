/**
 * ImageKit.io Upload Utilities
 * 
 * This module provides utilities for uploading images to ImageKit.io
 * using server-side authentication for secure uploads.
 */

export interface ImageKitAuthResponse {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
}

export interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  type: string;
}

async function readJsonOrThrow<T>(res: Response, context: string): Promise<T> {
  const text = await res.text();
  if (!text) {
    throw new Error(`${context}: empty response body`);
  }
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`${context}: invalid JSON response (${msg}). Body: ${text.slice(0, 300)}`);
  }
}

/**
 * Fetches authentication parameters from the server
 * for secure ImageKit uploads
 */
export async function getImageKitAuth(): Promise<ImageKitAuthResponse> {
  const res = await fetch("/api/imagekit-auth");
  
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get ImageKit auth parameters: ${errorText}`);
  }
  
  const data = await readJsonOrThrow<ImageKitAuthResponse>(res, "Failed to parse ImageKit auth response");
  
  if (!data.publicKey) {
    throw new Error("ImageKit public key is not configured");
  }
  
  return data;
}

/**
 * Uploads a file to ImageKit.io
 * 
 * @param file - The file to upload
 * @param options - Upload options
 * @returns The uploaded image URL
 */
export async function uploadImageToImageKit(
  file: File,
  options?: {
    folder?: string;
    fileName?: string;
    tags?: string[];
    useUniqueFileName?: boolean;
  }
): Promise<string> {
  try {
    // Get authentication parameters
    const { token, expire, signature, publicKey } = await getImageKitAuth();

    // Prepare form data
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", options?.fileName || file.name);
    form.append("publicKey", publicKey);
    form.append("token", token);
    form.append("signature", signature);
    form.append("expire", String(expire));
    
    if (options?.folder) {
      form.append("folder", options.folder);
    }
    
    if (options?.tags && options.tags.length > 0) {
      form.append("tags", options.tags.join(","));
    }
    
    if (options?.useUniqueFileName !== undefined) {
      form.append("useUniqueFileName", String(options.useUniqueFileName));
    }

    // Upload to ImageKit
    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("ImageKit upload error:", errorText);
      throw new Error(`Image upload failed: ${errorText}`);
    }

    const json = await readJsonOrThrow<ImageKitUploadResponse>(res, "Failed to parse ImageKit upload response");
    return json.url;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to upload image to ImageKit");
  }
}

/**
 * Uploads multiple files to ImageKit.io
 * 
 * @param files - Array of files to upload
 * @param options - Upload options
 * @returns Array of uploaded image URLs
 */
export async function uploadMultipleImagesToImageKit(
  files: File[],
  options?: {
    folder?: string;
    fileName?: string;
    tags?: string[];
    useUniqueFileName?: boolean;
  }
): Promise<string[]> {
  const uploadPromises = files.map((file, index) =>
    uploadImageToImageKit(file, {
      ...options,
      fileName: options?.fileName || `${Date.now()}-${index}-${file.name}`,
    })
  );

  return Promise.all(uploadPromises);
}
