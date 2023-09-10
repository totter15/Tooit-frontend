import { useRef, useState } from 'react';

function useUploadSticker() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadSticker, setUploadSticker] = useState<{
    file: File;
    imagePreviewUrl: string;
  } | null>(null);

  const fileHandler = () => {
    if (fileRef) {
      setUploadSticker(null);
      fileRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imagePreviewUrl: string = reader.result as string;
        setUploadSticker({ file, imagePreviewUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteUploadSticker = () => setUploadSticker(null);

  return {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  };
}

export default useUploadSticker;
