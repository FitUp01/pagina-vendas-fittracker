# 🏋️ FitTracker - Transforme seu corpo em 30 dias

> O único aplicativo que garante resultados visíveis, mesmo para quem tem uma rotina agitada.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

---

## 🎯 Sobre o FitTracker

O **FitTracker** é uma plataforma completa de fitness e nutrição que combina:
- 🏃 **Treinos personalizados** que se adaptam automaticamente a cada 30 dias
- 🍎 **Planos alimentares inteligentes** baseados em quiz personalizado
- 📊 **Acompanhamento de progresso** em tempo real
- 🔐 **Segurança robusta** para proteção de dados
- 💬 **Suporte ao cliente** integrado com chat ao vivo

---

## ✨ Funcionalidades Principais

### 🎯 Sistema de Quiz Personalizado
- Quiz de 4 perguntas sobre objetivos e estilo de vida
- Geração automática de plano alimentar personalizado
- Cálculo inteligente de calorias e macronutrientes
- Adaptação para restrições alimentares (vegetariano, intolerâncias)

### 🏋️ Treinos Inteligentes (Rotação a cada 30 dias)
- **Mês 1 - Adaptação:** Treinos iniciantes (15-25 min)
- **Mês 2 - Progressão:** Treinos intermediários (25-35 min)
- **Mês 3 - Desafio:** Treinos avançados (30-40 min)
- Sistema de repetições ajustáveis
- Rastreamento de treinos completos

### 🍽️ Nutrição Personalizada
- 5 refeições por dia com horários sugeridos
- Calorias e macros calculados automaticamente
- Recomendações personalizadas baseadas no objetivo
- Adaptação para diferentes estilos alimentares

### 📈 Acompanhamento de Progresso
- Registro de peso e medidas corporais
- Histórico de treinos e calorias queimadas
- Gráficos de evolução semanal
- Sistema de conquistas e gamificação

### 💬 Suporte ao Cliente
- Widget de chat ao vivo integrado
- FAQ com perguntas frequentes
- Múltiplos canais de contato (email, telefone)
- Tempo médio de resposta: 5 minutos

### 🔐 Segurança e Privacidade
- Autenticação segura via Supabase Auth
- Row Level Security (RLS) no banco de dados
- Criptografia de dados em trânsito e em repouso
- Conformidade com LGPD
- Backup automático diário

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git instalado

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/fittracker.git
cd fittracker

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# Edite .env.local e adicione suas credenciais do Supabase:
# NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima

# 4. Configure o banco de dados
# Execute o script database-schema.sql no seu projeto Supabase

# 5. Execute o projeto em desenvolvimento
npm run dev
```

### Acesso
Abra seu navegador e acesse: `http://localhost:3000`

---

## 🗄️ Configuração do Banco de Dados

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Anote a URL e a chave anônima

### 2. Executar Script SQL
1. No dashboard do Supabase, vá em "SQL Editor"
2. Copie o conteúdo de `database-schema.sql`
3. Cole e execute o script
4. Verifique se todas as tabelas foram criadas

### 3. Configurar Variáveis de Ambiente
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

---

## 📁 Estrutura do Projeto

```
fittracker/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página inicial (landing page)
│   │   ├── app/
│   │   │   └── page.tsx          # Aplicativo principal
│   │   ├── layout.tsx            # Layout global
│   │   └── globals.css           # Estilos globais
│   ├── components/
│   │   ├── ui/                   # Componentes shadcn/ui
│   │   └── SupportWidget.tsx    # Widget de suporte
│   └── lib/
│       ├── supabase.ts           # Cliente e funções Supabase
│       └── fonts.ts              # Configuração de fontes
├── public/                       # Arquivos estáticos
├── database-schema.sql           # Schema do banco de dados
├── DOCUMENTATION.md              # Documentação completa
├── SECURITY.md                   # Guia de segurança
├── package.json                  # Dependências
└── README.md                     # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.4** - Framework React com App Router
- **React 19.1** - Biblioteca de UI
- **TypeScript 5.0** - Tipagem estática
- **Tailwind CSS 4.0** - Estilização responsiva
- **Lucide React** - Ícones modernos

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL (banco de dados)
  - Auth (autenticação)
  - Row Level Security (segurança)
  - Realtime (atualizações em tempo real)

### UI Components
- **shadcn/ui** - Componentes acessíveis
- **Radix UI** - Primitivos de UI
- **Sonner** - Notificações toast

### Outras Bibliotecas
- **Zod** - Validação de schemas
- **React Hook Form** - Gerenciamento de formulários
- **date-fns** - Manipulação de datas

---

## 📚 Documentação

### Documentos Disponíveis
- 📖 [Documentação Completa](./DOCUMENTATION.md) - Guia completo de uso
- 🔐 [Guia de Segurança](./SECURITY.md) - Políticas e práticas de segurança
- 🗄️ [Schema do Banco](./database-schema.sql) - Estrutura do banco de dados

### Recursos Úteis
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)

---

## 🔐 Segurança

O FitTracker implementa múltiplas camadas de segurança:

- ✅ **Autenticação segura** via Supabase Auth
- ✅ **Row Level Security (RLS)** no banco de dados
- ✅ **Criptografia HTTPS/TLS** em todas as comunicações
- ✅ **Validação de dados** no frontend e backend
- ✅ **Proteção contra SQL Injection, XSS, CSRF**
- ✅ **Conformidade com LGPD**
- ✅ **Backup automático diário**

Para mais detalhes, consulte o [Guia de Segurança](./SECURITY.md).

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Reportar Bugs
Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/fittracker/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

---

## 📞 Suporte

### Canais de Suporte
- 💬 **Chat ao vivo:** Disponível no aplicativo
- 📧 **Email:** suporte@fittracker.com
- 📱 **WhatsApp:** +55 (11) 99999-9999
- 🌐 **Site:** [fittracker.com](https://fittracker.com)

### Horário de Atendimento
- Segunda a Sexta: 9h às 18h (horário de Brasília)
- Tempo médio de resposta: 5 minutos

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework incrível
- [Supabase](https://supabase.com/) - Backend poderoso
- [Tailwind CSS](https://tailwindcss.com/) - Estilização moderna
- [shadcn/ui](https://ui.shadcn.com/) - Componentes lindos
- Todos os contribuidores e usuários do FitTracker

---

## 🎯 Roadmap

### Versão 1.1.0 (Em breve)
- [ ] Modo offline
- [ ] Notificações push
- [ ] Integração com wearables (Apple Watch, Fitbit)
- [ ] Desafios semanais entre amigos

### Versão 1.2.0 (Futuro)
- [ ] Consultoria com nutricionistas
- [ ] Personal trainer virtual com IA
- [ ] Receitas detalhadas com vídeos
- [ ] Vídeos de exercícios em HD
- [ ] Comunidade social integrada

---

## 📊 Status do Projeto

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licença-MIT-green)

---

## 💪 Transforme seu corpo. Transforme sua vida.

**© 2024 FitTracker. Todos os direitos reservados.**

---

**Feito com ❤️ e muito 💪 por desenvolvedores apaixonados por fitness e tecnologia.**
