/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

interface FollowDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowDialog({
  isOpen,
  onOpenChange,
}: FollowDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen);
  const [activeTab, setActiveTab] = useState('following');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div 
      className={`bg-white rounded-lg p-5 w-full max-w-md transform transition-all duration-200 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      {/* Dialog Header */}
      <div className="p-4">
        {/* Tabs */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'following'
                ? 'bg-white shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'followers'
                ? 'bg-white shadow'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Followers
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[50vh] px-4">
        <div className="space-y-4 pb-4">
          {[1, 2, 3, 4, 5].map((item) => (
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

      {/* Close button */}
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-500"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  );
}
