"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const titles = [
  "Desenvolvedor Back-end",
  "Arquiteto de APIs",
  "Apaixonado por segurança",
];

function useTypewriter(
  words: string[],
  typingSpeed = 80,
  deleteSpeed = 50,
  pauseTime = 2000,
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && text === currentWord) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setText(currentWord.slice(0, text.length - 1));
        }
      },
      isDeleting ? deleteSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseTime]);

  return text;
}

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/lucas-goncalves-tech",
    label: "GitHub",
  },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const floatingTechs = [
  { name: "Node.js", position: "top-4 -left-6", delay: "" },
  { name: "TS", position: "top-1/3 -right-8", delay: "animate-float-delayed" },
  {
    name: "Docker",
    position: "bottom-8 -left-4",
    delay: "animate-float-delayed-2",
  },
];

export function Hero() {
  const typedText = useTypewriter(titles);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.07)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:gap-16">
        {/* Left side - Text content (60%) */}
        <div
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          style={{ flex: "0 0 58%" }}
        >
          {/* Available badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            {"Disponível para oportunidades"}
          </div>

          {/* Greeting */}
          <p
            className="mb-2 font-mono text-sm text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            // Olá, eu sou
          </p>

          {/* Name */}
          <h1
            className="mb-3 text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl animate-fade-in-up gradient-text"
            style={{ animationDelay: "0.2s" }}
          >
            José Lucas
          </h1>

          {/* Typewriter title */}
          <div className="mb-6 flex h-8 items-center">
            <span className="font-mono text-lg text-primary sm:text-xl">
              {">"} {typedText}
            </span>
            <span className="typing-cursor ml-0.5" />
          </div>

          {/* Description */}
          <p
            className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Desenvolvedor Back-end apaixonado por arquitetura limpa, segurança e
            código escalável. Sempre aprendendo e evoluindo. Em busca de uma
            oportunidade para fazer a diferença.
          </p>

          {/* CTA buttons */}
          <div
            className="mb-8 flex flex-wrap items-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <Button size="lg" className="gap-2" asChild>
              <a href="#projetos">
                Ver Projetos
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-3 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground hover:shadow-md"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right side - Avatar (40%) */}
        <div
          className="relative flex items-center justify-center animate-fade-in"
          style={{ flex: "0 0 38%", animationDelay: "0.3s" }}
        >
          {/* Avatar with rotating border */}
          <div className="rotating-border relative h-64 w-64 overflow-hidden rounded-full sm:h-72 sm:w-72 lg:h-80 lg:w-80">
            <div className="absolute inset-1 overflow-hidden rounded-full bg-background">
              <Image
                src="/avatar.png"
                alt="Lucas - Backend Developer"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Floating tech badges */}
          {floatingTechs.map((tech) => (
            <div
              key={tech.name}
              className={`absolute ${tech.position} ${tech.delay || "animate-float"} border-primary border rounded-lg px-3 py-1.5 font-mono text-xs text-foreground`}
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
}
