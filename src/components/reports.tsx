"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Code2, AlertTriangle, Box, Terminal } from "lucide-react";
import { reports, SecurityReport } from "@/constants/reports";
import { cn } from "@/lib/utils";
import { ReportDialog } from "./report-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

export function Reports() {
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null);

  return (
    <section id="reports" className="py-24 border-b border-border bg-background/50">
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
            <span>{"~/relatorios-pentest"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Relatórios de Pentest
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Catálogo dos meus achados no mundo real, certificações e ambientes vulneráveis.
          </p>
        </motion.div>

        {/* Reports Grid */}
        {/* Tabs Filter */}
        <Tabs defaultValue="Mundo Real" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap mb-8">
            <TabsList className="inline-flex h-auto gap-1.5 sm:gap-2 bg-muted/50 p-1.5 sm:p-2 w-auto">
              {["Mundo Real", "Estudos & Certificações", "Custom Labs"].map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>

          {["Mundo Real", "Estudos & Certificações", "Custom Labs"].map((cat) => {
            const currentReports = reports.filter((r) => r.category === cat);
            return (
              <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                {currentReports.length === 0 ? (
                  <div className="py-24 flex flex-col items-center justify-center text-center border border-dashed rounded-md bg-card/30">
                    <Box className="h-10 w-10 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground font-mono text-sm">
                      Nenhum relatório publicado em &quot;{cat}&quot; ainda.
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2 max-w-[300px]">
                      Em breve atualizarei esta seção com novos findings.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {currentReports.map((report: SecurityReport) => (
                      <div
                        key={report.id}
                        className={cn(
                          "group relative flex flex-col justify-between p-6 bg-card border rounded-sm transition-all duration-300",
                          "border-border/60 hover:border-primary/40"
                        )}
                      >
                        <div>
                          {/* Report Header */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {report.title}
                              </h3>
                            </div>
                            {/* Category Badge */}
                            <div className="shrink-0">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                                {report.badge}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                            {report.description}
                          </p>

                           {/* Vulnerability Tags */}
                          <div className="mb-4">
                            <span className="text-xs font-semibold text-foreground/80 block mb-2 font-mono">
                              Vetores de Ataque:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {Array.from(new Set(report.findings.flatMap((f) => f.vulnerabilities))).map((vuln) => (
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
                          {report.category === "Custom Labs" && report.targetStack && report.targetStack.length > 0 && (
                            <div className="mb-6">
                              <span className="text-xs font-semibold text-foreground/80 block mb-2 font-mono">
                                Stack do Relatório:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {report.targetStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-sm bg-accent/60 border border-border/50 px-2 py-0.5 font-mono text-xs text-accent-foreground"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <Button
                            onClick={() => setSelectedReport(report)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Ver Relatório Técnico (Advisory)
                          </Button>
                          {report.githubUrl && (
                            <a
                              href={report.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold border border-border bg-transparent hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                            >
                              <Code2 className="h-3.5 w-3.5" />
                              Código
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <ReportDialog
        key={selectedReport?.id || "empty"}
        report={selectedReport}
        open={!!selectedReport}
        onOpenChange={(open) => !open && setSelectedReport(null)}
      />
    </section>
  );
}
