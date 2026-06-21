import { motion } from "framer-motion";
import { Terminal, Mail, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contato" className="py-24">
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
            <span>{"~/contato"}</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Vamos conversar?
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Right side - Contact cards */}
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 w-full">
            {/* Email card */}
            <motion.a
              href="mailto:drummond05@proton.me"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group flex border bg-card items-start gap-4 rounded-xl p-6 transition-all hover:glow-border flex-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Email</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  drummond05@proton.me
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Respondo em até 24h
                </p>
              </div>
            </motion.a>

            {/* WhatsApp card */}
            <motion.a
              href="https://wa.me/5511979177274?text=Olá%20José%20Lucas!%20Vi%20seu%20portfólio%20e%20gostaria%20de%20conversar%20sobre%20"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border group flex items-start gap-4 rounded-xl p-6 transition-all hover:glow-border flex-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  WhatsApp
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  +55 (11) 97917-7274
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Para conversas rapidas
                </p>
              </div>
            </motion.a>

            {/* Terminal easter egg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-4 flex-1 hover:glow-border"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
