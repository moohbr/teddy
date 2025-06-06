# Teddy

## 📋 Sobre o Projeto

Este é um projeto Node.js/TypeScript que utiliza:
- Drizzle ORM para gerenciamento de banco de dados
- Docker para containerização
- TypeScript para tipagem estática

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
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
- Preencha as variáveis necessárias

4. Execute o ambiente Docker (se necessário):
```bash
docker-compose up -d
```

5. Execute as migrações do banco de dados:
```bash
yarn migrate
```

6. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

O servidor estará rodando em `http://localhost:[PORTA]`

## 📚 Scripts Disponíveis

- `yarn dev`: Inicia o servidor em modo de desenvolvimento
- `yarn build`: Compila o projeto
- `yarn start`: Inicia o servidor em modo de produção
- `yarn migrate`: Executa as migrações do banco de dados
- `yarn test`: Executa os testes (se configurados)

## 🛠 Tecnologias Utilizadas

- Node.js
- TypeScript
- Drizzle ORM
- Docker
- [Outras tecnologias específicas do projeto]

## 📝 Licença

Este projeto está sob a licença [TIPO_DE_LICENÇA].

---

Desenvolvido com ❤️
