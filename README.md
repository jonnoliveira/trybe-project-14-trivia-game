# PROJETO 14 - TRIVIA GAME :computer:

## Esse projeto pertence ao módulo de `front-end` do curso da [Trybe](https://www.betrybe.com/) :green_heart:

## Acesse o projeto clicando [aqui](https://jonnoliveira.github.io/trybe-project-14-trivia-game)! :computer:
 
### Stacks utilizadas no desenvolvimento:
<div style="display: inline_block"><br>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Shield" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Shield" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript Shield" />
   <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest Shield" />
   <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Shield" />
   <img src="https://img.shields.io/badge/React_Testing_Library-E33332?style=for-the-badge&logo=TestingLibrary&logoColor=white" alt="Testing_Library Shield" />
   <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Shield" />
</span>
</div>
 
 #
 
<details>
 
<summary>
  
## 1- Resumo
  
</summary>

No projeto Tivia game usamos duas requisições a API para ter acesso aos dados. Usamos as tecnologias React e Redux para componentização e gerenciamento do estado global da aplicação. Já para aplicação dos testes, a  fim de garantir uma boa qualidade do código e seu funcionamento, utilizamos a RTL/jest.

A pessoa usuária pode:

* Logar no jogo e, se o email tiver cadastro no site Gravatar, ter sua foto associada ao perfil da pessoa usuária;

* Acessar a página referente ao jogo, onde se deverá escolher uma das respostas disponíveis para cada uma das perguntas apresentadas. A resposta deve ser marcada antes do contador de tempo chegar a zero, caso contrário a resposta deverá ser considerada errada.
 
* Ser redirecionada, após 5 perguntas respondidas, para a tela de score, onde o texto mostrado depende do número de acertos.

* Visualizar a página de ranking, se quiser, ao final de cada jogo.

* Configurar algumas opções para o jogo em uma tela de configuração acessível a partir do cabeçalho do app.

Foi uma ótima oportunidade desenvolver esse projeto, principalmente por se tratar de um trabalho em grupo, necessitando de comunicação e colaboração para atingirmos nossos objetivos. Para tanto, utilizamos o Kanban das metodologias ágeis para organização das tarefas. Veja mais abaixo!

</details>

#

<details>
 
<summary>
 
## 2- Requisitos

</summary>

* I. [TELA DE LOGIN] Crie a tela de login, onde a pessoa que joga deve preencher as informações para iniciar um jogo

* II. [TELA DE LOGIN] Crie o botão de iniciar o jogo

* III. [TELA DE LOGIN] Crie um botão na tela inicial que leve para a tela de configurações

* IV. [TELA DE LOGIN] Desenvolva testes para atingir 90% de cobertura da tela de Login

* V. [TELA DE JOGO] Crie um _header_ que deve conter as informações da pessoa jogadora

* VI. [TELA DE JOGO] Crie a página de jogo que deve conter as informações relacionadas à pergunta

* VII. [TELA DE JOGO] Desenvolva o estilo que, ao clicar em uma resposta, a correta deve ficar verde e as incorretas, vermelhas

* VIII. [TELA DE JOGO] Desenvolva um timer onde a pessoa que joga tem 30 segundos para responder

* IX. [TELA DE JOGO] Crie o placar com as seguintes características:

* X. [TELA DE JOGO] Crie um botão de `Next` que apareça após a resposta ser dada

* XI. [TELA DE JOGO] Desenvolva o jogo de forma que a pessoa que joga deve responder 5 perguntas no total

* XII. [TELA DE FEEDBACK] Desenvolva o header de _feedback_ que deve conter as informações da pessoa jogadora

* XIII. [TELA DE FEEDBACK] Crie a mensagem de _feedback_ para ser exibida a pessoa usuária

* XIV. [TELA DE FEEDBACK] Exiba as informações relacionadas aos resultados obtidos para a pessoa usuária
 
* XV. [TELA DE FEEDBACK] Crie a opção para a pessoa jogadora poder jogar novamente

* XVI. [TELA DE FEEDBACK] Crie a opção para a pessoa jogadora poder visualizar a tela de _ranking_

* XVII. [TELA DE FEEDBACK] Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks

* XVIII. [TELA DE RANKING] Crie um botão para ir ao início

* XIX. [TELA DE RANKING] Crie o conteúdo da tela de _ranking_

* XX. [TELA DE RANKING] Desenvolva testes para atingir 90% de cobertura da tela de Rankings
 
* XXI. [TELA DE JOGO] Desenvolva testes para atingir 90% de cobertura da tela de Jogo

* XXII. Desenvolva testes para atingir 95% de cobertura total
---

## Requisitos Bônus
 
* XXIII. Ao mudar o valor do dropdown categoria, apenas perguntas da categoria selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave category no retorno da API;
 
* XXIV. Ao mudar o valor do dropdown dificuldade, apenas perguntas da dificuldade selecionada devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave difficulty no retorno da API;
 
* XXV. Ao mudar o valor do dropdown tipo, apenas perguntas do tipo selecionado devem aparecer para a pessoa que está jogando. Essa configuração será identificada pela chave type no retorno da API.

</details>

# 

<details>
 
<summary>

## 3- Nota do Projeto
 
</summary>

## 100% :heavy_check_mark:

![Project-Tivia-Game-Grade](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-game-grade.png)

</details> 
 
# 

<details>
 
<summary>

## 4- Preview

</summary>

![Project-Tivia-Game-Preview-1](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-preview-1.png)
![Project-Tivia-Game-Preview-2](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-preview-2.png)
![Project-Tivia-Game-Preview-3](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-preview-3.png)
![Project-Tivia-Game-Preview-4](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-preview-4.png)
![Project-Tivia-Game-Preview-5](https://github.com/jonnoliveira/trybe-project-14-trivia-game/blob/main/images/trivia-preview-5.png)


</details>

