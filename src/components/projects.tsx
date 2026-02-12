"use client";

import { useState } from "react";
import { ArrowRight, Github, ExternalLink, BookOpen, X, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  techs: string[];
  category: string[];
  metrics: { label: string; value: string }[];
  details: {
    problem: string;
    solution: string;
    challenges: string;
    features: string[];
  };
  architecture: {
    diagram: string;
    decisions: string[];
    patterns: string[];
  };
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
}

const projects: Project[] = [
  {
    id: "api-gateway",
    title: "API Gateway Microservices",
    subtitle: "API REST",
    description: "Gateway centralizado para orquestração de microsserviços com rate limiting, caching e autenticação.",
    image: "/projects/project-1.jpg",
    techs: ["Node.js", "TypeScript", "Redis", "Docker", "PostgreSQL", "JWT"],
    category: ["Node.js", "TypeScript", "Docker"],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Response Time", value: "< 50ms" },
      { label: "Requests/day", value: "50k+" },
    ],
    details: {
      problem: "Múltiplos microsserviços precisavam de um ponto centralizado de entrada com autenticação, rate limiting e caching consistentes.",
      solution: "Desenvolvi um API Gateway custom com Node.js e TypeScript que gerencia autenticação JWT, implementa rate limiting com Redis e oferece caching inteligente por rota.",
      challenges: "O maior desafio foi implementar circuit breaker patterns para garantir resiliência quando serviços downstream ficavam indisponíveis.",
      features: [
        "Rate limiting por IP e por usuário",
        "Cache inteligente com invalidação automática",
        "Circuit breaker com fallback graceful",
        "Health checks automáticos",
        "Logging centralizado com correlation IDs",
      ],
    },
    architecture: {
      diagram: "Client -> API Gateway -> [Auth Service, Product Service, Order Service] -> PostgreSQL / Redis",
      decisions: [
        "Redis para cache e rate limiting pela performance em operações de leitura",
        "PostgreSQL para persistência de dados transacionais",
        "Docker Compose para orquestração local dos serviços",
      ],
      patterns: ["API Gateway", "Circuit Breaker", "Repository Pattern", "CQRS"],
    },
    links: {
      github: "https://github.com",
      live: "https://example.com",
      docs: "https://example.com/docs",
    },
  },
  {
    id: "ecommerce-api",
    title: "E-Commerce Platform",
    subtitle: "Fullstack App",
    description: "Plataforma completa de e-commerce com dashboard admin, gestão de pedidos e integração com pagamentos.",
    image: "/projects/project-2.jpg",
    techs: ["NestJS", "React", "PostgreSQL", "Prisma", "Stripe", "AWS"],
    category: ["NestJS", "React", "PostgreSQL"],
    metrics: [
      { label: "Transações", value: "5k+/mês" },
      { label: "Produtos", value: "2k+" },
      { label: "Uptime", value: "99.8%" },
    ],
    details: {
      problem: "Necessidade de uma plataforma de e-commerce escalável com painel administrativo completo e processamento de pagamentos seguro.",
      solution: "Construí uma API REST completa com NestJS, usando Prisma como ORM, integração Stripe para pagamentos e dashboard React para administração.",
      challenges: "Gerenciar consistência de dados entre pedidos, estoque e pagamentos em cenários de alta concorrência.",
      features: [
        "Catálogo de produtos com busca avançada",
        "Carrinho de compras com persistência",
        "Checkout com Stripe",
        "Dashboard admin com analytics",
        "Sistema de notificações por email",
      ],
    },
    architecture: {
      diagram: "React Dashboard -> NestJS API -> Prisma -> PostgreSQL | Stripe Webhooks",
      decisions: [
        "NestJS pela arquitetura modular e injeção de dependências nativa",
        "Prisma para type-safety no acesso ao banco",
        "Stripe para processamento seguro de pagamentos",
      ],
      patterns: ["DDD", "Repository Pattern", "Observer Pattern", "Dependency Injection"],
    },
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
  },
  {
    id: "realtime-chat",
    title: "Real-Time Chat System",
    subtitle: "WebSocket App",
    description: "Sistema de chat em tempo real com salas, notificações push e histórico persistente.",
    image: "/projects/project-3.jpg",
    techs: ["Node.js", "Socket.io", "MongoDB", "React", "Redis", "Docker"],
    category: ["Node.js", "MongoDB", "React"],
    metrics: [
      { label: "Conexões", value: "1k+ simultâneas" },
      { label: "Latência", value: "< 30ms" },
      { label: "Mensagens", value: "100k+/dia" },
    ],
    details: {
      problem: "Precisava-se de um sistema de comunicação em tempo real escalável horizontalmente com persistência de histórico.",
      solution: "Implementei um sistema de chat usando Socket.io com Redis adapter para comunicação entre instâncias e MongoDB para persistência do histórico.",
      challenges: "Escalar WebSocket horizontalmente mantendo consistência de estado entre múltiplas instâncias do servidor.",
      features: [
        "Mensagens em tempo real",
        "Salas públicas e privadas",
        "Indicador de digitação",
        "Histórico pesquisável",
        "Notificações push",
      ],
    },
    architecture: {
      diagram: "React Client -> Socket.io -> Node.js Cluster -> Redis Pub/Sub -> MongoDB",
      decisions: [
        "Socket.io para abstração de WebSocket com fallback para long-polling",
        "Redis Pub/Sub para sincronizar estado entre instâncias",
        "MongoDB para flexibilidade no schema de mensagens",
      ],
      patterns: ["Pub/Sub", "Observer", "Adapter Pattern", "Cluster Mode"],
    },
    links: {
      github: "https://github.com",
    },
  },
  {
    id: "task-manager",
    title: "Task Management API",
    subtitle: "API REST + GraphQL",
    description: "API de gerenciamento de tarefas com suporte a REST e GraphQL, autenticação OAuth2 e webhooks.",
    image: "/projects/project-4.jpg",
    techs: ["TypeScript", "Express", "GraphQL", "PostgreSQL", "Jest", "GitHub Actions"],
    category: ["TypeScript", "PostgreSQL", "GraphQL"],
    metrics: [
      { label: "Cobertura", value: "95%" },
      { label: "Endpoints", value: "40+" },
      { label: "CI/CD", value: "Automatizado" },
    ],
    details: {
      problem: "Times precisavam de uma ferramenta centralizada de gestão de tarefas com API flexível para integrações com ferramentas existentes.",
      solution: "Desenvolvi uma API dual (REST + GraphQL) com TypeScript, testes automatizados extensivos e pipeline CI/CD completo.",
      challenges: "Manter paridade de funcionalidades entre endpoints REST e resolvers GraphQL sem duplicação de lógica.",
      features: [
        "API REST e GraphQL unificada",
        "OAuth2 + JWT authentication",
        "Webhooks configuráveis",
        "Rate limiting por tier",
        "Documentação auto-gerada",
      ],
    },
    architecture: {
      diagram: "Clients -> Express Server -> [REST Routes, GraphQL Resolvers] -> Service Layer -> PostgreSQL",
      decisions: [
        "Service Layer compartilhada para evitar duplicação entre REST e GraphQL",
        "Jest + Supertest para testes de integração automatizados",
        "GitHub Actions para CI/CD com deploy automático",
      ],
      patterns: ["Service Layer", "Repository Pattern", "Strategy Pattern", "Factory Pattern"],
    },
    links: {
      github: "https://github.com",
      docs: "https://example.com/docs",
    },
  },
];

