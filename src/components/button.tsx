import React from "react";
import {
  Button as HButton,
  ButtonProps as HButtonProps,
} from "@headlessui/react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

const variants = {
  primary: clsx(
    "inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-gray-950 shadow-md",
    "whitespace-nowrap text-base font-bold text-white",
    "transition ease-in delay-50 hover:bg-white hover:text-gray-950",
    "data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
  ),
  secondary: clsx(
    "relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#ff8a60]/80",
    "hover:ring-[#ff8a60]/100 hover:bg-[#ff8a60] transition ease-in delay-50",
    "whitespace-nowrap text-base font-bold text-gray-950",
    "data-[disabled]:bg-white/15 data-[hover]:bg-white/20 data-[disabled]:opacity-40"
  ),
  outline: clsx(
    "inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]",
    "rounded-lg border border-transparent shadow ring-1 ring-black/10",
    "whitespace-nowrap text-sm font-medium text-gray-950",
    "data-[disabled]:bg-transparent data-[hover]:bg-gray-50 data-[disabled]:opacity-40"
  ),
};

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (HButtonProps & { href?: undefined })
);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant]);

  if (typeof props.href === "undefined") {
    return <HButton {...(props as HButtonProps)} className={className} />;
  }

  return (
    <Link to={props.href} className={className}>
      {props.children}
    </Link>
  );
}
