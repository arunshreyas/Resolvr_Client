"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";

export default function Navbar() {
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
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <div className="bg-white/40 backdrop-blur-2xl border border-black/5 rounded-[40px] px-6 md:px-10 py-4 flex items-center justify-center gap-6 md:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          
          <div className="hidden md:flex items-center gap-8">
            <div className="dm-sans-ui flex gap-6 text-sm font-medium text-slate-600">
              <Link href="#how-it-works" className="whitespace-nowrap hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">How it Works</Link>
              <Link href="#stats" className="whitespace-nowrap hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Analytics</Link>
              <Link href="#tech" className="whitespace-nowrap hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">Technology</Link>
            </div>
            
            <div className="h-6 w-px bg-slate-900/10"></div>

            <div className="flex gap-3">
              <Show when="signed-out">
                <div className="flex gap-2">
                  <SignInButton mode="modal">
                    <button className="dm-sans-ui whitespace-nowrap text-sm font-medium px-6 py-3 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 border border-slate-900/10 rounded-2xl transition-all">
                      Portal Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="dm-sans-ui whitespace-nowrap text-sm font-medium px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/10 rounded-2xl transition-all">
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
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-white/70 text-slate-600 transition-all hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      computer
                    </span>
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10 rounded-xl",
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
                </div>
              </Show>
              <Link href="/dashboard" className="dm-sans-ui whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl text-sm font-medium transition-all shadow-lg shadow-black/10 hover:scale-105 active:scale-95">
                Dashboard
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <span className="material-symbols-outlined text-slate-900 cursor-pointer hover:text-primary transition-colors">menu</span>
          </div>
        </div>
      </nav>
    </>
  );
}
