"use client";

import React from "react"

import { Terminal, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contato" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title */}
        <div className="mb-12 animate-on-scroll">
          <div className="mb-3 flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span>{"~/contato"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Vamos conversar?
          </h2>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left side - Form */}
          <div className="flex-1 animate-on-scroll">
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              {"Tem um projeto em mente? Quer discutir uma ideia? Estou sempre aberto para novos desafios e parcerias. Envie uma mensagem e vamos conversar."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Conte-me sobre seu projeto..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                <Send className="h-4 w-4" />
                {submitted ? "Enviado!" : "Enviar Mensagem"}
              </Button>
            </form>
          </div>

          {/* Right side - Contact cards */}
          <div className="flex flex-col gap-4 lg:w-80">
            {/* Email card */}
            <a
              href="mailto:lucas@example.com"
              className="animate-on-scroll glass group flex items-start gap-4 rounded-xl p-6 transition-all hover:glow-border"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Email</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  lucas@example.com
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Respondo em até 24h
                </p>
              </div>
            </a>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-on-scroll glass group flex items-start gap-4 rounded-xl p-6 transition-all hover:glow-border"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">WhatsApp</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  +55 (11) 99999-9999
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Para conversas rapidas
                </p>
              </div>
            </a>

            {/* Terminal easter egg */}
            <div className="animate-on-scroll rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
              </div>
              <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                <code>
{`$ curl -X POST /api/contact
{
  "status": "available",
  "response_time": "< 24h",
  "coffee_count": "∞"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
