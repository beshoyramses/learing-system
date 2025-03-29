// components/landing/navbar.tsx
"use client"

import Link from "next/link";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import MaxWidthWrapper from "../max-width-wrapper";
import { Book, LayoutDashboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/search-context";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-800">
      <MaxWidthWrapper className="flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-6 lg:px-8 gap-3">
        {/* Logo and Search Bar Container */}
        <div className="flex items-center w-full sm:w-auto justify-between gap-4">
          <Link href="/" className="logo-color text-2xl font-bold whitespace-nowrap hover:text-gray-300 transition-colors">
            BESHOY
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden sm:flex items-center gap-2 bg-[#262630]/70 text-gray-400 px-4 py-2 rounded-lg w-full max-w-md shadow-md text-sm border border-gray-700/50 hover:border-gray-600 transition-colors">
            <Book size={20} className="flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Courses"
              className="outline-none bg-transparent text-gray-200 w-full placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Right Side Icons */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-normal">
          {/* Mobile Search - Only shows on small screens */}
          <div className="sm:hidden flex items-center gap-2 bg-[#262630]/70 text-gray-400 px-4 py-2 rounded-lg w-full shadow-md text-sm border border-gray-700/50">
            <Book size={20} className="flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Courses"
              className="outline-none bg-transparent text-gray-200 w-full placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Notification and User Profile */}
          <div className="flex items-center gap-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <>
                    <div className="relative w-10 h-10 flex items-center justify-center bg-[#1b1b22]/70 rounded-full hover:bg-[#262630]/70 transition-colors cursor-pointer border border-gray-700/50">
                      <Link href={"/dashboard"}><LayoutDashboardIcon className="text-gray-400"/></Link>
                      <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                    <div className="border border-gray-700/50 rounded-full">
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-9 h-9",
                            userButtonAvatarImage: "rounded-full"
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link href="/sign-in">
                      <Button variant="outline" className="border border-gray-700/50 bg-transparent hover:bg-[#262630]/70 text-gray-200">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="bg-[#7878fc] hover:bg-[#6767d8] text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;