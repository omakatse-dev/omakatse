'use client';
import { uploadReviewImage } from '@/utils/APIs';
import { useUser } from '@auth0/nextjs-auth0/client';
import { PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { heicTo } from "heic-to";


interface UploadImageButtonProps {
  onChange?: (file: string) => void;
  setLoading?: (loading: boolean) => void;
}

export default function UploadImageButton({
  onChange,
  setLoading
}: UploadImageButtonProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useUser();
  const searchParams = useSearchParams();
  const id = searchParams.get('id')?.split('/').pop() || '';
  const handleFile = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        setLoading?.(true);
        
        let processedFile = file;
        let fileType = file.type;

        // Check if the file is a HEIC image
        if (file.type === 'image/heic' || file.type === 'image/heif') {
          const pngBlob = await heicTo({
            blob: file,
            type: "image/png",
          });
          
          processedFile = new File([pngBlob], file.name.replace(/\.(heic|HEIC)$/, '.png'), {
            type: 'image/png'
          });
          fileType = 'image/png';
        }

        if (fileType.startsWith('image/')) {
          setPreview(URL.createObjectURL(processedFile));
          if (!user?.email) return;

          // Convert file to base64
          const reader = new FileReader();
          const base64String = await new Promise<string>((resolve) => {
            reader.onload = () => {
              const base64 = reader.result as string;
              // Remove the data:image/xxx;base64, prefix
              resolve(base64.split(',')[1]);
            };
            reader.readAsDataURL(processedFile);
          });

          const res = await uploadReviewImage(
            base64String,
            id,
            fileType.split('/')[1]
          );
          const url = 'https://images.omakatsepets.com/' + res.fileName;
          onChange?.(url);
        }
      } catch (error) {
        console.log('error uploading image', error);
        alert(
          'Error uploading image, please make sure your image is less than 10MB'
        );
        setPreview(null);
      } finally {
        setIsUploading(false);
        setLoading?.(false);
      }
    },
    [onChange, id, user?.email]
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
        accept="image/*,.heic,.HEIC"
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
        className={`border-primary flex w-fit cursor-pointer items-center justify-center rounded-2xl bg-white transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'hover:border-primary border-gray-300'
        } ${preview ? 'p-0' : 'p-5'}`}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={128}
            height={128}
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex items-center gap-3">
            <PlusIcon className="h-6 w-6" />
            <p className="bodyXS text-center text-gray-500">
              Click here or drag and drop an image to upload (Max 10MB)
            </p>
          </div>
        )}
      </label>
      {isUploading && <div>Uploading image...</div>}
    </div>
  );
}
