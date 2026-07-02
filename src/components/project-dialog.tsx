import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import { Project } from "@/constants/projects";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 max-w-3xl h-[90vh] sm:max-h-[800px] p-0 overflow-hidden">
        <ScrollArea className="flex-1">
          {/* Hero image */}
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Header */}
          <div className="px-6 pt-6 pb-2">
            <Badge variant="secondary" className="mb-2">
              {project.subtitle}
            </Badge>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground sm:text-3xl">
                {project.title}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-3 border-b border-border px-6 py-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2"
              >
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-xs font-semibold text-foreground">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="px-6 py-6">
            <Tabs defaultValue="description">
              <TabsList className="mb-6 w-full flex">
                <TabsTrigger value="description" className="flex-1">
                  Descrição
                </TabsTrigger>
                <TabsTrigger value="architecture" className="flex-1">
                  Arquitetura
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Problema
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.details.problem}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Desafios & Aprendizados
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.details.challenges}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Features Principais
                  </h4>
                  <ul className="space-y-1.5">
                    {project.details.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="architecture" className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Diagrama do Sistema
                  </h4>
                  <div className="rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
                    {project.architecture.diagram}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Decisões Técnicas
                  </h4>
                  <ul className="space-y-1.5">
                    {project.architecture.decisions.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Tech tags + links */}
        <div className="shrink-0 flex flex-col gap-4 border-t border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between bg-background">
          <div className="flex flex-wrap gap-1.5">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent px-2 py-0.5 font-mono text-xs text-accent-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.links.github && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </a>
              </Button>
            )}
            {project.links.docs && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4" />
                  Docs
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
