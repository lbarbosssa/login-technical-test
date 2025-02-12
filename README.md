# React Native Application

Este repositório contém uma aplicação (Teste) desenvolvida em React Native. A ideia é representar um App com um tela de Login e uma Home Page, utilizando o Native base como Design System

**Funcionalidades:**
- Design System com **Native Base**.
- Consumo de API com **Axios** e **Interceptors**
- Validação de Inputs com **react-hook-form**
- Tratamento de mensagens de erro
- Gerencimento de estado com **Zustand** para controlar o tema
- Persistencia de dados com **async-storage**
- Integração Nativa usando **NativeModules** e código nativo

## Demo

![demo](./.github/assets/demo.mp4)

## Pré-requisitos

Antes de começar, você precisará ter instalado:

- Node.js >= 18
- Todo o ambiente de desenvolvimento [React Native CLI](https://reactnative.dev/docs/set-up-your-environment)

## Instalação

Para iniciar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
```bash
git clone https://github.com/lbarbosssa/login-technical-test.git
```
```bash
cd login-technical-test
```
2. Instale as dependências:

```bash
npm install
```
_Caso enfrentar problemas com dependências_
```bash
npm install --legacy-peer-deps
```


3. Instale as dependências do iOS (necessário apenas para Mac/iOS):
```bash
cd ios && pod install
```
Volte para a raiz do projeto:
```bash
cd ios && pod install
```

4. Execute o projeto
```bash
npx react-native run-ios
```
ou
```bash
npx react-native run-android
```

**Author: Lucas Barbosa**

**barbosa.lucas1996@gmail.com**