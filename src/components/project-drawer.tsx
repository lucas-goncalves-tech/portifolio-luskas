"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, ImageIcon, LayoutDashboard, Terminal } from "lucide-react";
import { Project } from "@/constants/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ProjectDrawerProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDrawer({
  project,
  open,
  onOpenChange,
}: ProjectDrawerProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) return null;

  // Extract unique categories, if any
  const categories = Array.from(
    new Set(project.images.map((img) => img.category || "Geral"))
  );
  
  const hasCategories = categories.length > 1;
  const slides = project.images.map((img) => ({
    src: img.url,
    alt: img.title,
    title: img.title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const renderImages = (imagesToRender: typeof project.images) => (
    <div className="flex flex-col gap-4 pb-8">
      {imagesToRender.map((image, idx) => {
        // Find the absolute index in the original array to make Lightbox sync correctly
        const absoluteIndex = project.images.findIndex((i) => i.url === image.url);
        
        return (
          <div 
            key={idx}
            className="flex flex-col border border-border/50 rounded-xl overflow-hidden bg-muted/20"
          >
            <div 
              className="relative w-full aspect-video cursor-zoom-in group"
              onClick={() => openLightbox(absoluteIndex)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 flex items-center justify-center">
                <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 drop-shadow-md" />
              </div>
            </div>
            <div className="p-3 bg-card border-t border-border/50">
              <p className="text-sm font-medium text-foreground">{image.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} dismissible={!lightboxOpen}>
        <DrawerContent className="max-h-[96vh] flex flex-col">
          <DrawerHeader className="text-left border-b border-border/40 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs text-primary">{project.subtitle}</span>
            </div>
            
            <DrawerTitle className="text-2xl sm:text-3xl">{project.title}</DrawerTitle>
            <DrawerDescription className="mt-2 text-base text-foreground/80 max-w-3xl">
              {project.description}
            </DrawerDescription>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.techs.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              {project.links.github && (
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <a href={project.links.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Código
                  </a>
                </Button>
              )}
              {project.links.githubFront && (
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <a href={project.links.githubFront} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Frontend
                  </a>
                </Button>
              )}
              {project.links.githubBack && (
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <a href={project.links.githubBack} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Backend
                  </a>
                </Button>
              )}
              {project.links.docs && (
                <Button variant="outline" size="sm" className="h-9" asChild>
                  <a href={project.links.docs} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    API Docs
                  </a>
                </Button>
              )}
              {project.links.live && (
                <Button size="sm" className="h-9" asChild>
                  <a href={project.links.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Deploy
                  </a>
                </Button>
              )}
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:px-6 min-h-0">
            <div className="max-w-3xl mx-auto w-full pb-8">
              {project.images.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-xl mt-4">
                  <LayoutDashboard className="h-10 w-10 mb-4 opacity-20" />
                  <p>Galeria não disponível no momento.</p>
                </div>
              ) : hasCategories ? (
                <Tabs defaultValue={categories[0]} className="w-full mt-2">
                  <ScrollArea className="w-full mb-6">
                    <TabsList className="w-max inline-flex h-10 p-1 bg-muted/50">
                      {categories.map((cat) => (
                        <TabsTrigger key={cat} value={cat} className="px-4">
                          {cat}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="invisible" />
                  </ScrollArea>
                  
                  {categories.map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                      {renderImages(
                        project.images.filter((img) => (img.category || "Geral") === cat)
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="mt-4">
                  {renderImages(project.images)}
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
      />
    </>
  );
}
