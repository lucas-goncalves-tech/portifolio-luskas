"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let current = 0;
      const increment = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-3xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  //{ label: "Projetos entregues", value: 15, suffix: "+" },
  { label: "Anos de experiência", value: 1, suffix: "+" },
  { label: "Tecnologias dominadas", value: 19, suffix: "+" },
];

const techCategories = [
  {
    title: "Backend",
    icon: "server",
    items: ["Node.js", "Express", "NestJS", "Prisma"],
    span: "col-span-2 row-span-1",
  },
  {
    title: "Database",
    icon: "database",
    items: ["PostgreSQL", "MongoDB"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Frontend",
    icon: "layout",
    items: ["React", "Next.js", "TypeScript"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "DevOps",
    icon: "cloud",
    items: ["Docker", "GitHub Actions", "Cloudinary"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Testing",
    icon: "flask",
    items: ["Vitest", "Supertest"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Security",
    icon: "shield",
    items: ["JWT", "OAuth2", "Helmet", "CORS"],
    span: "col-span-2 row-span-1",
  },
];

function TechIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    server: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    ),
    database: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    ),
    layout: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
    cloud: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    flask: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
    shield: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  };
  return <span className="text-primary">{icons[type]}</span>;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="sobre" className="py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>~/sobre-mim</span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Sobre Mim
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* About text */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <motion.p variants={itemVariants}>
                Olá, meu nome é José Lucas, comecei a estudar programação em
                2024 explorando frontend e design, mas logo percebi que minha
                vibe era outra — backend. Foi onde me senti entusiasmado com
                programação de verdade.
              </motion.p>
              <motion.p variants={itemVariants}>
                Desde então, tenho me dedicado a construir APIs robustas
                aplicando clean code, princípios SOLID, TDD e boas práticas de
                segurança e performance. Cada projeto é uma chance de aprender
                algo novo e fazer melhor que o anterior.
              </motion.p>
              <motion.p variants={itemVariants}>
                Estou em busca da minha primeira oportunidade para colocar tudo
                isso em prática e me tornar um especialista em backend.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="mt-10 grid grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center lg:text-left"
                  variants={itemVariants}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bento grid tech stack */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 gap-3">
              {techCategories.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  className={`glass rounded-xl p-4 transition-all hover:glow-border ${cat.span}`}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <TechIcon type={cat.icon} />
                    <h3 className="text-sm font-semibold text-foreground">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-accent px-2 py-1 font-mono text-xs text-accent-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
