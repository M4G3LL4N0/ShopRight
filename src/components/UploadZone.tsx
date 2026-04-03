"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useScanStore } from "@/store/useScanStore";
import { convertToBase64 } from "@/lib/image";

export function UploadZone() {
  const {
    selectedImagePreview,
    setImage,
    clearImage,
    setLoading,
    setError,
  } = useScanStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] ?? null;
      if (!file) return;

      try {
        setLoading(true);
        setError(null);
        
        const preview = URL.createObjectURL(file);
        const base64 = await convertToBase64(file);
        
        setImage(file, preview, base64);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Upload failed");
        clearImage();
      } finally {
        setLoading(false);
      }
    },
    [setImage, clearImage, setLoading, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={[
          "rounded-3xl border border-dashed p-8 text-center transition cursor-pointer",
          isDragActive
            ? "border-white/30 bg-white/10"
            : "border-white/15 bg-white/5 hover:bg-white/10",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium text-white">
          {isDragActive ? "Drop your image here" : "Upload or drag an image"}
        </p>
        <p className="mt-2 text-sm text-white/60">
          Menus, tap lists, shelves, and product displays all work.
        </p>
      </div>

      {selectedImagePreview && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <img
            src={selectedImagePreview}
            alt="Upload preview"
            className="max-h-[420px] w-full rounded-2xl object-cover"
          />
          <button
            type="button"
            onClick={clearImage}
            className="mt-4 rounded-2xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}
