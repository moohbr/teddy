# Teddy

## 📋 Sobre o Projeto

Este é um projeto Node.js/TypeScript que utiliza:

- Hono como framework web
- Drizzle ORM para gerenciamento de banco de dados PostgreSQL
- Docker para containerização
- JWT para autenticação
- Winston para logging
- Zod para validação de dados

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 22.16.0)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e Docker Compose (para ambiente containerizado)

### 🎯 Instalação e Execução

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd teddy
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente:

- Copie o arquivo `.env.example` para `.env` (se existir)
- Preencha as variáveis necessárias para conexão com PostgreSQL e MongoDB

4. Execute as migrações do banco de dados (se necessário):

```bash
yarn drizzle-kit generate:pg
yarn migrate
```

5. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

## 🛠 Tecnologias Utilizadas

- Node.js 22.16.0
- TypeScript
- Hono (Framework Web)
- Drizzle ORM
- PostgreSQL
- MongoDB com Mongoose
- JWT para autenticação
- Bcrypt para hash de senhas
- Winston para logging
- Zod para validação
- Docker

## Um pouco sobre o desenvolvimento

Um encurtador de URL é um serviço que mapeia URLs longas para URLs curtas e únicas. Vamos entender por que ele pode ser implementado com um **hashmap** e por que, **em produção**, ele precisa de um **banco de dados**.

---

### ✅ **Por que usar um HashMap?**

Um `HashMap` (ou dicionário, em várias linguagens) oferece:

- **Acesso rápido**: O(1) na média para leitura, escrita e verificação de existência de chave.
- **Simples de usar**: Ideal para armazenar pares `shortURL → longURL`.

**Exemplo simples:**

```python
mapa = {
    "abc123": "https://www.exemplo.com/materia-longa-e-detalhada"
}
```

Consulta:

```python
longURL = mapa["abc123"]  # O(1)
```

---

### 🚨 **Mas por que isso não é suficiente em produção?**

Em ambientes de produção, um encurtador de URL precisa atender a **requisitos que vão além da velocidade pura**:

#### 1. **Persistência de dados**

- Um `HashMap` na memória é volátil — se o servidor cair ou reiniciar, todas as URLs são perdidas.
- Bancos de dados garantem **persistência**: os dados sobrevivem a falhas.

#### 2. **Escalabilidade e distribuição**

- Um único HashMap não funciona bem em ambientes distribuídos com múltiplas instâncias da aplicação.
- Um banco (relacional ou NoSQL) pode ser compartilhado entre múltiplas instâncias do serviço.

#### 3. **Alta disponibilidade e backup**

- Bancos de dados têm recursos de **replicação, backup, e failover**.
- Um sistema de produção precisa garantir que os dados não sejam perdidos e estejam sempre acessíveis.

#### 4. **Consulta avançada e análises**

- Pode ser necessário:

  - Ver quantas vezes uma URL foi acessada.
  - Consultar por data de criação.
  - Gerar relatórios.

- Isso é inviável apenas com HashMap em memória, mas natural em um banco.

#### 5. **Controle de concorrência**

- Se dois usuários tentam encurtar a mesma URL ao mesmo tempo, pode haver conflitos.
- Bancos de dados têm controle transacional e garantias de consistência.

---

### ✅ Conclusão

- **HashMap** é ideal para **protótipos, testes locais** ou como **cache em memória** para acessos rápidos (ex: com Redis).
- **Banco de dados** é obrigatório em **ambientes de produção** por questões de:

  - Persistência
  - Confiabilidade
  - Escalabilidade
  - Resiliência

🔁 Em sistemas reais, **ambos** são usados:

- **Banco** como fonte de verdade.
- **Cache** (como Redis, que funciona como um HashMap) para acelerar acessos e reduzir carga.

## 🚀 Pontos de Melhoria e Desafios de Escalabilidade

### Desafios de Escalabilidade

1. **Distribuição de Carga**

   - Implementar um load balancer para distribuir requisições entre múltiplas instâncias
   - Configurar health checks para garantir que apenas instâncias saudáveis recebam tráfego
   - Considerar estratégias de balanceamento (round-robin, least connections, etc.)

2. **Cache Distribuído**

   - Implementar Redis Cluster para cache distribuído
   - Gerenciar consistência entre diferentes nós de cache
   - Implementar políticas de cache (TTL, invalidação, etc.)

3. **Banco de Dados**

   - Implementar sharding para distribuir dados entre múltiplos nós
   - Configurar réplicas de leitura para melhorar performance
   - Gerenciar conexões de banco de dados eficientemente
   - Implementar estratégias de backup e recuperação robustas

4. **Monitoramento e Observabilidade**
   - Implementar métricas detalhadas (Prometheus/Grafana)
   - Melhorar o sistema de logging distribuído
   - Implementar tracing distribuído (ex: OpenTelemetry)
   - Criar dashboards para métricas-chave

### Pontos de Melhoria

1. **Performance**

   - Implementar CDN para distribuição global de conteúdo
   - Otimizar queries do banco de dados
   - Implementar rate limiting por usuário/IP
   - Adicionar compressão de resposta

2. **Resiliência**

   - Implementar circuit breakers para serviços externos
   - Melhorar tratamento de falhas e retentativas
   - Implementar graceful shutdown
   - Adicionar testes de carga e stress

3. **Segurança**

   - Implementar WAF (Web Application Firewall)
   - Adicionar proteção contra DDoS
   - Melhorar políticas de autenticação e autorização
   - Implementar scanning de vulnerabilidades

4. **Arquitetura**
   - Considerar migração para arquitetura de microserviços
   - Implementar message queues para processamento assíncrono
   - Separar serviços por domínio
   - Implementar API Gateway

### Maiores Desafios

1. **Consistência de Dados**

   - Manter consistência entre diferentes nós de cache
   - Garantir que URLs curtas sejam únicas em um sistema distribuído
   - Gerenciar transações distribuídas

2. **Latência**
   - Minimizar latência em diferentes regiões geográficas
   - Otimizar tempo de resposta com múltiplas camadas de cache
   - Balancear entre consistência e disponibilidade (CAP theorem)
