export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  techs: string[];
  metrics: { label: string; value: string }[];
  details: {
    problem: string;
    challenges: string;
    features: string[];
  };
  architecture: {
    diagram: string;
    decisions: string[];
  };
  images: { title: string; url: string }[];
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
  stack: "Express" | "Java";
}

export const projects: Project[] = [
  {
    id: "scaffolding-java",
    title: "Em Breve (Java)",
    subtitle: "Próximo projeto Java",
    description: "Este projeto será uma implementação robusta utilizando Java e Spring Boot.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    techs: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Status", value: "Em Planejamento" },
    ],
    details: {
      problem: "Descrição do problema que este projeto irá resolver.",
      challenges: "Desafios técnicos que pretendo superar.",
      features: [
        "Feature 1 - Descrição",
        "Feature 2 - Descrição",
      ],
    },
    architecture: {
      diagram: "Diagrama da arquitetura (ex: Java -> Spring -> JPA -> Postgres)",
      decisions: [
        "Decisão arquitetural 1",
        "Decisão arquitetural 2",
      ],
    },
    images: [],
    links: {
      github: "https://github.com/lucas-goncalves-tech/",
    },
    stack: "Java",
  },
  {
    id: "bookstore",
    title: "Bookstore",
    subtitle: "Projeto fullstack",
    description:
      "Livraria online com sistema de autenticação, carrinho de compras e checkout.",
    image: "/bookstore/home_banner.png",
    techs: [
      "NextJS",
      "Expressjs",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Docker",
      "zod",
      "vitest",
      "supertest",
      "Scalar",
      "Cloudinary",
      "Github Actions",
    ],
    metrics: [
      { label: "Endpoints", value: "20+" },
      { label: "Cobertura", value: "Zod 100%" },
      { label: "Documentação", value: "OpenAPI" },
      { label: "Vitest coverage", value: "82%" },
    ],
    details: {
      problem:
        "Queria construir uma aplicação fullstack completa que simulasse um e-commerce real, cobrindo autenticação segura, checkout, transactions e lidar com race conditions, para consolidar meus conhecimentos em backend.",
      challenges:
        "O maior desafio foi implementar transactions e impedir race conditions na parte de comprar um livro, e implementar pela primeira vez um cloud storage como Cloudinary para armazenar a thumbnail e a imagem full para a visualização do livro na página do mesmo.",
      features: [
        "Autenticação JWT com refresh token em HTTP-only cookies",
        "Express rate-limiting no login, register e globalmente",
        "CRUD completo de livros com upload de imagens no Cloudinary",
        "Sistema de reviews com avaliações por estrelas",
        "Painel admin com dashboard de métricas e vendas",
        "Validação de dados with Zod em todas as rotas",
        "Documentação interativa da API com OpenAPI e Scalar",
        "Graceful Shutdown para fechar conexão de forma segura com o DB",
      ],
    },
    architecture: {
      diagram:
        "Next.js (SSR + Client) -> Express API -> Prisma ORM -> PostgreSQL | Cloudinary (imagens)",
      decisions: [
        "Express com arquitetura em camadas (Controller → Service → Repository) para separação de responsabilidades",
        "TDD com supertest e vitest para garantir cobertura real e confiança ao refatorar, com testes de integração isolados em db_test",
        "Prisma como ORM pela type-safety e migrations automáticas",
        "HTTP-only cookies para refresh e access tokens ao invés de localStorage por segurança",
        "Docker Compose para rodar facilmente web, api, db e db_test (para testes de integração sem afetar o db original) em ambiente local",
        "Github Actions para rodar testes e lint automaticamente em cada push",
        "Cloudinary para armazenar imagens de forma segura e escalável",
      ],
    },
    images: [
      { title: "Login", url: "/bookstore/login.png" },
      { title: "Cadastro", url: "/bookstore/register.png" },
      { title: "Home", url: "/bookstore/home.png" },
      { title: "Detalhes do Livro", url: "/bookstore/book.png" },
      { title: "Carrinho", url: "/bookstore/cart.png" },
      { title: "Checkout", url: "/bookstore/checkout.png" },
      { title: "Pedido Finalizado", url: "/bookstore/finish_order.png" },
      { title: "Meus Pedidos", url: "/bookstore/orders.png" },
      { title: "Minhas Avaliações", url: "/bookstore/my_reviews.png" },
      { title: "Dashboard (Admin)", url: "/bookstore/dashboard.png" },
      {
        title: "Gerenciar Livros (Admin)",
        url: "/bookstore/manage_books_admin.png",
      },
      { title: "Adicionar Livro (Admin)", url: "/bookstore/create_book.png" },
      {
        title: "Gerenciar Categorias (Admin)",
        url: "/bookstore/admin_categories.png",
      },
      {
        title: "Criar Categoria (Admin)",
        url: "/bookstore/admin_create_categorie.png",
      },
      {
        title: "Usuários (Admin)",
        url: "/bookstore/admin_users.png",
      },
      {
        title: "Criar usuário (Admin)",
        url: "/bookstore/admin_create_user.png",
      },
      {
        title: "Editar senha do usuário (Admin)",
        url: "/bookstore/admin_change_pass_user.png",
      },
      {
        title: "Banir usuário (Admin)",
        url: "/bookstore/admin_ban_user.png",
      },
      {
        title: "Deletar permanentemente usuário (Admin)",
        url: "/bookstore/admin_delete_user.png",
      },
    ],
    links: {
      github: "https://github.com/lucas-goncalves-tech/bookstore-fullstack",
      live: "https://bookstore-by-luskas.vercel.app/",
      docs: "https://bookstore-fullstack-production.up.railway.app/api-docs",
    },
    stack: "Express",
  },
  {
    id: "notes",
    title: "Notes App",
    subtitle: "Projeto fullstack",
    description: "Aplicativo de anotações com sistema de autenticação.",
    image: "/notes/home.png",
    techs: [
      "NextJS",
      "Expressjs",
      "TypeScript",
      "better-sqlite3",
      "JWT",
      "zod",
      "Swagger",
    ],
    metrics: [
      { label: "Endpoints", value: "8" },
      { label: "Cobertura", value: "Zod 100%" },
      { label: "Documentação", value: "OpenAPI" },
    ],
    details: {
      problem:
        "Meu primeiro projeto fullstack, com intuito de aprender como o backend se comunica com o DB (sqlite) e como fazer sistema de autenticação.",
      challenges:
        "Por ser meu primeiro projeto, praticamente tudo que não fosse relacionado a JS/TS foi um desafio para mim, desde entender como usar SQL e criar uma conta de usuáro até a parte de login com JWT e funcionalidades CRUD",
      features: [
        "Autenticação JWT em cookies HTTP-only",
        "Express rate-limiting no login, register e globalmente",
        "CRUD completo de anotações",
        "Validação de dados com Zod em todas as rotas",
        "Documentação interativa da API com OpenAPI e Swagger",
        "Graceful Shutdown para fechar conexão de forma segura",
      ],
    },
    architecture: {
      diagram:
        "Next.js (SSR + Client) -> Express API -> better-sqlite3 -> sqlite",
      decisions: [
        "Express com arquitetura em camadas (Controller → Service → Repository) para separação de responsabilidades",
        "HTTP-only cookies para access tokens ao invés de localStorage por segurança",
      ],
    },
    images: [
      { title: "Login", url: "/notes/login.png" },
      { title: "Cadastro", url: "/notes/register.png" },
      { title: "Home", url: "/notes/home.png" },
      { title: "Filtro Baixa", url: "/notes/low-filter.png" },
      { title: "Filtro Média", url: "/notes/medium-filter.png" },
      { title: "Filtro Alta", url: "/notes/high-filter.png" },
      { title: "Filtro Finalizado", url: "/notes/finished-filter.png" },
    ],
    links: {
      github: "https://github.com/lucas-goncalves-tech/notes-fullstack",
      live: "https://example.com",
      docs: "https://example.com/docs",
    },
    stack: "Express",
  },
];
