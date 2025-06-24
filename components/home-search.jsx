"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Camera, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { processImageSearch } from "@/actions/home";
import { motion, AnimatePresence } from "framer-motion";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchImage, setSearchImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  

  const router = useRouter();

  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
        toast.success("Image Uploaded Successfully");
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Error uploading image");
      };

      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".png", ".jpg"],
      },
      maxFiles: 1,
    });

  const handleTextSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async (e) => {
    e.preventDefault();

    if (!searchImage) {
      toast.error("Please Upload an image first");
      return;
    }

    await processImageFn(searchImage);
  };

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();
      if (processResult.data.make) {
        params.set("make", processResult.data.make);
      }
      if (processResult.data.bodyType) {
        params.set("bodyType", processResult.data.bodyType);
      }
      if (processResult.data.color) {
        params.set("color", processResult.data.color);
      }
      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult]);

  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="flex relative items-center">
          <Input
            type="text"
            placeholder="Search for a car, make, model or use our AI Image Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
          />
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                background: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : "",
              }}
            />
          </div>

          <Button
            type="submit"
            className="absolute right-2 rounded-full cursor-pointer"
          >
            Search
          </Button>
        </div>
      </form>

      <AnimatePresence>
        {isImageSearchActive && (
          <motion.div
            key="image-search"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4"
          >
            <form onSubmit={handleImageSearch}>
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Uploaded Image"
                      className="h-40 rounded-lg mb-4"
                    />
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setSearchImage(null);
                        setImagePreview("");
                        toast.info("Image Removed");
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div {...getRootProps()} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-white/20 mb-2">
                        {isDragActive && !isDragReject
                          ? "Drop the files here to Upload ..."
                          : "Drag & Drop a Car Image or Click to select"}
                      </p>
                      {isDragReject && (
                        <p className="text-red-500 mb-2">
                          Unsupported file type or too many files
                        </p>
                      )}
                      <p className="text-gray-400 text-sm">
                        Supports : JPG, PNG (max 5mb)
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {imagePreview && (
                <Button
                  type="submit"
                  className="w-full cursor-pointer mt-2"
                  disabled={isUploading || isProcessing}
                >
                  {isUploading
                    ? "Uploading..."
                    : isProcessing
                    ? "Analyzing Image..."
                    : "Search with this Image"}
                </Button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeSearch;
