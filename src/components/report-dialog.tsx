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
  Code, Terminal, FileText, ExternalLink 
} from "lucide-react";
import { SecurityReport } from "@/constants/reports";
import { cn } from "@/lib/utils";

interface ReportDialogProps {
  report: SecurityReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportDialog({ report, open, onOpenChange }: ReportDialogProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeFindingIndex, setActiveFindingIndex] = useState(0);
  
  // Sub-toggles para reduzir ruído visual
  const [pocView, setPocView] = useState<"request" | "response">("request");
  const [codeView, setCodeView] = useState<"secure" | "vuln">("secure");

  if (!report) return null;

  const SEVERITY_ORDER: Record<string, number> = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
  };

  const sortedFindings = [...report.findings].sort((a, b) => {
    const orderA = SEVERITY_ORDER[a.severity] || 0;
    const orderB = SEVERITY_ORDER[b.severity] || 0;
    if (orderA !== orderB) {
      return orderB - orderA;
    }
    return b.cvss - a.cvss;
  });

  const finding = sortedFindings[activeFindingIndex] || sortedFindings[0];

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
          finding.severity === "CRITICAL" ? "bg-red-500" :
          finding.severity === "HIGH" ? "bg-orange-500" : "bg-amber-500"
        )} />

        <ScrollArea className="flex-1">
          {/* Header */}
          <div className="p-6 border-b border-border bg-muted/20">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <Badge variant="outline" className={cn("font-mono rounded-sm text-[11px]", getSeverityColor(finding.severity))}>
                {finding.severity} (CVSS {finding.cvss.toFixed(1)})
              </Badge>
              <Badge variant="outline" className="font-mono rounded-sm text-[11px] bg-background border-border/80">
                {finding.cwe}
              </Badge>
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {report.title}
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Seletor de Múltiplas Falhas no Topo */}
            {report.findings.length > 1 && (
              <div className="mb-6">
                <span className="text-[11px] font-mono font-bold text-muted-foreground block mb-2 uppercase tracking-wider">
                  Selecione a Vulnerabilidade ({report.findings.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-muted/30 border border-border/40 rounded-sm">
                  {sortedFindings.map((f, idx) => {
                    const isActive = activeFindingIndex === idx;
                    let inactiveClasses = "";
                    if (f.severity === "CRITICAL") {
                      inactiveClasses = "bg-red-500/[0.03] hover:bg-red-500/[0.08] border-red-500/15 text-red-200/80 hover:text-red-100";
                    } else if (f.severity === "HIGH") {
                      inactiveClasses = "bg-orange-500/[0.03] hover:bg-orange-500/[0.08] border-orange-500/15 text-orange-200/80 hover:text-orange-100";
                    } else if (f.severity === "MEDIUM") {
                      inactiveClasses = "bg-amber-500/[0.03] hover:bg-amber-500/[0.08] border-amber-500/15 text-amber-200/80 hover:text-amber-100";
                    } else {
                      inactiveClasses = "bg-blue-500/[0.03] hover:bg-blue-500/[0.08] border-blue-500/15 text-blue-200/80 hover:text-blue-100";
                    }

                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveFindingIndex(idx);
                          // Reset sub-toggles ao mudar de finding
                          setPocView("request");
                          setCodeView("secure");
                        }}
                        className={cn(
                          "text-xs font-mono px-3 py-2 rounded-sm transition-all cursor-pointer border text-left flex items-center gap-2",
                          isActive
                            ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                            : inactiveClasses
                        )}
                      >
                        <span className={cn(
                          "px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold shrink-0",
                          isActive
                            ? "bg-primary-foreground text-primary"
                            : f.severity === "CRITICAL"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : f.severity === "HIGH"
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : f.severity === "MEDIUM"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        )}>
                          {f.severity}
                        </span>
                        <span className="truncate">{f.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conteúdo com abas */}
            <Tabs key={finding.id} defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto items-stretch bg-muted/60 p-1 rounded-sm mb-6 border border-border/50">
                <TabsTrigger value="overview" className="text-xs sm:text-sm font-mono py-2 px-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  <span className="hidden sm:inline">1. Visão Geral</span>
                  <span className="inline sm:hidden">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="poc" className="text-xs sm:text-sm font-mono py-2 px-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  <span className="hidden sm:inline">2. Prova de Conceito</span>
                  <span className="inline sm:hidden">PoC</span>
                </TabsTrigger>
                <TabsTrigger value="remediation" className="text-xs sm:text-sm font-mono py-2 px-2 rounded-sm data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  {report.category === "Mundo Real" ? (
                    <>
                      <span className="hidden sm:inline">3. Remediação & Mitigação</span>
                      <span className="inline sm:hidden">Remediação</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">3. Correção de Código</span>
                      <span className="inline sm:hidden">Correção</span>
                    </>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="space-y-6 outline-none">
                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <FileText className="h-4 w-4 text-primary" />
                    Descrição da Vulnerabilidade
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-sm border border-border/40">
                    {finding.description}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Impacto Técnico
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground bg-destructive/5 p-4 rounded-sm border border-destructive/10">
                    {finding.impact}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 mb-2 text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    {report.category === "Custom Labs" ? "Ambiente do Laboratório" : "Análise Técnica & Escopo"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {report.category === "Custom Labs" && report.targetStack && report.targetStack.length > 0 && (
                      <div className="border border-border/50 p-4 rounded-sm bg-muted/20">
                        <span className="text-xs font-bold font-mono text-foreground block mb-2">Componentes Alvo:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {report.targetStack.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded-sm bg-background border border-border/80 font-mono text-xs text-muted-foreground">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {finding.vulnerableEndpoint && (
                      <div className="border border-border/50 p-4 rounded-sm bg-muted/20 sm:col-span-2">
                        <span className="text-xs font-bold font-mono text-foreground block mb-2">Endpoint / Canal Vulnerável:</span>
                        <code className="font-mono text-xs text-primary px-1.5 py-0.5 bg-background border border-border/80 rounded-sm block break-all">
                          {finding.vulnerableEndpoint}
                        </code>
                      </div>
                    )}
                    {finding.cvssVector && (
                      <div className="border border-border/50 p-4 rounded-sm bg-muted/20 sm:col-span-2">
                        <span className="text-xs font-bold font-mono text-foreground block mb-2">Vetor CVSS v3.1:</span>
                        <code className="font-mono text-xs text-muted-foreground px-1.5 py-0.5 bg-background border border-border/80 rounded-sm block break-all">
                          {finding.cvssVector}
                        </code>
                      </div>
                    )}
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
                    {finding.pocSteps.map((step, idx) => (
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
                  {/* HTTP Request/Response Toggle Container */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-foreground/80 uppercase tracking-wider">Tráfego HTTP da PoC:</span>
                      <div className="flex gap-1 p-1 bg-muted/80 border border-border/60 rounded-sm">
                        <button
                          onClick={() => setPocView("request")}
                          className={cn(
                            "text-[10px] font-mono px-3 py-1 rounded-sm transition-all cursor-pointer",
                            pocView === "request"
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                          )}
                        >
                          Requisição
                        </button>
                        <button
                          onClick={() => setPocView("response")}
                          className={cn(
                            "text-[10px] font-mono px-3 py-1 rounded-sm transition-all cursor-pointer",
                            pocView === "response"
                              ? "bg-primary text-primary-foreground font-bold shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                          )}
                        >
                          Resposta
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleCopy(pocView === "request" ? finding.pocRequest : finding.pocResponse, "poc_traffic")}
                        className="absolute right-2 top-2 h-7 gap-1 text-[10px] font-mono text-muted-foreground hover:bg-background/80 z-10"
                      >
                        {copiedField === "poc_traffic" ? (
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
                      <pre className="relative overflow-y-auto p-4 rounded-sm border border-border/80 bg-muted font-mono text-xs text-foreground/90 leading-normal max-h-[220px] whitespace-pre-wrap break-all pr-20">
                        {pocView === "request" ? finding.pocRequest : finding.pocResponse}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 3: Remediation */}
              <TabsContent value="remediation" className="space-y-6 outline-none">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold tracking-wide uppercase text-foreground">
                    {report.category === "Mundo Real" ? "Diretrizes de Remediação & Mitigação" : "Correção do Código Fonte"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Code View Toggle Container */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-foreground/80 uppercase tracking-wider">Código de Referência:</span>
                      <div className="flex gap-1 p-1 bg-muted/80 border border-border/60 rounded-sm">
                        <button
                          onClick={() => setCodeView("secure")}
                          className={cn(
                            "text-[10px] font-mono px-3 py-1 rounded-sm transition-all cursor-pointer flex items-center gap-1",
                            codeView === "secure"
                              ? "bg-emerald-500 text-background font-bold shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                          )}
                        >
                          <Shield className="h-3 w-3" />
                          Corrigido
                        </button>
                        <button
                          onClick={() => setCodeView("vuln")}
                          className={cn(
                            "text-[10px] font-mono px-3 py-1 rounded-sm transition-all cursor-pointer flex items-center gap-1",
                            codeView === "vuln"
                              ? "bg-red-500 text-white font-bold shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                          )}
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Vulnerável
                        </button>
                      </div>
                    </div>

                    <div className="relative flex flex-col">
                      <div className={cn(
                        "flex items-center justify-between px-4 py-2 border-t border-x rounded-t-sm",
                        codeView === "secure" 
                          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-500"
                          : "border-red-500/20 bg-red-500/5 text-red-500"
                      )}>
                        <span className="flex items-center gap-1.5 text-xs font-bold font-mono">
                          {codeView === "secure" ? (
                            <>
                              <Shield className="h-3.5 w-3.5" />
                              {report.category === "Mundo Real" ? "Correção Recomendada (Exemplo de Código)" : "Código Fonte Corrigido"}
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {report.category === "Mundo Real" ? "Comportamento Vulnerável (Exemplo Conceitual)" : "Código Fonte Vulnerável"}
                            </>
                          )}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleCopy(codeView === "secure" ? finding.secureCode : finding.vulnCode, "code_view")}
                          className={cn(
                            "h-6 gap-1 text-[11px] font-mono",
                            codeView === "secure" ? "text-emerald-400 hover:bg-emerald-500/10" : "text-red-400 hover:bg-red-500/10"
                          )}
                        >
                          {copiedField === "code_view" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          {copiedField === "code_view" ? "Copiado" : "Copiar"}
                        </Button>
                      </div>
                      <pre className={cn(
                        "overflow-x-auto p-4 border border-t-0 font-mono text-xs leading-relaxed max-h-[220px] rounded-b-sm",
                        codeView === "secure"
                          ? "border-emerald-500/20 bg-emerald-500/[0.02] text-emerald-200/90"
                          : "border-red-500/20 bg-red-500/[0.02] text-red-200/90"
                      )}>
                        {codeView === "secure" ? finding.secureCode : finding.vulnCode}
                      </pre>
                    </div>
                  </div>
                  
                  {/* Alternative Mitigation / WAF */}
                  {finding.alternativeMitigation && (
                    <div className="flex flex-col pt-4 border-t border-border/40">
                      <span className="text-xs font-bold font-mono text-foreground block mb-2">Mitigação Alternativa (Rede/WAF):</span>
                      <p className="text-xs leading-relaxed text-muted-foreground bg-muted/20 p-3 rounded-sm border border-border/50 font-mono">
                        {finding.alternativeMitigation}
                      </p>
                    </div>
                  )}

                  {/* References */}
                  {finding.references && finding.references.length > 0 && (
                    <div className="flex flex-col pt-4 border-t border-border/40">
                      <span className="text-xs font-bold font-mono text-foreground block mb-3">Referências e Leitura Adicional:</span>
                      <div className="flex flex-col gap-2">
                        {finding.references.map((url, idx) => (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-mono truncate"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            {url}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        {/* Footer info */}
        {report.status && (
          <div className="shrink-0 flex items-center px-6 py-4 border-t border-border bg-muted/30">
            <span className="text-xs text-muted-foreground font-mono">
              {report.status === "completed" ? "Status: Laboratório Executado" : "Status: Laboratório Planejado no Roadmap"}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
