/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function ArticlesPageComponent() {
  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-full">
        <h1>This is Articles page</h1>
      </div>

      <div className="w-4/12 h-screen border-l-2 border-gray-500">
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-4 p-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
            <div 
              key={item}
              className="bg-white border rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src="/api/placeholder/36/36"
                      alt={`User ${item}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium">Username {item}</span>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
