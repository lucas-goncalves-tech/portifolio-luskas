---
type: project
created: 2026-05-25
updated: 2026-07-02
---

# Project Conventions

## Git Workflow
- Always create a new dedicated branch for major code changes.
- Branch name format should follow: `feature/[task-slug]` or `fix/[bug-slug]`.

## Portfolio Portfolio-Luskas Scope & Identity
- **User Identity**: Backend Developer transitioning to Pentester. Built complex APIs (Java/Spring, NestJS, Express). Now focusing on Web Security, BSCP, Python Tooling.
- **About Section**: Emphasizes manual backend development background (SOLID, Clean Code) as a competitive advantage for finding Business Logic Flaws.
- **Relatórios Section**: Unified section using Shadcn Tabs to filter by `Mundo Real`, `Estudos & Certificações`, `Custom Labs`. Shows volume of technical studies while maintaining transparency about real-world experience.
- **Projects Section**: Showcases legacy backend engineering projects as a secondary portfolio (static cards, detailed gallery in Dialog modal).

## Design & UI Conventions
- **Theme Lock**: Permanently locked to dark mode (`forcedTheme="dark"`). Theme toggle button is disabled to preserve security/hacking dark aesthetics.
- **Hero Layout**: Symmetric, single-column design on desktop/mobile. Hero texts and CTAs are centered, with the circular profile photo placed below them, surrounded by floating orbiting skill tags (Burp, Caido, Python, Linux).
- **Dialog Header**: Keep dialog titles clean by only showing the main report/project title. Avoid repeating individual finding titles or adding redundant severity icons.
- **Mobile-First Tabs**: Modal findings selector must remain at the top (not sidebar). Tab trigger labels use responsive styling (`hidden sm:inline` for numbers, and short aliases like "PoC" and "Remediação" / "Correção" on mobile) to fit clean grid columns (`grid-cols-3 w-full`).
- **High-Contrast Sub-toggles**: Active states of nested sub-toggles must use solid contrasting colors (e.g., `bg-primary`, `bg-emerald-500`, `bg-red-500` in dark mode) for clear visual status cues.
