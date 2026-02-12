"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Terminal } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  { id: 1, src: "/gallery/gallery-1.jpg", title: "Dashboard Analytics", category: "Web" },
  { id: 2, src: "/gallery/gallery-2.jpg", title: "App Mobile Fintech", category: "Mobile" },
  { id: 3, src: "/gallery/gallery-3.jpg", title: "Backend Code", category: "Web" },
  { id: 4, src: "/gallery/gallery-4.jpg", title: "Database Schema", category: "Web" },
  { id: 5, src: "/gallery/gallery-5.jpg", title: "CI/CD Pipeline", category: "Web" },
  { id: 6, src: "/gallery/gallery-6.jpg", title: "API Documentation", category: "Web" },
];

// Masonry-like grid sizes
const sizeClasses = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightboxIndex === null) return;
      setLightboxIndex(
        (lightboxIndex + dir + galleryItems.length) % galleryItems.length
      );
    },
    [lightboxIndex]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, navigate]);

  return (
    <section id="galeria" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <div className="mb-12 animate-on-scroll">
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/galeria"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Galeria
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            {"Capturas de trabalhos visuais, interfaces, dashboards e diagramas de arquitetura."}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 stagger-children">
          {galleryItems.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={`animate-on-scroll group relative overflow-hidden rounded-xl ${sizeClasses[i] || "col-span-1 row-span-1"}`}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/50" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-background">{item.title}</p>
                  <p className="text-xs text-background/70">{item.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Lightbox de galeria"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
              aria-label="Fechar lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute left-4 top-4 rounded-full bg-background/20 px-3 py-1.5 text-xs text-background">
              {lightboxIndex + 1} de {galleryItems.length}
            </div>

            {/* Prev */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative h-[70vh] w-full max-w-4xl">
              <Image
                src={galleryItems[lightboxIndex].src || "/placeholder.svg"}
                alt={galleryItems[lightboxIndex].title}
                fill
                className="rounded-xl object-contain"
              />
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => navigate(1)}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/20 text-background transition-colors hover:bg-background/40"
              aria-label="Proxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm font-semibold text-background">
                {galleryItems[lightboxIndex].title}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
