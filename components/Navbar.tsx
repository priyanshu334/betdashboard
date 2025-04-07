'use client';

import { Bell, Search, Menu, User, ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 shadow-lg flex items-center justify-between px-6 py-3 border-b border-indigo-700">
      {/* Left Side - Logo and Brand */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md transform rotate-12 overflow-hidden">
            <Image
              src="/img.jpeg" // Correct path from public folder
              alt="Logo"
              width={32}
              height={32}
              className="transform -rotate-12"
            />
          </div>
          <div className="ml-3">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">Samrat</div>
            <div className="-mt-1 text-gray-300 text-sm font-medium tracking-wider">Online Booking</div>
          </div>
        </div>
      </div>

      {/* Right Side Items */}
      <div className="flex items-center space-x-5">
        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 h-4 w-4" />
          </div>
          <input 
            type="text" 
            className="bg-indigo-950/50 border border-indigo-700 text-gray-300 text-sm rounded-full pl-10 pr-4 py-1 w-40 focus:outline-none focus:ring-1 focus:ring-pink-400" 
            placeholder="Search..." 
          />
        </div>

        <div className="hidden sm:flex items-center text-gray-300 hover:text-pink-300 cursor-pointer">
          <Globe className="h-4 w-4 mr-1" />
          <span className="text-sm">EN</span>
        </div>

        <div className="relative">
          <Bell className="text-gray-300 hover:text-pink-300 h-5 w-5 cursor-pointer transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 border-l border-indigo-700 pl-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center">
            <User className="text-gray-300 h-4 w-4" />
          </div>
          <div className="text-gray-300 text-sm font-medium">Account</div>
        </div>

        <Menu className="text-gray-300 hover:text-pink-300 h-5 w-5 cursor-pointer md:hidden transition-colors" />
      </div>
    </div>
  );
}
