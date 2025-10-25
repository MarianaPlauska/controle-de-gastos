# 💳 MyControl - Gerenciador Inteligente de Finanças

<div align="center">
  <h3>Controle total dos seus gastos com cartão de crédito</h3>
  <p>Aplicação web profissional desenvolvida com React, TypeScript e Styled Components</p>
</div>

## 🎯 Sobre o Projeto

**MyControl** é uma Progressive Web App (PWA) moderna e profissional para gerenciamento de finanças pessoais, com foco em controle de gastos com cartões de crédito. A aplicação oferece uma experiência nativa, com interface intuitiva e recursos avançados de análise financeira.

## ✨ Funcionalidades Principais

### 💳 Gerenciamento de Cartões
- Adicione múltiplos cartões de crédito
- Personalize cada cartão com 8 cores diferentes
- Edite nome, limite, titular e validade
- Visualização estilo wallet do Google
- Troca rápida entre cartões

### � tControle de Gastos
- Adicione gastos com descrição, valor e categoria
- 4 categorias: Almoço, Lanche, Besteira, Compra Especial
- Visualize gastos recentes na tela inicial
- Barra de progresso com uso do limite
- Alertas inteligentes (75% e 90% do limite)

### 📈 Estatísticas e Análises
- Gráfico de pizza por categoria
- Gráfico de barras por mês
- Total de gastos e transações
- Análise visual de padrões de consumo

### 💰 Rendimentos e Anotações
- Controle de fontes de renda (Salário, VR, Extras)
- Anotações para metas financeiras
- Separação clara entre receitas e despesas

### 🔔 Notificações
- Alertas de limite próximo
- Notificações de vencimento
- Badge com contador de não lidas

### 🎨 Temas
- Modo claro e escuro
- Cores harmoniosas e profissionais
- Transições suaves entre temas
- Persistência da preferência

## 🛠️ Tecnologias

### Core
- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Styled Components** - CSS-in-JS

### Bibliotecas
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones modernos
- **LocalStorage API** - Persistência de dados

### Ferramentas
- **Create React App** - Setup inicial
- **ESLint** - Linting de código
- **GitHub Pages** - Deploy automático

## 📁 Arquitetura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── BottomNav/          # Navegação inferior
│   ├── CardVisual/         # Visualização do cartão
│   ├── CardEditor/         # Editor de cartão
│   ├── ExpenseForm/        # Formulário de gastos
│   ├── UsageBar/           # Barra de uso do limite
│   └── Logo/               # Logo MyControl
│
├── pages/                  # Páginas da aplicação
│   ├── Home/              # Dashboard principal
│   ├── Cards/             # Gerenciamento de cartões
│   ├── Stats/             # Estatísticas e gráficos
│   └── Notes/             # Rendimentos e anotações
│
├── hooks/                  # Custom React Hooks
│   ├── useCards.ts        # Gerenciamento de cartões
│   └── useTheme.ts        # Gerenciamento de tema
│
├── styles/                 # Estilos globais
│   ├── GlobalStyles.ts    # Estilos base
│   ├── themes.ts          # Definição de temas
│   └── variables.css      # Variáveis CSS
│
├── types/                  # TypeScript Definitions
│   └── index.ts           # Interfaces e tipos
│
├── utils/                  # Funções utilitárias
│   └── formatters.ts      # Formatação de dados
│
├── App.tsx                 # Componente raiz
└── index.tsx              # Entry point
```

## 🚀 Como Executar

### Pré-requisitos
```bash
Node.js 18+
npm ou yarn
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mycontrol.git

# Entre na pasta
cd mycontrol

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Acesse `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Deploy no GitHub Pages

```bash
npm run deploy
```

## 💡 Como Usar

### 1. Tela Inicial (Home)
- Visualize resumo dos gastos do mês
- Veja transações recentes
- Acesse notificações de alerta
- Adicione gastos rapidamente

### 2. Cartões
- Selecione entre seus cartões
- Visualize limite e saldo disponível
- Edite informações do cartão
- Adicione novos gastos
- Monitore uso com barra de progresso

### 3. Estatísticas
- Analise gastos por categoria (gráfico pizza)
- Veja evolução mensal (gráfico barras)
- Acompanhe total de transações

### 4. Anotações
- Registre fontes de renda
- Faça anotações sobre metas
- Controle salário, VR e extras

## 🎨 Design System

### Cores do Tema Escuro
- Background: `#0f0f1e`
- Cards: `#1a1a2e`
- Roxo Principal: `#a78bfa`
- Texto: `#f8f9fa`

### Cores do Tema Claro
- Background: `#f8f9fa`
- Cards: `#ffffff`
- Roxo Principal: `#7c3aed`
- Texto: `#1a1a1a`

### Cores dos Cartões
- Roxo, Azul, Verde, Laranja, Rosa, Vermelho, Amarelo, Azul Turquesa

## 🏗️ Padrões de Desenvolvimento

### Organização
- **Separação de responsabilidades**: Cada componente em sua pasta
- **CSS Modular**: Arquivo CSS separado por componente
- **Custom Hooks**: Lógica de negócio encapsulada
- **TypeScript Strict**: Tipagem forte em todo código

### Boas Práticas
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Funções utilitárias puras
- Nomenclatura clara e consistente
- Código limpo sem comentários desnecessários

## 📊 Funcionalidades Técnicas

### Persistência de Dados
- LocalStorage para armazenamento local
- Sincronização automática
- Sem necessidade de backend

### Performance
- Lazy loading de componentes
- Otimização de re-renders
- Bundle size otimizado (156KB gzipped)

### Responsividade
- Mobile-first design
- Adaptável a todos os tamanhos de tela
- Touch-friendly

### PWA
- Instalável em dispositivos móveis
- Funciona offline
- Ícones e splash screens

## 🔒 Segurança e Privacidade

- Dados armazenados apenas localmente
- Sem envio de informações para servidores
- Sem rastreamento ou analytics
- Código open source auditável

## 🎯 Roadmap

- [ ] Exportação de relatórios PDF
- [ ] Backup e sincronização em nuvem
- [ ] Metas de gastos mensais
- [ ] Categorias personalizáveis
- [ ] Múltiplas moedas
- [ ] Integração com bancos (Open Banking)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com 💜 para demonstração de habilidades em desenvolvimento web moderno.

### Tecnologias Demonstradas
- React com TypeScript
- Styled Components
- Custom Hooks
- Gerenciamento de estado
- Gráficos interativos
- Design responsivo
- PWA
- Clean Code

---

<div align="center">
  <strong>MyControl</strong> - Controle inteligente de finanças pessoais
  <br>
  <sub>Destaque no <strong>M</strong> e no <strong>C</strong></sub>
</div>
