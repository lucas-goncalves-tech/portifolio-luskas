"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Page() {
  useScrollAnimation();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
        {/*<Contact /> */}
      </main>
      <Footer />
    </>
  );
}
