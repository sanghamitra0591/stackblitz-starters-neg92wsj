'use client';

import type { OurFileRouter } from '@/utils/uploadthing';
import { useState } from 'react';
import { UploadButton } from './UploadthingClient';

export default function ImageUploader({
  onUploaded,
  uploadedUrl,
}: {
  onUploaded?: (url: string) => void;
  uploadedUrl?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start space-y-2">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setLoading(false);
          setFileName(null);
          if (res && res[0]?.url) {
            onUploaded?.(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          setLoading(false);
          setFileName(null);
          alert(`Upload Failed! ${error.message}`);
        }}
        onUploadStart={() => {
          setLoading(true);
        }}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        {loading
          ? 'Uploading...'
          : fileName
          ? fileName
          : 'Choose File'}
      </UploadButton>

      {uploadedUrl && (
        <img
          src={uploadedUrl}
          alt="Product preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}
    </div>
  );
}
