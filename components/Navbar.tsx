'use client';

import { Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-orange-500 flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4">
        {/* Profile Placeholder */}
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        {/* Text */}
        <div className="text-yellow-300 text-lg font-semibold leading-tight">
          <div>Saffron</div>
          <div>Exch</div>
        </div>
      </div>
      {/* Notification Bell */}
      <Bell className="text-black" />
    </div>
  );
}
