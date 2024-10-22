"use client";
import React from "react";

import { clsx } from "clsx";

import LogoImg from "../assets/dangerclose.png"; // Ensure your bundler or loader handles image imports correctly

export function Logo({ className }: { className?: string }) {
  return (
    <img src={LogoImg} alt="Danger Close Security" className={className} />
  );
}

export function Mark({ className }: { className?: string }) {
  return <></>;
}
