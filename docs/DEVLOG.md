## 2026-01-21

### O que foi feito

- Criação da estrutura base em `monorepo`
- Bootstrap da API (`NestJS`)
- Implementação do endpoint `/health`
- Bootstrap do app `Flutter`

### Decisões técnicas

- Uso de monorepo para versionar app e API juntos e reduzir fricção entre mudanças
- Criação do `/health` como endpoint de infraestrutura

### Próximo passo

- Variáveis de ambiente
- `@nestjs/config`
- Primeira decisão de produção

## 2026-01-22

### O que foi feito

- Instalação do `@nestjs/config`
- Criação de `.env` (local) e `.env.example` (contrato versionado)
- Configuração do `ConfigModule` como global
- Leitura da porta via `process.env.PORT` (com valor padrão)

### Decisões técnicas

- Manter `.env` fora do Git e versionar `.env.example` para padronizar setup do time
- Centralizar config no `ConfigModule` para evitar `process.env` espalhado pelo código

### Próximo passo

- Conectar `MongoDB`
- `Docker Compose`
- Primeira dependência externa real

## 2026-01-23

### O que foi feito

- Criado `docker-compose.yml`
- Adicionada a variável de ambiente `MONGO_URI` (.env e .env.example)
- Inicialização do container MongoDB via `Docker Compose`
- Conexão da API ao `MongoDB` via `MongooseModule`

### Decisões técnicas

- Uso de `Docker Compose` para padronizar o ambiente de desenvolvimento e evitar dependência de instalações locais
- Uso de `MONGO_URI` via variável de ambiente para permitir múltiplos ambientes sem alterar código

### Próximo passo

- Primeira entidade `Mongo`
- `Schema` vs `Model` vs `DTO`
- Por que `Mongo` aceita qualquer coisa

## 2026-01-24

### O que foi feito

- Criação da entidade `Task`
- Criação do `Schema` com proteção de dados
- Registro do model no módulo
- Criação do `CreateTaskDto` com validação
- Ativação do `ValidationPipe` global
- Integração definitiva do `class-validator`

### Decisões técnicas

- Uso de DTOs com validação para proteger a borda da aplicação contra dados inválidos
- Configuração do `ValidationPipe` global para garantir validação automática em todas as rotas

### Próximo passo

- Primeiro endpoint

## 2026-01-25

### O que foi feito

- Injeção do Model no Service
- Criação do método `create` no Service
- Implementação do endpoint `POST /tasks` no Controller

### Decisões técnicas

- Manter o Controller fino, delegando a lógica de criação para o Service
- Centralizar a criação da entidade no Service para facilitar testes e reutilização
- Delegar o estado inicial da Task ao Schema, evitando controle pelo usuário

### Próximo passo

- GET /tasks
- Listagem
- Lean queries
- Por que retornar documento do Mongo cru pode ser perigoso

## 2026-01-26

### O que foi feito

- Criação do método `findAll` no Service para listagem de Tasks
- Implementação do endpoint `GET /tasks` no Controller
- Uso de `lean()` nas queries para retorno de objetos JSON simples
- Testes manuais da listagem via Thunder Client

### Decisões técnicas

- Uso de `lean()` em operações de listagem para melhorar performance e evitar o retorno de documentos do Mongoose
- Centralização da definição do formato de resposta no Service, mantendo o Controller como camada de transporte
- Evitar exposição de detalhes internos do banco (ex.: `__v`, métodos do Document)

### Próximo passo

- Paginação de resultados
- Limite de registros retornados
- Uso de query params (`page`, `limit`)
- Por que `find()` sem limite é perigoso em produção
