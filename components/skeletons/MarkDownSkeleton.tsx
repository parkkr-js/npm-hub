import React from 'react';

const MarkdownSkeleton = () => {
  return (
    <div className="w-full max-h-[850px] overflow-y-auto bg-[#1e1e1e] text-white rounded-lg shadow-lg p-4 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-700 rounded-md w-3/4 mb-6"></div>

      {/* Subtitle Skeletons */}
      <div className="h-6 bg-gray-700 rounded-md w-1/2 mb-4"></div>
      <div className="h-6 bg-gray-700 rounded-md w-2/3 mb-4"></div>

      {/* Paragraph Skeletons */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-700 rounded-md w-11/12"></div>
        <div className="h-4 bg-gray-700 rounded-md w-4/5"></div>
      </div>

      {/* Code Block Skeleton */}
      <div className="my-6 !bg-[#1e1f22] rounded-2xl p-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded-md w-full"></div>
          <div className="h-4 bg-gray-700 rounded-md w-11/12"></div>
          <div className="h-4 bg-gray-700 rounded-md w-4/5"></div>
        </div>
      </div>

      {/* List Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="h-4 bg-gray-700 rounded-md w-3/4"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="h-4 bg-gray-700 rounded-md w-2/3"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="h-4 bg-gray-700 rounded-md w-4/5"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-600 px-4 py-2 bg-gray-700 w-1/4"></th>
              <th className="border border-gray-600 px-4 py-2 bg-gray-700 w-1/4"></th>
              <th className="border border-gray-600 px-4 py-2 bg-gray-700 w-1/4"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
            </tr>
            <tr>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
              <td className="border border-gray-600 px-4 py-2 bg-gray-700"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkdownSkeleton;
