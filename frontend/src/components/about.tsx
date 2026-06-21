import {
  Cloud,
  Database,
  FlaskConical,
  Layout,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Anos de experiência", value: 1, suffix: "+" },
  { label: "Tecnologias aprendidas", value: 19, suffix: "+" },
];

const techCategories = [
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "NestJS", "Prisma"],
    span: "col-span-2 row-span-1",
  },
  {
    title: "Database",
    icon: Database,
    items: ["PostgreSQL", "MongoDB"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "DevOps",
    icon: Cloud,
    items: ["Docker", "GitHub Actions", "Cloudinary"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Testing",
    icon: FlaskConical,
    items: ["Vitest", "Supertest"],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Security",
    icon: ShieldCheck,
    items: ["JWT", "OAuth2", "Helmet", "CORS"],
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
