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

## 2026-02-01

### O que foi feito

- Implementação de paginação no endpoint `GET /tasks`
- Criação do DTO de paginação para validação de `page` e `limit`
- Ajuste do método `findAll` no Service para aplicar defaults e limite máximo
- Uso de `skip`, `limit` e `lean()` para listagem performática e previsível

### Decisões técnicas

- Validação de parâmetros de paginação no DTO para bloquear entradas inválidas na borda da aplicação
- Garantia de limites e valores padrão no Service para aplicar a regra de negócio de forma consistente
- Definição de um limite máximo de resultados para evitar consultas abusivas e consumo excessivo de recursos

### Próximo passo

- Ordenação dos resultados (`sort`)
- Criação de índices no MongoDB
- Entender por que ordenar sem índice é lento
- Ajustar Schema para suportar queries eficientes

## 2026-02-06

### O que foi feito

- Implementação de ordenação segura (`sort`) no endpoint `GET /tasks`
- Extensão do DTO de paginação para aceitar o parâmetro `sort`
- Definição de ordenação padrão (`createdAt:desc`) no Service
- Aplicação de allowlist para campos permitidos de ordenação
- Criação de índice no MongoDB para suportar o sort padrão
- Ajuste dos endpoints para uso de `id` como `string`, compatível com MongoDB

### Decisões técnicas

- Validação apenas do **formato** do parâmetro `sort` no DTO, mantendo regras de negócio no Service
- Uso de allowlist no Service para evitar ordenação por campos não suportados ou sem índice
- Definição de sort padrão para garantir comportamento determinístico da API
- Criação de índices alinhados ao contrato da API para evitar sort em memória
- Correção da tipagem de `id` para evitar inconsistências futuras com `ObjectId`

### Próximo passo

- Implementação de filtros no endpoint `GET /tasks` (ex.: `completed`)
- Criação de índice composto para filtro + ordenação
- Inclusão de metadados de paginação na resposta (`total`, `pages`)
- Uso de `countDocuments` para paginação completa
