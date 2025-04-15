"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Add Player", path: "/" },
    { name: "Add Member", path: "/member" },
    { name: "Money", path: "/money" },
    { name: "Bets", path: "/bets" },
    { name: "Data", path: "/data" },
    {name:"Logout",path:"/login"}
  ];

  return (
    <>
      {/* Hamburger for Mobile */}
     {/* Hamburger for Mobile */}
<div className="md:hidden fixed top-4 left-4 z-50">
  <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
    <svg
      className="w-8 h-8 text-black" // changed from text-white to text-black
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</div>

      {/* Sidebar */}
      <div
        className={`
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobileOpen ? "block fixed z-40" : "hidden md:flex"} 
          top-0 left-0 h-screen bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 shadow-xl 
          transition-all duration-300 flex-col md:relative
        `}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={() => setIsMobileOpen(false)} className="text-white">
            ✕
          </button>
        </div>

        {/* Toggle Collapse Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-4 right-4 text-white hover:text-indigo-200 transition-colors hidden md:block"
        >
          {isCollapsed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center pt-12 pb-8 border-b border-indigo-500/30">
          <div className="relative group">
            <div className={`${isCollapsed ? "w-12 h-12" : "w-24 h-24"} bg-white rounded-full shadow-lg transition-all duration-300 overflow-hidden border-4 border-indigo-400`}>
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500"></div>
            </div>
            {!isCollapsed && (
              <div className="mt-4 text-center">
                <p className="text-white font-bold text-lg">Username</p>
                <p className="text-indigo-200 text-sm">Admin</p>
              </div>
            )}
            <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-indigo-700"></div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-3 overflow-y-auto scrollbar-hide">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link href={item.path} key={item.name} onClick={() => setIsMobileOpen(false)}>
                  <div
                    className={`
                      ${isCollapsed ? "justify-center" : "justify-start px-4"} 
                      ${isActive ? "bg-teal-500 text-white shadow-md" : "text-white hover:bg-indigo-600"} 
                      py-3 rounded-lg flex items-center transition-all duration-200 transform hover:translate-x-1
                    `}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-sm ${isActive ? "bg-white" : "bg-indigo-300"}`}></div>
                    </div>
                    {!isCollapsed && (
                      <span className={`ml-3 font-medium ${isActive ? "font-semibold" : ""}`}>
                        {item.name}
                      </span>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="ml-auto">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-indigo-500/30 p-4">
          <div className={`flex ${isCollapsed ? "justify-center" : "justify-between"} items-center text-white`}>
            {!isCollapsed && <span className="text-sm">© 2025</span>}
            <div className="flex space-x-2">
              <button className="hover:text-indigo-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0..." clipRule="evenodd" />
                </svg>
              </button>
              <button className="hover:text-indigo-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4..." clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Dim background when sidebar is open on mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
