"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Detached Logo - Fixed Top Left */}
      <Link href="/" className="fixed top-10 left-5 md:left-10 z-[101] group">
        <div className="bg-primary p-2 rounded-2xl backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-110 shadow-lg shadow-primary/40">
          <Image 
            src="/assets/resolver_logo.png" 
            alt="Resolvr" 
            width={40} 
            height={40} 
            className="w-10 h-10 object-contain"
          />
        </div>
      </Link>

      {/* Floating Centered Navbar */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2.5rem)] md:w-auto">
        <div className="bg-white/40 backdrop-blur-2xl border border-black/5 rounded-[40px] px-6 md:px-10 py-4 flex items-center justify-between md:justify-center gap-6 md:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          
          <div className="hidden md:flex items-center gap-8">
            <div className="dm-sans-ui flex gap-6 text-sm font-medium text-slate-600">
              <Link href="#how-it-works" className="whitespace-nowrap hover:text-primary transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">How it Works</Link>
              <Link href="#stats" className="whitespace-nowrap hover:text-primary transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Analytics</Link>
              <Link href="#tech" className="whitespace-nowrap hover:text-primary transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Technology</Link>
            </div>
            
            <div className="h-6 w-px bg-slate-900/10"></div>

            <div className="flex gap-3">
              <Show when="signed-out">
                <div className="flex gap-2">
                  <SignInButton mode="modal">
                    <button className="dm-sans-ui whitespace-nowrap text-sm font-medium px-6 py-3 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 border border-slate-900/10 rounded-2xl transition-all hover:scale-105 active:scale-95">
                      Portal Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="dm-sans-ui whitespace-nowrap text-sm font-medium px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/10 rounded-2xl transition-all hover:scale-105 active:scale-95">
                      Join Resolvr
                    </button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard/settings"
                    aria-label="Open local settings"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-white/70 text-slate-600 transition-all hover:border-primary/20 hover:bg-primary/10 hover:text-primary hover:scale-110 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      computer
                    </span>
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10 rounded-xl transition-transform hover:scale-110",
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="Open full settings"
                        labelIcon={
                          <span className="material-symbols-outlined text-[18px]">
                            tune
                          </span>
                        }
                        onClick={() => {
                          window.location.href = "/dashboard/settings";
                        }}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                  <Link href="/dashboard" className="dm-sans-ui whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg shadow-black/10 hover:scale-105 active:scale-95">
                    Dashboard
                  </Link>
                </div>
              </Show>
            </div>
          </div>
          
          <div className="md:hidden flex items-center justify-end w-full">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined text-slate-900 cursor-pointer hover:text-primary transition-colors">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 md:hidden animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="dm-sans-ui text-base font-medium text-slate-600 hover:text-primary transition-colors">How it Works</Link>
              <Link href="#stats" onClick={() => setIsMobileMenuOpen(false)} className="dm-sans-ui text-base font-medium text-slate-600 hover:text-primary transition-colors">Analytics</Link>
              <Link href="#tech" onClick={() => setIsMobileMenuOpen(false)} className="dm-sans-ui text-base font-medium text-slate-600 hover:text-primary transition-colors">Technology</Link>
            </div>
            
            <div className="h-px w-full bg-slate-900/10"></div>
            
            <div className="flex flex-col gap-3">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="dm-sans-ui w-full text-base font-medium px-6 py-4 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 border border-slate-900/10 rounded-2xl transition-all">
                    Portal Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="dm-sans-ui w-full text-base font-medium px-6 py-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/10 rounded-2xl transition-all">
                    Join Resolvr
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-12 h-12 rounded-xl",
                          },
                        }}
                      />
                     <Link
                        href="/dashboard/settings"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-900/10 bg-white text-slate-600 transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          computer
                        </span>
                      </Link>
                  </div>
                  <Link href="/dashboard" className="dm-sans-ui bg-slate-900 text-white px-6 py-4 rounded-2xl text-base font-medium transition-all shadow-lg text-center" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </div>
              </Show>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
