# Controle de Estacionamento

**Desenvolvimento Web**\
Análise e Desenvolvimento de Sistemas\
Unisenai/SC\
Grupo 17


Front-end de um sistema de controle de estacionamento para condomínio, desenvolvido com HTML, CSS e JavaScript, sem nenhum framework ou biblioteca externa.


## Telas
- **Vagas cadastradas** (`index.html`): Lista as reservas em uma tabela e permite remover reservas 
- **Vagas disponíveis** (`vagas.html`): Mapa das 30 vagas com os contadores (reservadas, livres e total). 
- **Nova reserva** (`cadastro.html`): Formulário de reserva que abre pelo menu ou ao clicar em uma vaga livre no mapa de vagas.

## Funcionalidades

- **Duas formas de reservar:** pelo item Nova reserva do menu ou clicando em uma vaga disponível no mapa de vagas, que abre o cadastro com a vaga escolhida.
- **Cadastro**: Deve ser informado placa, nome do proprietário, número e bloco do apartamento, modelo, cor e número da vaga. Ao clicar em Salvar, os dados aparecem no `console.log` e um pop-up confirma o cadastro.
- **Validação**: placa no formato ABC1234 ou ABC1D23, placa repetida, vaga já ocupada e campos vazios. O nome do proprietário e a cor do veículo aceitam apenas letras, e o modelo precisa conter letras (aceita, por exemplo, "HB20", mas não "999"). A remoção pede confirmação.
- **Vagas disponíveis**: calculadas a partir das reservas e separadas das vagas reservadas.
- As novas reservas são guardadas no `localStorage` do navegador, por isso aparecem em todas as telas.
- **Layout**: no celular, o menu lateral vira uma barra no topo.

## Padrão de projeto: MVC

O código JavaScript segue o padrão **MVC (Model, View, Controller)**:

```text
controle-estacionamento/
├── index.html                  ← tela: vagas cadastradas
├── vagas.html                  ← tela: mapa de vagas disponíveis
├── cadastro.html               ← tela: cadastro de reserva
├── css/
│   └── style.css               ← estilos de todas as telas
└── js/
    ├── model/
    │   └── reservaModel.js     ← dados e regras: listar, salvar, remover, validar
    ├── view/
    │   └── reservaView.js      ← funções que desenham na tela
    └── controller/
        ├── cadastroController.js
        ├── listagemController.js
        └── vagasController.js
```


- **Model**: Guarda a lista de reservas e as regras, apresenta os métodos: `listar()`, `salvar()`, `remover()`, `listarVagasDisponiveis()`, `validar()` e não acessa o HTML. 
- **View**: Monta a tabela, o mapa de vagas, as opções do formulário, as mensagens de erro e não guarda dados. 
- **Controller**: Um por tela, ouve os eventos (envio do formulário, clique em Remover), chama o Model e pede para a View atualizar a tela. 

**Fluxo de um cadastro:** o usuário abre o formulário (pelo menu ou pelo mapa), preenche e clica em Salvar → o Controller lê o formulário → o Model valida e salva → o Controller mostra o `console.log` e o pop-up → a View atualiza a lista de vagas livres.

## Como executar

**Online:** acesse o link: https://nicolegall.github.io/controle-estacionamento-desafio1/

**No computador**:
1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (ou use a extensão *Live Server* do VS Code).

**Observação:** No Firefox, abrir os arquivos direto do computador impede que as reservas cadastradas apareçam na listagem, neste caso, abra o projeto pelo link online ou pelo Live Server. 
Para ver o `console.log`, aperte F12 e abra a aba Console.

## Tecnologias

- HTML5 
- CSS3 
- JavaScript 


