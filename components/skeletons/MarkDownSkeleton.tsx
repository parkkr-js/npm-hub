import React from 'react';

export function MarkDownSkeleton() {
  return (
    <div className="w-full max-h-[850px] overflow-y-auto bg-secondary-90  text-white rounded-lg shadow-lg p-4 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-secondary-80  rounded-md w-3/4 mb-6"></div>

      {/* Subtitle Skeletons */}
      <div className="h-6 bg-secondary-80  rounded-md w-1/2 mb-4"></div>
      <div className="h-6 bg-secondary-80  rounded-md w-2/3 mb-4"></div>

      {/* Paragraph Skeletons */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-secondary-80  rounded-md w-full"></div>
        <div className="h-4 bg-secondary-80  rounded-md w-11/12"></div>
        <div className="h-4 bg-secondary-80  rounded-md w-4/5"></div>
      </div>

      {/* Code Block Skeleton */}
      <div className="my-6 !bg-secondary-80  rounded-2xl p-6">
        <div className="space-y-2">
          <div className="h-4 bg-secondary-80 rounded-md w-full"></div>
          <div className="h-4 bg-secondary-80 rounded-md w-11/12"></div>
          <div className="h-4 bg-secondary-80  rounded-md w-4/5"></div>
        </div>
      </div>

      {/* List Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-secondary-80 "></div>
          <div className="h-4 bg-secondary-80 rounded-md w-3/4"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-secondary-80 "></div>
          <div className="h-4 bg-secondary-80  rounded-md w-2/3"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-secondary-80 "></div>
          <div className="h-4 bg-secondary-80  rounded-md w-4/5"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-secondary-80  w-1/4"></th>
              <th className="px-4 py-2 bg-secondary-80  w-1/4"></th>
              <th className="px-4 py-2 bg-secondary-80  w-1/4"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 bg-secondary-80 "></td>
              <td className="px-4 py-2 bg-secondary-80 "></td>
              <td className="px-4 py-2 bg-secondary-80 "></td>
            </tr>
            <tr>
              <td className="px-4 py-2 bg-secondary-80 "></td>
              <td className="px-4 py-2 bg-secondary-80 "></td>
              <td className="px-4 py-2 bg-secondary-80 "></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
