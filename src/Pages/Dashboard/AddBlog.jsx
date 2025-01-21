import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function AddBlog({ placeholder = "Start typing..." }) {
  const editor = useRef(null);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
    }),
    [placeholder]
  );

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", thumbnail);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const formDataDB = {
        title,
        thumbnailUrl: response?.data?.data?.display_url,
        content,
        status: "draft",
      };

      await axiosSecure.post("/createBlog", formDataDB).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTitle("");
          setThumbnail(null);
          setContent("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      });
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            ref={fileInputRef} // Attach the ref to the file input
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={newContent => setContent(newContent)}
			onChange={newContent => {}}
            className="border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Create"}
        </button>
      </form>

      {/* Preview Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <h4 className="text-xl font-bold">{title}</h4>
        <div
          className="mt-4 border-t border-gray-300 pt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
