"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Project } from "@/constants/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        className="group relative h-auto w-full flex-col overflow-hidden rounded-xl border border-border bg-card p-0 text-left hover:bg-card hover:glow-border hover:shadow-lg focus-visible:ring-1 focus-visible:ring-ring"
        onClick={() => onSelect(project)}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-primary/30" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Ver Detalhes
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-start p-5">
          <h3 className="mb-1.5 text-lg font-bold text-foreground">
            {project.title}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground/80 whitespace-normal">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techs.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techs.length > 4 && (
              <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-muted-foreground">
                +{project.techs.length - 4}
              </span>
            )}
          </div>
        </div>
      </Button>
    </motion.div>
  );
}
