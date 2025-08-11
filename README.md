# 🚀 Sistema de Gestão de Segurança e Relatórios

Sistema completo para gestão de segurança, rondas e ocorrências em condomínios, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## 📋 Status do Projeto

**Fase Atual:** Setup Inicial  
**Progresso:** 20%  
**Última Atualização:** {{ new Date().toLocaleDateString('pt-BR') }}

### ✅ Concluído
- [x] Setup do projeto Next.js + TypeScript
- [x] Configuração do Tailwind CSS com tema customizado
- [x] Estrutura de pastas organizada
- [x] Componentes UI base (Button, Card, Input)
- [x] Sistema de autenticação com Zustand
- [x] Layout principal com Sidebar e Navbar
- [x] Dashboard principal com KPIs
- [x] Componentes de dashboard (Stats, Ocorrências, Rondas, Condomínios)

### 🔄 Em Andamento
- [ ] Configuração do MSW para mock de API
- [ ] Implementação das páginas de gestão

### ⏳ Próximos Passos
- [ ] Páginas de gestão de rondas
- [ ] Páginas de gestão de ocorrências
- [ ] Sistema de autenticação JWT
- [ ] Integração com API Flask

## 🛠️ Stack Tecnológica

### Frontend Core
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.0+
- **Package Manager**: npm

### UI Libraries & Styling
- **Styling**: Tailwind CSS 3.4+
- **Components**: Shadcn/ui (baseado em Radix UI)
- **Icons**: Lucide React
- **Animations**: Framer Motion 11+

### State Management & Data Fetching
- **Server State**: TanStack Query v5
- **Client State**: Zustand 4.4+
- **HTTP Client**: Axios

### Development & Quality Tools
- **Linting**: ESLint + Prettier
- **Testing**: Vitest + Testing Library + axe-core
- **E2E**: Playwright

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd front-seguraca

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting
npm run type-check   # Verificação de tipos
```

## 📝 Padrões de Commit

Este projeto utiliza commits em **português** para facilitar a compreensão da equipe:

- **feat**: Nova funcionalidade
- **fix**: Correção de bug  
- **docs**: Documentação
- **style**: Formatação de código
- **refactor**: Refatoração de código
- **test**: Adição de testes
- **chore**: Tarefas de manutenção

### Exemplos de Commits
```bash
git commit -m "feat: adiciona sistema de autenticação JWT"
git commit -m "fix: corrige erro de validação no formulário"
git commit -m "docs: atualiza documentação da API"
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (app)/             # Rotas protegidas
│   └── api/               # Route handlers
├── components/             # Componentes reutilizáveis
│   ├── ui/                # Componentes base (Shadcn/ui)
│   ├── layout/            # Componentes de layout
│   └── dashboard/         # Componentes específicos de dashboard
├── hooks/                  # Custom hooks
├── services/               # Serviços de API
├── stores/                 # Estado global (Zustand)
├── types/                  # Definições de tipos TypeScript
├── lib/                    # Utilitários
└── constants/              # Constantes
```

## 🎨 Design System

### Cores
- **Primárias**: Azul (#3b82f6)
- **Segurança**: Verde (#10b981), Amarelo (#f59e0b), Vermelho (#ef4444)
- **Status**: Pendente, Ativo, Inativo, Concluído

### Componentes
- **Button**: Múltiplas variantes (primary, success, warning, danger)
- **Card**: Elevated, outlined, glassmorphism
- **Input**: Estados de validação e ícones
- **Layout**: Sidebar colapsável, Navbar responsiva

## 🔐 Autenticação

Sistema de autenticação JWT com:
- Login/Logout
- Refresh tokens automático
- Controle de permissões por role
- Persistência de estado

## 📱 Responsividade

Design mobile-first com breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1439px
- **Wide**: 1440px+

## 🧪 Testes

### Estratégia de Testes
- **Unitários**: Vitest + Testing Library
- **Integração**: API e componentes
- **E2E**: Playwright
- **Acessibilidade**: axe-core

### Executar Testes
```bash
npm run test          # Testes unitários
npm run test:e2e      # Testes E2E
npm run test:coverage # Cobertura de testes
```

## 📚 Documentação

- **Guia de Desenvolvimento**: `FRONTEND_DEVELOPMENT_GUIDE.md`
- **Storybook**: Componentes documentados
- **TypeDoc**: Documentação de tipos

## 🔧 Configuração

### Variáveis de Ambiente
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Sistema de Segurança
```

### Tailwind CSS
Configuração customizada com:
- Cores do design system
- Animações personalizadas
- Plugins (forms, typography, aspect-ratio)

## 🚀 Deploy

### Produção
```bash
npm run build
npm run start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ pela equipe de desenvolvimento**
