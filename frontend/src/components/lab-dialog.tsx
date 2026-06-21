"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, Shield, Play, Check, Copy, 
  Code, Terminal, FileText, ChevronRight 
} from "lucide-react";
import { SecurityLab } from "@/constants/labs";
import { cn } from "@/lib/utils";

interface LabDialogProps {
  lab: SecurityLab | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LabDialog({ lab, open, onOpenChange }: LabDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!lab) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case "CRITICAL": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "HIGH": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "MEDIUM": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 max-w-4xl h-[95vh] sm:max-h-[850px] p-0 overflow-hidden border-border bg-card rounded-sm shadow-2xl">
        {/* Banner Indicador de Severidade */}
        <div className={cn(
          "h-1.5 w-full shrink-0",
          lab.severity === "CRITICAL" ? "bg-red-500" :
          lab.severity === "HIGH" ? "bg-orange-500" : "bg-amber-500"
        )} />

        <ScrollArea className="flex-1">
          {/* Header */}
          <div className="p-6 border-b border-border bg-muted/20">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <Badge variant="outline" className="font-mono rounded-sm text-[11px] uppercase bg-background border-border/80">
                {lab.roadmapPhase}
              </Badge>
              <Badge variant="outline" className={cn("font-mono rounded-sm text-[11px]", getSeverityColor(lab.severity))}>
                {lab.severity} (CVSS {lab.cvss.toFixed(1)})
              </Badge>
              <Badge variant="outline" className="font-mono rounded-sm text-[11px] bg-background border-border/80">
                {lab.cwe}
              </Badge>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <AlertTriangle className={cn(
                  "h-6 w-6 shrink-0",
                  lab.severity === "CRITICAL" ? "text-red-500" : "text-orange-500"
                )} />
                {lab.title}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Main Content (Tabs) */}
          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto items-stretch bg-muted/60 p-1 rounded-sm mb-6 border border-border/50">
                <TabsTrigger value="overview" className="text-xs sm:text-sm font-mono py-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  1. Visão Geral
                </TabsTrigger>
                <TabsTrigger value="poc" className="text-xs sm:text-sm font-mono py-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  2. Prova de Conceito
                </TabsTrigger>
                <TabsTrigger value="remediation" className="text-xs sm:text-sm font-mono py-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  3. Correção de Código
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="space-y-6 outline-none">
                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <FileText className="h-4 w-4 text-primary" />
                    Descrição do Vulnerabilidade
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-sm border border-border/40">
                    {lab.description}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Impacto Técnico
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-destructive/5 p-4 rounded-sm border border-destructive/10">
                    {lab.impact}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    Ambiente do Laboratório
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-border/50 p-4 rounded-sm bg-muted/20">
                      <span className="text-xs font-bold font-mono text-foreground block mb-2">Componentes Alvo:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lab.targetStack.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-sm bg-background border border-border/80 font-mono text-xs text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="border border-border/50 p-4 rounded-sm bg-muted/20">
                      <span className="text-xs font-bold font-mono text-foreground block mb-2">Vulnerabilidades Mapeadas:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lab.vulnerabilities.map(v => (
                          <span key={v} className="px-2 py-0.5 rounded-sm bg-destructive/5 border border-destructive/10 font-mono text-[11px] text-destructive-foreground/90">{v}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: PoC */}
              <TabsContent value="poc" className="space-y-6 outline-none">
                <div>
                  <h4 className="flex items-center gap-2 mb-3 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <Play className="h-4 w-4 text-emerald-500" />
                    Passo a Passo de Exploração
                  </h4>
                  <ol className="space-y-2">
                    {lab.pocSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-4">
                  {/* HTTP Request */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-foreground/80 uppercase tracking-wider">Requisição HTTP PoC:</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(lab.pocRequest, "request")}
                        className="h-7 gap-1 text-[11px] font-mono text-muted-foreground hover:bg-muted/80"
                      >
                        {copiedField === "request" ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="relative overflow-y-auto p-4 rounded-sm border border-border/80 bg-muted font-mono text-xs text-foreground/90 leading-normal max-h-[180px] whitespace-pre-wrap break-all">
                      {lab.pocRequest}
                    </pre>
                  </div>

                  {/* HTTP Response */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-foreground/80 uppercase tracking-wider">Resposta HTTP do Servidor:</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(lab.pocResponse, "response")}
                        className="h-7 gap-1 text-[11px] font-mono text-muted-foreground hover:bg-muted/80"
                      >
                        {copiedField === "response" ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="relative overflow-y-auto p-4 rounded-sm border border-border/80 bg-muted font-mono text-xs text-foreground/90 leading-normal max-h-[180px] whitespace-pre-wrap break-all">
                      {lab.pocResponse}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Remediation */}
              <TabsContent value="remediation" className="space-y-6 outline-none">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold tracking-wide uppercase text-foreground">Correção do Código Fonte</span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Vulnerable Code */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 border-t border-x border-red-500/20 bg-red-500/5 rounded-t-sm">
                      <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-red-500">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Código Fonte Vulnerável
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(lab.vulnCode, "vuln")}
                        className="h-6 gap-1 text-[11px] font-mono text-red-400 hover:bg-red-500/10"
                      >
                        {copiedField === "vuln" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedField === "vuln" ? "Copiado" : "Copiar"}
                      </Button>
                    </div>
                    <pre className="overflow-x-auto p-4 border border-red-500/20 border-t-0 bg-red-500/[0.02] font-mono text-xs text-red-200/90 leading-relaxed max-h-[220px]">
                      {lab.vulnCode}
                    </pre>
                  </div>

                  {/* Secure Code */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2 border-t border-x border-emerald-500/20 bg-emerald-500/5 rounded-t-sm">
                      <span className="flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-500">
                        <Shield className="h-3.5 w-3.5" />
                        Código Fonte Corrigido (Remediação)
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(lab.secureCode, "secure")}
                        className="h-6 gap-1 text-[11px] font-mono text-emerald-400 hover:bg-emerald-500/10"
                      >
                        {copiedField === "secure" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedField === "secure" ? "Copiado" : "Copiar"}
                      </Button>
                    </div>
                    <pre className="overflow-x-auto p-4 border border-emerald-500/20 border-t-0 bg-emerald-500/[0.02] font-mono text-xs text-emerald-200/90 leading-relaxed max-h-[220px]">
                      {lab.secureCode}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Footer info */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
          <span className="text-xs text-muted-foreground font-mono">
            {lab.status === "completed" ? "Status: Laboratório Executado" : "Status: Laboratório Planejado no Roadmap"}
          </span>
          <Button variant="outline" size="sm" className="rounded-sm bg-background border-border/80 hover:bg-muted font-mono text-xs" onClick={() => onOpenChange(false)}>
            Fechar Advisory
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
