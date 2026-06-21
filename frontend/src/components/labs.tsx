"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Lock, FileText, Code2, AlertTriangle } from "lucide-react";
import { labs, SecurityLab } from "@/constants/labs";
import { cn } from "@/lib/utils";
import { LabDialog } from "./lab-dialog";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      staggerChildren: 0.1,
    },
  },
};

export function Labs() {
  const [selectedLab, setSelectedLab] = useState<SecurityLab | null>(null);

  return (
    <section id="labs" className="py-24 border-b border-border bg-background/50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/laboratorios-pentest"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Laboratórios de Vulnerabilidade & Relatórios
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Uma coleção de ambientes vulneráveis autocontidos e relatórios de pentest comerciais simulados. 
            Este catálogo reflete meu roadmap de estudos de segurança ofensiva.
          </p>
        </motion.div>

        {/* Labs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {labs.map((lab: SecurityLab) => (
            <motion.div
              key={lab.id}
              variants={itemVariants}
              className={cn(
                "group relative flex flex-col justify-between p-6 bg-card border rounded-sm transition-all duration-300",
                lab.status === "completed" 
                  ? "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                  : "border-border/60 hover:border-primary/40"
              )}
            >
              <div>
                {/* Lab Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-xs font-semibold text-primary block mb-1">
                      {lab.roadmapPhase}
                    </span>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {lab.title}
                    </h3>
                  </div>
                  {/* Status Badge */}
                  <div className="shrink-0">
                    {lab.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Shield className="h-3 w-3" />
                        Completo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Lock className="h-3 w-3" />
                        Planejado
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {lab.description}
                </p>

                {/* Vulnerability Tags */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-foreground/80 block mb-2 font-mono">
                    Vetores de Ataque:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.vulnerabilities.map((vuln) => (
                      <span
                        key={vuln}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-destructive/10 border border-destructive/20 font-mono text-[11px] text-destructive-foreground/90"
                      >
                        <AlertTriangle className="h-2.5 w-2.5 text-destructive" />
                        {vuln}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-foreground/80 block mb-2 font-mono">
                    Stack do Lab:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.targetStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm bg-accent/60 border border-border/50 px-2 py-0.5 font-mono text-xs text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Button
                  onClick={() => setSelectedLab(lab)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Ver Relatório Técnico (Advisory)
                </Button>
                {lab.status === "completed" && (
                  <a
                    href={lab.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold border border-border bg-transparent hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    Código
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LabDialog
        lab={selectedLab}
        open={!!selectedLab}
        onOpenChange={(open) => !open && setSelectedLab(null)}
      />
    </section>
  );
}
