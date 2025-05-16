"use client";

import Image from "next/image";

import popHopLogo from '../public/img/pophop-logo.svg'
import popHopMobileLogo from '../public/img/pophop-mobile.svg'

import { Button } from "@/components/ui/button"
import { AlignJustify } from "lucide-react";

export default function Navbar(props) {
  return (
    <header className="mt-6 pl-4 pr-3 py-3 sm:px-0 sm:py-2 flex items-center justify-between rounded-full sm:max-w-278.5 mx-6 sm:mx-auto z-20 bg-mobile-header shadow-mob-head sm:shadow-none sm:bg-white" style={{backdropFilter: "blur(4.75px)"}}>
      <Image alt="Pophop logo" src={popHopLogo} className="h-9 object-cover hidden sm:inline-block" />
      <Image alt="Pophop logo" src={popHopMobileLogo} className="h-5.5 object-cover sm:hidden" />
      <nav className="hidden sm:flex items-center">
        <Button variant="ghost" className="px-6 text-black font-medium rounded-full">
          Sign In
        </Button>
        <Button className="px-6  text-white rounded-full shadow-btn-shadow">
          Sign Up
        </Button>
      </nav>

      <Button size="icon" className="h-7 w-7 rounded-full bg-black sm:hidden">
        <AlignJustify color="#FFFFFF" size={16} strokeWidth={1.5} className="shrink-0" />
      </Button>
    </header>
  );
}
