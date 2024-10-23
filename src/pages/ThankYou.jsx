import React, { useState } from "react";
import { Gradient } from "../components/gradient";
import { Container } from "../components/container";
import { Navbar } from "../components/navbar";

export const ThankYou = () => {
  const [bombDrop, setBombDrop] = useState(false);

  return (
    <>
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Thank you!
          </h1>
          <div
            className={"markdown-body prose lg:prose-xl dark:prose-invert mt-8"}
          >
            <p>We got your message and will be in touch soon!</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ThankYou;
