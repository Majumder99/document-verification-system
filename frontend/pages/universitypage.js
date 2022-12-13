import React from "react";

const universitypage = () => {
  return (
    <>
      <div class="w-full flex p-4 items-center justify-between text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div>
          <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            cid of the file
          </h5>
          <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            name of the file
          </h5>
          <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
            Upload time
          </p>
        </div>
        <button className="bg-gray-300 w-1/4 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center">
          <span>See file</span>
        </button>
      </div>
    </>
  );
};

export default universitypage;