const allTechs = Array.from(new Set(projects.flatMap((p) => p.category)));

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? projects.filter((p) => p.category.includes(filter))
    : projects;

  return (
    <section id="projetos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <div className="mb-8 animate-on-scroll">
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/projetos"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Projetos
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted-foreground">
            {"Uma seleção de projetos que demonstram minhas habilidades em backend, arquitetura de sistemas e desenvolvimento fullstack."}
          </p>
        </div>

        {/* Tech filters */}
        <div className="mb-10 flex flex-wrap gap-2 animate-on-scroll">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              !filter
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            Todos
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech === filter ? null : tech)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                filter === tech
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 stagger-children">
          {filtered.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="animate-on-scroll group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    Ver Detalhes
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
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
            </button>
          ))}
        </div>

        {/* Project detail panel (modal) */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 sm:p-6 lg:p-10">
      <div
        className="relative w-full max-w-3xl animate-fade-in-up rounded-2xl border border-border bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do projeto: ${project.title}`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <Badge variant="secondary" className="mb-2">
              {project.subtitle}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3 border-b border-border px-6 py-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-xs font-semibold text-foreground">
                {metric.value}
              </span>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="px-6 py-6">
          <Tabs defaultValue="description">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="description">Descricao</TabsTrigger>
              <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
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
                  Solucao
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.details.solution}
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
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
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
                  Decisoes Tecnicas
                </h4>
                <ul className="space-y-1.5">
                  {project.architecture.decisions.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  Patterns Utilizados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.architecture.patterns.map((p) => (
                    <span
                      key={p}
                      className="rounded-md bg-accent px-2.5 py-1 font-mono text-xs text-accent-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Tech tags + links */}
        <div className="flex flex-col gap-4 border-t border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
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
              <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live
                </a>
              </Button>
            )}
            {project.links.docs && (
              <Button size="sm" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={project.links.docs} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4" />
                  Docs
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
