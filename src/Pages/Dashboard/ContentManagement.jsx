// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function ContentManagement() {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosSecure.get("/allBlogs");
      return response.data;
    },
  });

  const handlePublish = (id) => {
    console.log(id);
    axiosSecure
      .patch(`/blog-status-update/${id}`, { status: "published" })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };
  const handleUnpublish = (id) => {
    console.log(id);
    axiosSecure
      .patch(`/blog-status-update/${id}`, { status: "draft" })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

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
            {userInfo?.role === "Admin" && (
              <div className="flex gap-2 mt-4">
                {blog.status === "draft" ? (
                  <button
                    onClick={() => handlePublish(blog._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnpublish(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
