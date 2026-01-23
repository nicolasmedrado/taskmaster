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
- Primeira dependência externa real (falhas de conexão e ordem de startup)

## 2026-01-23

### O que foi feito

-

### Decisões técnicas

-

### Próximo passo

-
