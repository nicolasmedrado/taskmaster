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
