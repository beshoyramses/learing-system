"use client";

import React, { useState } from 'react';
import { 
  BookOpen, 
  User, 
  Settings, 
  LogOut, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';


const SidebarLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Courses');

  const menuItems = [
    { icon: BookOpen, label: 'Courses', href: "/dashboard/" },
    { icon: BookOpen, label: 'Billing', href: "/billing" },
    { icon: User, label: 'Profile', href: "/profile" },
    { icon: Settings, label: 'Settings', href: "/setting" }
  ];

  return (
    <div className="flex">
      <div 
        className={`
          h-full 
          bg-[#191A23] 
          text-white 
          flex flex-col 
          transition-all 
          duration-300 
          ease-in-out
          relative
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="
            absolute top-4 -right-10 
            bg-[#191A23] 
            text-white 
            p-2 
            rounded-r-lg 
            hover:bg-[#4A3AFF] 
            transition-colors
            z-50
          "
        >
          {isOpen ? <ChevronsLeft size={24} /> : <ChevronsRight size={24} />}
        </button>

        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-[#2F3349] flex items-center">
          <div className="w-8 h-8 bg-[#4A3AFF] rounded-full mr-3"></div>
          {isOpen && <span className="font-bold text-lg">BESHOY</span>}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow mt-6 px-4">
          {menuItems.map((item) => (
            <div 
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`
                flex items-center ${isOpen ? 'px-4' : 'justify-center'}
                py-3 rounded-lg cursor-pointer mb-2
                ${activeItem === item.label 
                  ? 'bg-[#4A3AFF] text-white' 
                  : 'hover:bg-[#2F3349] text-[#8A8C97]'}
              `}
            >
              <item.icon className={`${isOpen ? 'mr-3' : ''}`} size={20} />
              {isOpen && <Link className="text-sm font-medium" href={item.href}>{item.label}</Link>}
            </div>
          ))}
        </nav>

        {/* Sign Out Section */}
        <div className="px-4 pb-6 mt-auto">
          <div 
            className="
              flex items-center 
              px-4 py-3 rounded-lg 
              cursor-pointer 
              hover:bg-[#4A3AFF]/10 
              text-[#8A8C97] 
              hover:text-[#4A3AFF]
              transition-colors
            "
          >
            <LogOut 
              className={`
                ${isOpen ? 'mr-3' : ''}
                stroke-[#8A8C97] 
                group-hover:stroke-[#4A3AFF]
              `} 
              size={20} 
            />
            {isOpen && <SignOutButton className="text-sm font-medium">Sign out</SignOutButton>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;