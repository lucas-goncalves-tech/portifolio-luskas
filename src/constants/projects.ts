export interface Project {
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
    challenges: string;
    features: string[];
  };
  architecture: {
    diagram: string;
    decisions: string[];
    patterns: string[];
  };
  images: { title: string; url: string }[];
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
}

export const projects: Project[] = [
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
      "Scalar",
    ],
    category: ["Node.js", "TypeScript", "Docker"],
    metrics: [
      { label: "Endpoints", value: "30+" },
      { label: "Cobertura", value: "Zod 100%" },
      { label: "Documentação", value: "OpenAPI" },
    ],
    details: {
      problem:
        "Queria construir uma aplicação fullstack completa que simulasse um e-commerce real, cobrindo autenticação segura, checkout, transactions e lidar com race conditions, para consolidar meus conhecimentos em backend.",
      challenges:
        "O maior desafio foi implementar transactions e impedir race conditions na parte de comprar um livro, e implementar pela primeira vez um cloud storage como Cloudinary para armazenar a thumbnail e a imagem full para a visualização do livro na página do mesmo.",
      features: [
        "Autenticação JWT com refresh token em HTTP-only cookies",
        "CRUD completo de livros com upload de imagens no Cloudinary",
        "Sistema de reviews com avaliações por estrelas",
        "Painel admin com dashboard de métricas e vendas",
        "Validação de dados com Zod em todas as rotas",
        "Documentação interativa da API com OpenAPI e Scalar",
        "Graceful Shutdown para fechar conexão de forma segura com o DB",
      ],
    },
    architecture: {
      diagram:
        "Next.js (SSR + Client) -> Express API -> Prisma ORM -> PostgreSQL | Cloudinary (imagens)",
      decisions: [
        "Express com arquitetura em camadas (Controller → Service → Repository) para separação de responsabilidades",
        "Prisma como ORM pela type-safety e migrations automáticas",
        "HTTP-only cookies para refresh e access tokens ao invés de localStorage por segurança",
        "Docker Compose para rodar facilmente web, api, db e db_test (para testes de integração sem afetar o db original) em ambiente local",
      ],
      patterns: [
        "Repository Pattern",
        "Service Layer",
        "Controller Layer",
        "DTO Validation (Zod)",
        "Global error handling",
        "Transaction Management",
        "Dependency Injection",
        "SSR com Server Fetch",
      ],
    },
    images: [
      { title: "Login", url: "/bookstore/login.png" },
      { title: "Cadastro", url: "/bookstore/register.png" },
      { title: "Home (Banner)", url: "/bookstore/home_banner.png" },
      { title: "Home (Produtos)", url: "/bookstore/home_items_page.png" },
      { title: "Detalhes do Livro", url: "/bookstore/book.png" },
      { title: "Avaliações", url: "/bookstore/book_review.png" },
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
    ],
    links: {
      github: "https://github.com/lucas-goncalves-tech/bookstore-fullstack",
      live: "https://example.com",
      docs: "https://example.com/docs",
    },
  },
];
