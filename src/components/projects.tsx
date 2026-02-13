import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectsList } from "./projects-list";

export function Projects() {
  return (
    <section id="projetos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/projetos"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Projetos
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            {
              "Uma seleção de projetos que demonstram minhas habilidades em backend, arquitetura de sistemas."
            }
          </p>
        </motion.div>

        <ProjectsList projects={projects} />
      </div>
    </section>
  );
}
