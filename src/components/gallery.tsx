"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Terminal, Images } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { projects } from "@/constants/projects";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// Componente de imagem com lazy loading
interface LazyImageProps {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
}

function LazyImage({ src, alt, title, onClick }: LazyImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="relative w-full h-28 sm:h-32 md:h-36 p-0 rounded-none flex flex-col overflow-hidden"
    >
      <div ref={imgRef} className="relative w-full flex-1 min-h-0 bg-muted">
        {!loaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        {isVisible && (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      
      <div className="w-full bg-muted/80 px-2 py-1.5 sm:py-2 z-10">
        <p className="text-[10px] sm:text-xs text-foreground font-medium truncate leading-tight">
          {title}
        </p>
      </div>
    </Button>
  );
}

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");

  const currentProject = projects.find(p => p.id === activeProject);
  const currentImages = currentProject?.images || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = currentImages.map(img => ({
    src: img.url,
    alt: img.title,
    title: img.title,
  }));

  return (
    <section id="galeria" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/galeria"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Galeria
          </h2>
          <p className="mt-2 sm:mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            Explore as imagens de cada projeto. Toque para ampliar e navegar.
          </p>
        </motion.div>

        {/* Projects Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeProject} onValueChange={setActiveProject} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap mb-4 sm:mb-6">
              <TabsList className="inline-flex h-auto gap-1.5 sm:gap-2 bg-muted/50 p-1.5 sm:p-2 w-auto">
                {projects.map((project) => (
                  <TabsTrigger
                    key={project.id}
                    value={project.id}
                    className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {project.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>

            {projects.map((project) => (
              <TabsContent key={project.id} value={project.id} className="mt-0">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Images className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{project.images.length} imagens</span>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {project.images.map((image, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                    >
                      <Card className="overflow-hidden border shadow-sm active:scale-95 transition-transform duration-150">
                        <CardContent className="p-0">
                          <LazyImage
                            src={image.url}
                            alt={image.title}
                            title={image.title}
                            onClick={() => openLightbox(index)}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

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
      </div>
    </section>
  );
}
