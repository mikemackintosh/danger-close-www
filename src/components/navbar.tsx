"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "./logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }, linkIndex) => (
        <Link
          key={linkIndex}
          to={href}
          className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex left-0 top-0 h-12 w-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  );
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            key={linkIndex}
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
          >
            <Link to={href} className={"text-base font-medium text-gray-950"}>
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  );
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-6 sm:pt-12">
      <div className="relative flex gap-6">
        <Link to="/" title="Home">
          <Logo className="h-12" />
        </Link>
        {/*{banner && (
          <div className="relative hidden items-center py-3 lg:flex bg-slate-900/30 rounded-full h-8 justify-center mt-4">
            {banner}
          </div>
        )} */}
        <div className="flex-grow" />
        <DesktopNav />
        <MobileNavButton />
      </div>
      <MobileNav />
    </Disclosure>
  );
}
