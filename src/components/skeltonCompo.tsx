import React from "react";

function loadingSkeleton() {
  return (
    <div className="p-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
      </div>
    </div>
  );
}

export default loadingSkeleton;
