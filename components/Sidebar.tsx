"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-orange-500 border border-t-gray-300 p-4 flex flex-col items-center">
      {/* Profile Picture Placeholder */}
      <div className="w-20 h-20 bg-white rounded-full mb-6"></div>

      {/* Menu Items */}
      <div className="w-full">
        <Link href="/">
          <div
            className={`py-2 px-4 mb-2 cursor-pointer rounded-md text-center ${
              pathname === "/" ? "bg-cyan-400 text-white" : "text-black"
            }`}
          >
            Add Player
          </div>
        </Link>
        {["Money", "Bets", "Data"].map((item) => (
          <Link href={`/${item.toLowerCase()}`} key={item}>
            <div
              className={`py-2 px-4 cursor-pointer rounded-md text-center ${
                pathname === `/${item.toLowerCase()}` ? "bg-cyan-400 text-white" : "text-black"
              }`}
            >
              {item}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
