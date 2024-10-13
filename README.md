# Teste: Vaga de Estágio Engenharia de Software

# Projeto - Todo List - FullStack 

Este projeto é uma aplicação de lista de tarefas (To-Do List) que utiliza uma arquitetura full-stack com Node.js, Redis para caching e JWT para autenticação. 

## 🎯 Objetivo

O objetivo deste projeto é criar uma página web que exibe produtos, permitindo ao usuário clicar em um item para visualizar mais detalhes em um modal. O layout é implementado pixel a pixel, respeitando fontes, cores e botões.

## 📋 Especificações Técnicas

- **Framework:**
- Node.js: Para o desenvolvimento do back-end, com a criação de uma API para manipulação das tarefas.
- Express: Framework para simplificar a criação de rotas e a estrutura do servidor no back-end.
- Redis: Para cache de tarefas ou sessões, ajudando a melhorar o desempenho.
- PostgreSQL (ou outro banco relacional de sua escolha): Para o armazenamento persistente das tarefas.
- JWT (JSON Web Token): Para autenticação e controle de acesso aos endpoints da API.
- Front-end (HTML/CSS): Com uso de JavaScript para realizar interações AJAX com a API.


## Pré-requisitos

Configuração e Instalação:

O que deve estar instalado no sistema (Node.js, Redis, PostgreSQL). 

Passos para Configuração: 

Clone o repositório. 

Instale as dependências com npm install. 

Configure o banco de dados e Redis. 

Defina as variáveis de ambiente (.env), como JWT_SECRET e configurações do banco de dados. 

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

- **Node.js:** [Instale aqui](https://nodejs.org/)
- **Git:** [Instale aqui](https://git-scm.com/)

Também é recomendado utilizar um editor de código como o Visual Studio Code.

### Passos para rodar o projeto

1. **Clone o repositório:**

   Faça um fork deste projeto e, em seguida, clone-o para a sua máquina local usando o Git:

   ```
   git clone https://github.com/BrenoVascon/Teste-Fullstack.git
   ```

2. **Navegue até o diretório do projeto:**
   ```
   cd .\backend\
   ```


3. **Instale as dependências:**
   ```
   npm install
   ```
4. **Para Conectar o backend com o PostgreSQL:**
   É necessario criar um arquivo .env no root do projeto:
    exemplo:
    ```
    DB_HOST=localhost
    DB_NAME=testeEstagio
    DB_USER=postgres
    DB_PASSWORD=suasenha
    JWT_SECRET=sua_chave_secreta
    PORT=3000
    ```

   

5. **Para Iniciar o servidor do backend:**
    ```
    node src/server.js
    ```


