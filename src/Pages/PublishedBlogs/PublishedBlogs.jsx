import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const stripHtmlTags = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function PublishedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/publishedBlogs").then((res) => {
      setBlogs(res.data);
    });
  }, [axiosPublic]);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Published Blogs</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4"
          >
           
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full h-48 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover rounded-lg"
            />
         
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">
                {stripHtmlTags(blog.content).length > 100
                  ? `${stripHtmlTags(blog.content).substring(0,100)}...`
                  : stripHtmlTags(blog.content)}
              </p>
              <button
              onClick={() => openModal(blog)}
              className="w-fit bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              See Blog
            </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <img
              src={selectedBlog.thumbnailUrl}
              alt={selectedBlog.title}
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
            />
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
