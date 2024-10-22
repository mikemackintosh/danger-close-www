import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";
import { Link as RLink } from "react-router-dom";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const Link = (props: LinkProps) => {
  return (
    <RLink to={props.href || "#"} {...props} className={props.className || ""}>
      {props.children}
    </RLink>
  );
};
