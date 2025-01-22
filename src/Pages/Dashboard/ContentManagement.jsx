import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ContentManagement() {
  const axiosSecure = useAxiosSecure();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosSecure.get("/allBlogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [axiosSecure]);

  console.log(blogs);

  const handlePublish=(id)=>{
    console.log(id)
    axiosSecure.patch(`/blog-status-update/${id}`,{status: "published"}).then((res)=>{
      console.log(res.data)
    })
  }
  const handleUnpublish=(id)=>{
    console.log(id)
    axiosSecure.patch(`/blog-status-update/${id}`,{status: "draft"}).then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <div>
      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add blog
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {blogs.map((blog, index) => (
          <div key={index} className="border rounded-lg shadow p-4 mb-4">
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full h-52 object-cover rounded"
            />
            <div className="flex items-center gap-4 mt-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p
                className={`font-semibold text-sm px-3 py-1 ${
                  blog.status === "draft" ? "bg-gray-300" : "bg-green-300"
                }  rounded-full w-fit`}
              >
                {blog.status}
              </p>
            </div>

            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={()=>handlePublish(blog._id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Publish
              </button>
              <button
                onClick={()=>handleUnpublish(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Unpublish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
