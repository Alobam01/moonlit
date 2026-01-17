"use client";

import { useState, useCallback } from "react";
import { uploadImageToImageKit, uploadMultipleImagesToImageKit } from "@/lib/imagekit-upload";

interface UseImageKitUploadOptions {
  folder?: string;
  tags?: string[];
  useUniqueFileName?: boolean;
}

interface UseImageKitUploadReturn {
  uploadImage: (file: File, fileName?: string) => Promise<string>;
  uploadMultipleImages: (files: File[]) => Promise<string[]>;
  isUploading: boolean;
  error: Error | null;
  progress: number;
}

/**
 * React hook for uploading images to ImageKit.io
 * 
 * @param options - Upload options
 * @returns Upload functions and state
 * 
 * @example
 * ```tsx
 * const { uploadImage, isUploading, error } = useImageKitUpload({ folder: '/kittens' });
 * 
 * const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (file) {
 *     try {
 *       const url = await uploadImage(file);
 *       console.log('Uploaded:', url);
 *     } catch (err) {
 *       console.error('Upload failed:', err);
 *     }
 *   }
 * };
 * ```
 */
export function useImageKitUpload(
  options?: UseImageKitUploadOptions
): UseImageKitUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadImage = useCallback(
    async (file: File, fileName?: string): Promise<string> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        const url = await uploadImageToImageKit(file, {
          ...options,
          fileName: fileName || file.name,
        });
        setProgress(100);
        return url;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  const uploadMultipleImages = useCallback(
    async (files: File[]): Promise<string[]> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        const urls = await uploadMultipleImagesToImageKit(files, options);
        setProgress(100);
        return urls;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  return {
    uploadImage,
    uploadMultipleImages,
    isUploading,
    error,
    progress,
  };
}
