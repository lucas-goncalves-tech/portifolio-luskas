"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/constants/projects";
import { ProjectCard } from "./project-card";
import { ProjectDialog } from "./project-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProjectsListProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const expressProjects = projects.filter((p) => p.stack === "Express");
  const javaProjects = projects.filter((p) => p.stack === "Java");

  return (
    <>
      <Tabs defaultValue="Java" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap mb-8">
          <TabsList className="inline-flex h-auto gap-2 bg-muted/50 p-2 w-auto">
            <TabsTrigger
              value="Java"
              className="text-sm px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Projetos Java
            </TabsTrigger>
            <TabsTrigger
              value="Express"
              className="text-sm px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
            >
              Projetos Express
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>

        {/* Java Tab Content */}
        <TabsContent value="Java" className="mt-0 outline-none">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {javaProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          {javaProjects.length === 0 && (
            <p className="text-center py-12 text-muted-foreground">
              Nenhum projeto Java disponível no momento.
            </p>
          )}
        </TabsContent>

        {/* Express Tab Content */}
        <TabsContent value="Express" className="mt-0 outline-none">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {expressProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          {expressProjects.length === 0 && (
            <p className="text-center py-12 text-muted-foreground">
              Nenhum projeto Express disponível no momento.
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* Project dialog */}
      <ProjectDialog
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </>
  );
}
