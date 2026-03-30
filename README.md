# Sala Livre FIAP

App mobile em React Native com Expo para resolver a dificuldade de saber quais salas estao livres na FIAP entre as aulas.

## Sobre o Projeto

O problema escolhido foi a dificuldade de encontrar rapidamente uma sala disponivel para estudo, alinhamentos de grupo ou ensaio de apresentacoes.

Esse fluxo foi escolhido porque acontece com frequencia no dia a dia da faculdade e pode ser melhorado com um app simples, direto e util.

## Funcionalidades Implementadas

- Tela inicial com resumo do app e indicadores de disponibilidade
- Tela de consulta com filtros por campus, bloco e periodo
- Filtro opcional para mostrar somente salas com projetor
- Tela de blocos para abrir a busca ja filtrada
- Tela de detalhe da sala com recursos, disponibilidade e horarios livres
- Loading visual ao atualizar filtros
- Estado vazio quando nenhuma sala atende aos filtros

## Integrantes do Grupo

- NOME: Lorenzo Hayashi Mangini | RM: 554901
- NOME: Milton Cezar Bacanieski | RM: 555206
- NOME: Vitor Bebiano Mulford | RM: 555026
- NOME: Victório Maia Bastelli | RM: 554723

## Como Rodar o Projeto

### Pre-requisitos

- Node.js instalado
- Expo Go no celular ou emulador Android/iOS configurado

### Passo a passo

```bash
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
### Video ou GIF

[Link vídeo demonstração: `https://drive.google.com/file/d/1O99ZvGE06YYFabAW29VARlZF7GHcoCZ6/view?usp=drive_link`
]

## Decisoes Tecnicas

- O projeto usa Expo Router com navegacao por abas e rota de detalhe por arquivo
- Os dados foram mockados localmente para manter o escopo dentro do que foi visto ate a Aula 05
- Foi usado `useState` para controlar filtros e `useEffect` para aplicar atualizacao com loading simulado
- A interface usa `StyleSheet`, `View`, `Text`, `Image` e `TouchableOpacity`
- A tela de salas centraliza a regra principal do MVP: localizar rapidamente uma sala livre

## Estrutura Resumida

- `app/(tabs)/index.tsx`: tela inicial
- `app/(tabs)/salas.tsx`: consulta de salas
- `app/(tabs)/blocos.tsx`: atalho por blocos
- `app/sala/[id].tsx`: detalhes da sala
- `components/`: botoes, chips, cards e layout base
- `constants/rooms.ts`: base mockada e regras de filtro

## Proximos Passos

- Integrar com dados reais de ocupacao por campus
- Permitir favoritos e historico de salas usadas
- Adicionar busca por capacidade e recursos extras

## Checklist de Entrega

- [x] Projeto com Expo
- [x] Navegacao com Expo Router
- [x] Pelo menos 3 telas
- [x] Componentizacao
- [x] useState e useEffect
- [x] StyleSheet
- [x] Feedback visual e estado vazio
- [x] Tema visual coerente com FIAP
- [ ] Completar nomes dos integrantes
- [ ] Adicionar prints
- [ ] Adicionar link do video ou GIF
