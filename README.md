# Sala Livre FIAP

App mobile em React Native com Expo para resolver a dificuldade de saber quais salas estao livres na FIAP entre as aulas.

## Sobre o Projeto

O problema escolhido foi a dificuldade de encontrar rapidamente uma sala disponivel para estudo, alinhamentos de grupo ou ensaio de apresentacoes.

Esse fluxo foi escolhido porque acontece com frequencia no dia a dia da faculdade e pode ser melhorado com um app simples, direto e util.

## Evolucao Tecnica: CP1 -> CP2

No CP1, o projeto era focado no MVP de consulta de salas com dados mockados e navegacao entre telas. No CP2, a arquitetura foi evoluida para incluir autenticacao real, persistencia de sessao e dados funcionais, protecao de rotas e validacao formal de formularios.

Principais mudancas tecnicas em relacao ao CP1:

- Camada de autenticacao adicionada com cadastro, login e logout.
- Persistencia de sessao com restauracao automatica no bootstrap do app.
- Protecao de rotas autenticadas com redirecionamento automatico.
- Estado global separado com Context API (`AuthContext` e `AppDataContext`).
- Persistencia de dados funcionais (reservas) com sincronizacao de UI.
- Validacao estruturada de formularios com erros inline por campo.
- Wrapper de storage com fallback para evitar quebra quando modulo nativo de storage nao estiver disponivel.
- Melhoria de UX com `Animated API` (shake no login em caso de erro).

## Funcionalidades Implementadas (Lista Completa)

### Autenticacao e Sessao

- Cadastro de usuario com validacao de:
  - nome completo obrigatorio
  - e-mail obrigatorio e em formato valido
  - senha obrigatoria com minimo de 6 caracteres
  - confirmacao de senha obrigatoria e identica a senha
- Login com validacao de credenciais persistidas.
- Logout com limpeza da sessao ativa.
- Persistencia de sessao entre fechamento e reabertura do app.
- Redirecionamento automatico:
  - usuario logado nao acessa login/cadastro
  - usuario nao logado nao acessa area autenticada

### Estado Global e Persistencia

- `AuthContext` com:
  - `user`
  - `isAuthenticated`
  - `isBootstrapping`
  - `login`, `register`, `logout`
- `AppDataContext` com:
  - `reservations`
  - `isDataLoading`
  - `hasReservation`
  - `toggleReservation`
- Persistencia local de:
  - usuario cadastrado
  - estado de sessao
  - reservas de sala
- Leitura dos dados no mount e atualizacao a cada insercao/remocao.

### Consulta de Salas e Regras de Negocio

- Tela inicial com indicadores:
  - salas livres agora
  - campus com mais vagas
  - reservas salvas
  - salas com projetor livres agora
- Tela de salas com filtros combinados por:
  - campus
  - periodo (`agora`, `proxima`, `noite`)
  - bloco
  - somente salas com projetor
- Simulacao de loading na atualizacao de resultados.
- Estado vazio com CTA para limpar filtros.
- Tela por blocos com atalho para busca pre-filtrada.
- Tela de detalhe da sala com:
  - dados descritivos
  - disponibilidade por periodo
  - recursos
  - faixas livres do dia
  - salvar/cancelar reserva
  - atalhos para filtrar por campus e bloco

### UX, UI e Feedback

- Erros de formulario exibidos inline abaixo de cada campo.
- Mensagem de credenciais invalidas no login sem alert/modal.
- Ajustes de layout para evitar overflow em badges de disponibilidade.
- Header com acao de logout nas telas autenticadas.
- Animacao de shake no card de login em erro de validacao/autenticacao.

## Integrantes do Grupo

- NOME: Lorenzo Hayashi Mangini | RM: 554901
- NOME: Milton Cezar Bacanieski | RM: 555206
- NOME: Vitor Bebiano Mulford | RM: 555026
- NOME: Victorio Maia Bastelli | RM: 554723

## Como Rodar o Projeto

### Pre-requisitos

- Node.js instalado
- Expo Go no celular ou emulador Android/iOS configurado

### Passo a passo

```bash
git clone https://github.com/CezarBacanieski/cp-mobile-oficial.git
cd cp-mobile-oficial
npm install
npx expo start
```

Depois disso:

- pressione `a` para abrir no Android
- ou escaneie o QR Code com o Expo Go

## Demonstracao

### Prints obrigatorios

![alt text](image-1.png)
![alt text](image-4.png)
![alt text](image-2.png)
![alt text](image-3.png)
<img width="334" height="716" alt="image" src="https://github.com/user-attachments/assets/633b6815-316e-43bc-8ef6-e3ada6a9576c" />

### Video demonstracao

https://drive.google.com/file/d/1O99ZvGE06YYFabAW29VARlZF7GHcoCZ6/view?usp=drive_link

## Decisoes Tecnicas

- Projeto estruturado com Expo Router (file-based routing).
- Dados de salas mantidos em base local mockada para escopo academico.
- Uso de `useState`, `useEffect`, `useMemo` e `useContext` para controle de estado e regras.
- UI baseada em componentes reutilizaveis com `StyleSheet`.
- Arquitetura separada por camadas: telas (`app`), componentes (`components`), dominio (`constants`), estado (`contexts`) e infra (`lib`).

## Diferencial Implementado CP2

- Animacoes com Animated API: efeito de `shake` no card de login em erro de validacao ou credenciais invalidas para feedback visual imediato.

## Estrutura Resumida

- `app/(tabs)/index.tsx`: tela inicial
- `app/(tabs)/salas.tsx`: consulta de salas
- `app/(tabs)/blocos.tsx`: atalho por blocos
- `app/sala/[id].tsx`: detalhes da sala
- `app/login.tsx`: autenticacao
- `app/cadastro.tsx`: cadastro de usuario
- `contexts/auth-context.tsx`: sessao e autenticacao
- `contexts/app-data-context.tsx`: reservas e dados funcionais
- `lib/storage.ts`: acesso a storage com fallback
- `components/`: botoes, chips, cards e layout base
- `constants/rooms.ts`: base mockada e regras de filtro

## Checklist de Entrega CP1

- [x] Projeto com Expo
- [x] Navegacao com Expo Router
- [x] Pelo menos 3 telas
- [x] Componentizacao
- [x] useState e useEffect
- [x] StyleSheet
- [x] Feedback visual e estado vazio
- [x] Tema visual coerente com FIAP

## Checklist de Entrega CP2

- [x] Autenticacao com AsyncStorage
- [x] Persistencia de Dados com AsyncStorage
- [x] Gerenciamento de Estado Global com Context API
- [x] Formularios com Validacao
- [x] Diferencial no projeto (feedback visual com shake no erro de login)