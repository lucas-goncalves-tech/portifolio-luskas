# Dashboard - Arquitetura Global
Projeto focado em SPA super leve (Vite + React), sem Next.js.
Regras de UI:
- Estética Brutalista Premium.
- Fundo `bg-zinc-950` ou `bg-black`, bordas e tipografia afiadas. 
- Sem cantos super arredondados, no máximo `rounded-sm`.
- Detalhes de destaque em Vermelho Escuro (`border-red-900` / `text-red-500`).
- Uso do Tailwind + Shadcn/ui (mas editado para retirar características "SaaS padrão" como shadows macias e cores azuis).
Regras de Estado:
- **Server:** TanStack Query para listar, criar e editar (uso intensivo de hooks `useQuery` e `useMutation`).
- **Client:** Zustand apenas para armazenar a sessão/JWT do Admin.
