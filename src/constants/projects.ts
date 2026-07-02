export interface ProjectImage {
  title: string;
  url: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string; // Cover image
  techs: string[];
  images: ProjectImage[];
  links: {
    github?: string;
    githubFront?: string;
    githubBack?: string;
    live?: string;
    docs?: string;
  };
}

export const projects: Project[] = [
  {
    id: "tiny-lms",
    title: "Tiny LMS",
    subtitle: "Plataforma E-learning Fullstack",
    description: "Sistema de Gestão de Aprendizagem (LMS) moderno com proteção avançada de rotas via JWT, player de vídeo imersivo com streaming (Buffer/Range Requests) e Painel Administrativo (RBAC).",
    image: "/placeholder.svg",
    techs: [
      "NextJS", 
      "Expressjs", 
      "TypeScript", 
      "JWT", 
      "Radix UI",
      "Streaming"
    ],
    images: [],
    links: {
      githubFront: "https://github.com/lucas-goncalves-tech/tiny-lms-web",
      githubBack: "https://github.com/lucas-goncalves-tech/tiny-lms-expressjs",
    },
  },
  {
    id: "scaffolding-java",
    title: "Em Breve (Java)",
    subtitle: "Próximo projeto Java",
    description: "Este projeto será uma implementação robusta utilizando Java e Spring Boot.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    techs: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    images: [],
    links: {
      github: "https://github.com/lucas-goncalves-tech/",
    },
  },
  {
    id: "bookstore",
    title: "Bookstore",
    subtitle: "Projeto fullstack",
    description: "Livraria online com sistema de autenticação, carrinho de compras e checkout. Construída com foco em segurança (Transactions, Rate-limiting e HTTP-only cookies).",
    image: "/bookstore/home.png",
    techs: [
      "NextJS",
      "Expressjs",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Docker",
      "zod",
    ],
    images: [
      { title: "Login", url: "/bookstore/login.png", category: "Autenticação" },
      { title: "Cadastro", url: "/bookstore/register.png", category: "Autenticação" },
      { title: "Home", url: "/bookstore/home.png", category: "App" },
      { title: "Detalhes do Livro", url: "/bookstore/book.png", category: "App" },
      { title: "Carrinho", url: "/bookstore/cart.png", category: "App" },
      { title: "Checkout", url: "/bookstore/checkout.png", category: "App" },
      { title: "Pedido Finalizado", url: "/bookstore/finish_order.png", category: "App" },
      { title: "Meus Pedidos", url: "/bookstore/orders.png", category: "App" },
      { title: "Minhas Avaliações", url: "/bookstore/my_reviews.png", category: "App" },
      { title: "Dashboard (Admin)", url: "/bookstore/dashboard.png", category: "Painel Admin" },
      { title: "Gerenciar Livros (Admin)", url: "/bookstore/manage_books_admin.png", category: "Painel Admin" },
      { title: "Adicionar Livro (Admin)", url: "/bookstore/create_book.png", category: "Painel Admin" },
      { title: "Gerenciar Categorias (Admin)", url: "/bookstore/admin_categories.png", category: "Painel Admin" },
      { title: "Criar Categoria (Admin)", url: "/bookstore/admin_create_categorie.png", category: "Painel Admin" },
      { title: "Usuários (Admin)", url: "/bookstore/admin_users.png", category: "Painel Admin" },
      { title: "Criar usuário (Admin)", url: "/bookstore/admin_create_user.png", category: "Painel Admin" },
      { title: "Editar senha do usuário (Admin)", url: "/bookstore/admin_change_pass_user.png", category: "Painel Admin" },
      { title: "Banir usuário (Admin)", url: "/bookstore/admin_ban_user.png", category: "Painel Admin" },
      { title: "Deletar permanentemente usuário (Admin)", url: "/bookstore/admin_delete_user.png", category: "Painel Admin" },
    ],
    links: {
      github: "https://github.com/lucas-goncalves-tech/bookstore-fullstack-expressjs",
    },
  },
  {
    id: "notes",
    title: "Notes App",
    subtitle: "Projeto fullstack",
    description: "Aplicativo de anotações com sistema de autenticação via JWT, CRUD completo e validação de dados.",
    image: "/notes/home.png",
    techs: [
      "NextJS",
      "Expressjs",
      "TypeScript",
      "better-sqlite3",
      "JWT",
      "zod",
    ],
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
      github: "https://github.com/lucas-goncalves-tech/notes-fullstack-expressjs",
    },
  },
];
