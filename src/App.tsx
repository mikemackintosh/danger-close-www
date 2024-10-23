import React, { useState, createContext, useEffect, useMemo } from "react";
import { Gradient } from "./components/gradient";
import { Container } from "./components/container";
import { Heading, Lead, Subheading } from "./components/text";
import { Button } from "./components/button";
import { Navbar } from "./components/navbar";
import { Link, Routes, Route } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import SplatterText from "./components/splattertext";
import Logo from "./assets/dangerclose.png";
import About from "./pages/About";
import ThankYou from "./pages/ThankYou";
import Contact from "./pages/Contact";

const banner = "";
// const banner = (
//   <Link
//     to="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
//     className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
//   >
//     Danger Close launches latest product, RocketBox!
//     <ChevronRightIcon className="size-4 h-4 w-4" />
//   </Link>
// );

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.theme;
  });

  const handleClick = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }

    setTheme(localStorage.theme);

    if (theme === "dark") {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rogerwilco" element={<ThankYou />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const HomePage = () => {
  return (
    <>
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar banner={banner} />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Danger Close
          </h1>
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Security Co.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            DCSC is a Cyber Security company that provides information security
            solutions for your small, medium or enterprise-scale business. We
            have decades of experience solving some of the hardest problems for
            all types of internet connected users and devices.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/about">Learn more</Button>
            <Button variant="secondary" href="/contact">
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

const NotFound = () => {
  return (
    <>
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar banner={banner} />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            4 oh 4
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Look's like an issue finding the page you're looking for. Please try
            your request again.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/">Go Back</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default App;
