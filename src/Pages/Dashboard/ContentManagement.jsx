import React from "react";
import { Link } from "react-router-dom";

export default function ContentManagement() {
  return (
    <div>
      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add blog
        </button>
        </Link>
      </div>
    </div>
  );
}
