"use client";
import { uploadReviewImage } from "@/utils/APIs";
import { useUser } from "@auth0/nextjs-auth0/client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface UploadImageButtonProps {
  onChange?: (file: string) => void;
}

export default function UploadImageButton({
  onChange,
}: UploadImageButtonProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useUser();
  const searchParams = useSearchParams();
  const id = searchParams.get("id")?.split("/").pop() || "";
  const handleFile = useCallback(
    async (file: File) => {
      if (file.type.startsWith("image/")) {
        setIsUploading(true);
        setPreview(URL.createObjectURL(file));
        if (!user?.email) return;

        // Convert file to base64
        const reader = new FileReader();
        const base64String = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            // Remove the data:image/xxx;base64, prefix
            resolve(base64.split(",")[1]);
          };
          reader.readAsDataURL(file);
        });

        const res = await uploadReviewImage(
          base64String,
          id,
          file.type.split("/")[1]
        );
        const url = "https://images.omakatsepets.com/" + res.fileName;
        onChange?.(url);
        setIsUploading(false);
      }
    },
    [onChange, id, user?.email]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex items-center justify-center w-fit border-primary bg-white rounded-2xl cursor-pointer transition-colors
          ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary"
          }
          ${preview ? "p-0" : "p-5"}`}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <div className="flex items-center gap-3">
            <PlusIcon className="w-6 h-6" />
            <p className="bodyXS text-gray-500 text-center">
              Click here or drag and drop an image to upload
            </p>
          </div>
        )}
      </label>
      {isUploading && <div>Uploading image...</div>}
    </div>
  );
}
