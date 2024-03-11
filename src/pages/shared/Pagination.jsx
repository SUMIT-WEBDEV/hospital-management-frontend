import React, { useState } from "react";

const Pagination = ({ data, setData }) => {
  console.log("data ==>", data);
  const [page, setPage] = useState(1);

  return (
    <div className="flex w-full justify-center my-8">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-800 bg-white border  border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-500 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="">Prev</span>
            </a>
          </li>
          {[...Array(data.length / 5)].map((_, i) => (
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-500 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {i + 1}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-800 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-500 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
