# BrightFlow

![image](https://github.com/user-attachments/assets/e23eacc8-b094-4c75-b1ed-75098d0af611)

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%3E=18.x-green?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3.x-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Índice
- [Pré-Requisitos](#Pre-requisites)
- [Introdução](#📜-Introduction)
- [Uso](#💻-Usage)
- [Rotas](#🛣️-Rotas)
- [Instalação](#🛠️-Instalação)
- [Variáveis de Ambiente](#🔐-Variáveis-de-Ambiente)

## Pré-Requisitos

- **NodeJS**: >= 18.x
- **NPM**: >= 6.x
- **PostgreSQL**: >= 14.x
- **AWS Account**: Para armazenamento S3

## 📜 Introdução

BrightFlow, sua solução completa para gerenciar contas de energia com facilidade. BrightFlow é uma plataforma open-source projetada para simplificar o processo de gerenciamento de contas de luz, oferecendo aos usuários uma experiência perfeita desde o armazenamento de contas até a visualização de dados analíticos.

## 💻 Funcionalidades

- **Autenticação de Usuário**: Sistema seguro de registro e login
- **Upload de PDF**: Upload e armazenamento seguro de contas de energia no AWS S3
- **Extração Automática de Dados**: Extrai informações importantes dos PDFs automaticamente
- **Visualização de Dados**: 
  - Dashboard interativo com tendências de consumo
  - Gráficos de pizza de distribuição de custos
  - Análise histórica de consumo
- **Gerenciamento de Contas**: 
  - Upload e download fácil de contas
  - Funcionalidade de busca e filtro
  - Sistema organizado de armazenamento

## 💻 Uso

Você pode acessar em produção através deste [link](https://BrightFlow.vercel.app/). É necessário se cadastrar e fazer login para acessar a página de contas e fazer upload de todas as suas contas para processar os dados e exibi-los em um painel analítico.

## 🛣️ Rotas

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário
- `POST /auth/refresh` - Atualização do token de acesso

### Contas
- `GET /billets` - Lista todas as contas
- `POST /billets` - Upload de nova conta
- `GET /billets/:id` - Obtém detalhes de uma conta específica

### Usuário
- `GET /user/:id` - Busca um usuário pelo o seu ID
- `GET /user/profile/:id` - Obtém perfil do usuário
- `POST /user` - Cria um novo usuário
- `PATCH /user/profile/:id` - Atualiza dados do perfil

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/mkmuniz/BrightFlow.git
```

2. Instale as dependências:
```bash
# Frontend
cd front
npm install

# Backend
cd back
npm install
```

3. Configure o banco de dados:
```bash
cd back
npx prisma migrate dev
```

4. Inicie os servidores de desenvolvimento:
```bash
# Frontend
cd front
npm run dev

# Backend
cd back
npm run dev
```

## 🔐 Variáveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/BrightFlow"
JWT_ACCESS_TOKEN_SECRET="your-access-token-secret"
JWT_REFRESH_TOKEN_SECRET="your-refresh-token-secret"

AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
S3_BUCKET="your-s3-bucket-name"
S3_REGION="your-s3-region"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-jey"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

GEMINI_AI_API_KEY="your-gemini-api-key"

PORT=4000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```
