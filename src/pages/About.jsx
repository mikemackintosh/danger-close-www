import React, { useState } from "react";
import { Gradient } from "../components/Gradient";
import { Container } from "../components/Container";
import { Navbar } from "../components/navbar";
import { Button } from "../components/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const aboutus = `
At **Danger Close Security Co.**, we are more than just a cyber security consulting firm; we are a team of forward-thinking leaders who have orchestrated some of the most comprehensive and impactful security programs in the industry. With decades of hands-on experience across high-growth technology, e-commerce, and fintech, we’ve made it our mission to deliver world-class security solutions that drive real results.

Our team has led multi-million-dollar security programs, managed the remediation of high-profile incidents, and built next-generation detection and response capabilities that have reduced the mean time to detection by over **600%**. Our approach blends cutting-edge technology with a deep understanding of business operations, ensuring that we not only protect organizations but also enhance their productivity and trust with stakeholders.

We’ve worked with and at global organizations, such as **DoorDash**, where we built and scaled security teams, saved the company million's annually, and architected solutions that enabled an **$8 billion** acquisition. At **Snapchat**, we pioneered large-scale zero-touch device deployments and designed security platforms for over **25,000 unique devices**, driving productivity improvements by up to **900%**.

Our expertise spans across corporate security, compliance, identity access management, and incident response, allowing us to craft tailored solutions for organizations facing today’s toughest challenges. We have successfully helped companies achieve and maintain **SOX, SOC1, SOC2, PCI**, and **HIPAA** compliance, supporting their growth while ensuring the highest standards of security.

At Danger Close Security Co., we don’t just dream about security solutions—we do them. Our track record of success in designing and implementing impactful programs speaks for itself. From custom software development to leadership coaching and security architecture, our team has the experience and drive to protect your organization from top threats, so you can focus on what you do best.

Join us as we continue to push the boundaries of what’s possible in security. **Your mission, secured.**
`;

export const About = () => {
  const [bombDrop, setBombDrop] = useState(false);

  return (
    <>
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            About Us
          </h1>
          <div
            className={"markdown-body prose lg:prose-xl dark:prose-invert mt-8"}
          >
            <Markdown remarkPlugins={[remarkGfm]}>{aboutus}</Markdown>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
