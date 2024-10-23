import React, { useState } from "react";
import { Gradient } from "../components/gradient";
import { Container } from "../components/container";
import { Navbar } from "../components/navbar";
import { useFormData } from "herotofu-react";
import clsx from "clsx";

export const Contact = () => {
  const [bombDrop, setBombDrop] = useState(false);

  const { formState, getFormSubmitHandler } = useFormData(
    "https://public.herotofu.com/v1/9f203c30-90f2-11ef-a178-3bf18412fcbd"
  );

  return (
    <>
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Contact Us
          </h1>
          <p className="mb-8 mt-4">
            If you're interested in learning more or getting gettings connected,
            feel free to reach out!
          </p>
          <form onSubmit={getFormSubmitHandler()}>
            <div className="pt-0 mb-3">
              <input
                type="text"
                placeholder="Your name"
                name="name"
                className="focus:outline-none focus:ring focus:ring-orange-500 relative w-full px-3 py-3 text-sm text-gray-100 placeholder-gray-200  border-0 rounded-lg bg-black/20 outline-none"
                required
              />
            </div>
            <div className="pt-0 mb-3">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="focus:outline-none focus:ring focus:ring-orange-500 relative w-full px-3 py-3 text-sm text-gray-100 placeholder-gray-200  border-0 rounded-lg bg-black/20 outline-none"
                required
              />
            </div>
            <div className="pt-0 mb-3">
              <textarea
                placeholder="How can we help?"
                name="message"
                className="focus:outline-none focus:ring focus:ring-orange-500 relative w-full px-3 py-3 text-sm text-gray-100 placeholder-gray-200  border-0 rounded-lg bg-black/20 outline-none"
                required
              />
            </div>
            <div className="pt-0 mb-3">
              <button
                className={clsx(
                  "relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
                  "rounded-full border border-transparent /15 shadow-md ring-1 ring-[#ff8a60]/80",
                  "hover:ring-[#ff8a60]/100 hover:bg-[#ff8a60] transition ease-in delay-50",
                  "whitespace-nowrap text-base font-bold text-gray-950",
                  "data-[disabled]:/15 data-[hover]:/20 data-[disabled]:opacity-40"
                )}
                type="submit"
              >
                Send it
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Contact;
