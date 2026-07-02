import {
  Server,
  ShieldCheck,
  Terminal,
  ShieldAlert,
  Code2,
  Crosshair,
  Database,
  Network
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Anos de estudo", value: 2, suffix: "+" },
  { label: "Labs do PortSwigger", value: 40, suffix: "+" },
  { label: "Desafios Juice Shop", value: 10, suffix: "+" },
];

const techCategories = [
  {
    title: "Backend Engineering",
    icon: Server,
    items: ["Java (Spring Boot)", "Node.js (Express)", "TypeScript"],
    span: "col-span-2 row-span-1",
  },
  {
    title: "Offensive Security",
    icon: Crosshair,
    items: ["Burp Suite", "Caido", "FFUF", "Nuclei"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Vulnerabilities",
    icon: ShieldAlert,
    items: ["OWASP Top 10", "API Top 10", "Active Directory", "Cloud"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Scripting & Auto",
    icon: Terminal,
    items: ["Python", "Asyncio", "Bash"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "APIs & Auth",
    icon: Network,
    items: ["REST", "GraphQL", "JWT / OAuth2"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Infra & OS",
    icon: Database,
    items: ["PostgreSQL / SQLite", "Docker", "Linux"],
    span: "col-span-2 row-span-1",
  },
];

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
  return (
    <section id="sobre" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <motion.p variants={itemVariants}>
                Olá, meu nome é José Lucas. Comecei a estudar programação em 2024 explorando o
                desenvolvimento web, onde construí uma base sólida entendendo como as aplicações
                são feitas, desde o frontend até a arquitetura de APIs no backend.
              </motion.p>
              <motion.p variants={itemVariants}>
                No entanto, minha verdadeira paixão sempre foi a Segurança Ofensiva.
                Hoje, utilizo essa minha "visão de desenvolvedor" para entender as engrenagens
                dos sistemas e descobrir falhas que outras pessoas deixariam passar.
                Meu foco atual é Web Application Security.
              </motion.p>
              <motion.p variants={itemVariants}>
                Estou dedicado a concluir laboratórios práticos (PortSwigger, Juice Shop),
                estudar para certificações (como a BSCP) e desenvolver minhas próprias ferramentas
                em Python. Meu objetivo é conquistar minha primeira oportunidade como Pentester.
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
                  <span className="font-mono text-3xl font-bold text-primary">
                    {stat.value}
                    {stat.suffix}
                  </span>
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
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                    <cat.icon className="h-5 w-5 text-primary" />
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
