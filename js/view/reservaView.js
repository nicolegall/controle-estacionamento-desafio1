/* View: tudo que desenha ou altera a tela.
 * Os textos digitados pelo usuário são inseridos com textContent
 * (e não com innerHTML), o que evita que um código HTML digitado
 * no formulário seja executado na página.*/

// Cria uma célula com um texto
function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

const ReservaView = {
  // Tabela de reservas 
  renderizarTabela(reservas) {
    const tbody = document.getElementById('tabela-reservas');
    const avisoVazio = document.getElementById('lista-vazia');
    tbody.innerHTML = '';

    reservas.forEach(function (reserva) {
      const linha = document.createElement('tr');
      linha.appendChild(criarCelula(reserva.vaga));
      linha.appendChild(criarCelula(reserva.placa));
      linha.appendChild(criarCelula(reserva.proprietario));
      linha.appendChild(criarCelula(reserva.apartamento));
      linha.appendChild(criarCelula(reserva.bloco));
      linha.appendChild(criarCelula(reserva.modelo));
      linha.appendChild(criarCelula(reserva.cor));

      const tdAcoes = document.createElement('td');
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'btn btn-remover';
      botao.textContent = 'Remover';
      botao.dataset.id = reserva.id; // para saber qual remover
      tdAcoes.appendChild(botao);
      linha.appendChild(tdAcoes);

      tbody.appendChild(linha);
    });

    // Mostra a mensagem "nenhuma reserva" quando a lista está vazia
    avisoVazio.classList.toggle('oculto', reservas.length > 0);
  },

  // Contadores do mapa de vagas (reservadas, livres, total)
  renderizarResumo(totalReservas, totalDisponiveis, totalVagas) {
    document.getElementById('resumo-ocupadas').textContent = totalReservas;
    document.getElementById('resumo-disponiveis').textContent = totalDisponiveis;
    document.getElementById('resumo-total').textContent = totalVagas;
  },

  // Mapa de vagas
  renderizarMapaVagas(vagasLivres, reservas) {
    const gradeLivres = document.getElementById('grade-livres');
    const gradeReservadas = document.getElementById('grade-reservadas');
    gradeLivres.innerHTML = '';
    gradeReservadas.innerHTML = '';

    // Vagas livres (abre o cadastro com a vaga escolhida)
    vagasLivres.forEach(function (numero) {
      const cartao = document.createElement('a');
      cartao.className = 'vaga vaga-livre';
      cartao.href = `cadastro.html?vaga=${numero}`;

      const titulo = document.createElement('strong');
      titulo.textContent = `Vaga ${numero}`;
      const detalhe = document.createElement('span');
      detalhe.textContent = 'Disponível · reservar';

      cartao.appendChild(titulo);
      cartao.appendChild(detalhe);
      gradeLivres.appendChild(cartao);
    });

    // Vagas reservadas
    reservas.forEach(function (reserva) {
      const cartao = document.createElement('div');
      cartao.className = 'vaga vaga-reservada';

      const titulo = document.createElement('strong');
      titulo.textContent = `Vaga ${reserva.vaga}`;
      const placa = document.createElement('span');
      placa.textContent = reserva.placa;
      const apartamento = document.createElement('span');
      apartamento.textContent = `Apto ${reserva.apartamento} · Bloco ${reserva.bloco}`;

      cartao.appendChild(titulo);
      cartao.appendChild(placa);
      cartao.appendChild(apartamento);
      gradeReservadas.appendChild(cartao);
    });

    // Mensagens para quando um dos grupos fica vazio
    document.getElementById('livres-vazio').classList.toggle('oculto', vagasLivres.length > 0);
    document.getElementById('reservadas-vazio').classList.toggle('oculto', reservas.length > 0);
  },

  // select só vagas livres
  preencherSelectVagas(vagasLivres, vagaSelecionada) {
    const select = document.getElementById('vaga');
    select.innerHTML = '';

    const primeira = document.createElement('option');
    primeira.value = '';
    primeira.textContent = vagasLivres.length ? 'Selecione a vaga...' : 'Nenhuma vaga disponível';
    select.appendChild(primeira);

    vagasLivres.forEach(function (numero) {
      const opcao = document.createElement('option');
      opcao.value = numero;
      opcao.textContent = `Vaga ${numero}`;
      opcao.selected = numero === vagaSelecionada;
      select.appendChild(opcao);
    });
  },

  // Caixa de erros do formulário
  mostrarErros(erros) {
    const caixa = document.getElementById('erros');
    caixa.innerHTML = '';
    const lista = document.createElement('ul');
    erros.forEach(function (mensagem) {
      const item = document.createElement('li');
      item.textContent = mensagem;
      lista.appendChild(item);
    });
    caixa.appendChild(lista);
    caixa.classList.remove('oculto');
  },

  limparErros() {
    const caixa = document.getElementById('erros');
    caixa.innerHTML = '';
    caixa.classList.add('oculto');
  }
};
