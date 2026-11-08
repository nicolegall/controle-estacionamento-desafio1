/*CONTROLLER da tela de listagem (index.html).*/

function atualizarListagem() {
  ReservaView.renderizarTabela(ReservaModel.listar());
}

document.addEventListener('DOMContentLoaded', atualizarListagem);

document.getElementById('tabela-reservas').addEventListener('click', function (evento) {
  const botao = evento.target.closest('.btn-remover');
  if (!botao) {
    return;
  }

  const id = Number(botao.dataset.id);
  if (confirm('Deseja remover esta reserva?')) {
    ReservaModel.remover(id);
    console.log('Reserva removida. id:', id);
    atualizarListagem();
  }
});
