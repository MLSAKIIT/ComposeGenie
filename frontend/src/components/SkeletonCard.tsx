import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="h-full rounded-xl border border-gray-700 bg-gray-800 p-4 animate-pulse flex flex-col">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-md bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-gray-700 rounded" />
          <div className="h-3 w-3/4 bg-gray-700 rounded" />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-3 w-16 bg-gray-700 rounded" />
        <div className="h-3 w-16 bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-700 rounded" />
      </div>
      <div className="mt-auto pt-4 h-9 w-full bg-gray-700 rounded" />
    </div>
  );
}