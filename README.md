# AppGenIA — Versão Avançada (U.S.O)

Este é um scaffold funcional da versão avançada do **AppGenIA**, com frontend (Next.js) e backend (FastAPI)
integrados para usar a OpenAI (GPT-4-o). O pacote foi criado para ser publicado no GitHub e deployado (frontend)
na Vercel e o backend em um serviço que aceite FastAPI (Render, Fly, Heroku, ou Docker).

### Estrutura
- frontend/ — Next.js (React) app (página única com formulário)
- backend/ — FastAPI que faz proxy para a OpenAI com variável de ambiente OPENAI_API_KEY
- docker-compose.yml — compose para rodar frontend+backend localmente (opcional)
- .env.example — exemplo de variáveis de ambiente
- LICENSE — MIT

### Passos rápidos (usar no desenvolvimento local)
1. Copie o repositório para sua conta GitHub.
2. Edite `backend/.env` com sua chave: `OPENAI_API_KEY=coloque_sua_chave_aqui`
3. Rodar com Docker Compose:
   ```
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend (docs): http://localhost:8000/docs
4. Para publicar:
   - Frontend (Vercel): conectar repositório e deploy (Next.js será detectado)
   - Backend: publicar em um serviço para FastAPI (ou usar serverless)

### Notas de segurança
- Nunca comite sua chave da OpenAI no GitHub. Use Secrets/Environment Variables do host.
- Este scaffold é uma base. Revise e ajuste para produção (rate-limits, logs, validação).

Criado por **Ueverton — AppGenIA v1.0**
