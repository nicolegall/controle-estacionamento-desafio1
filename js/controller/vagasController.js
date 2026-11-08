/* CONTROLLER da tela de vagas (vagas.html).*/

document.addEventListener('DOMContentLoaded', function () {
  const vagasLivres = ReservaModel.listarVagasDisponiveis();
  const reservas = ReservaModel.listar();

  ReservaView.renderizarMapaVagas(vagasLivres, reservas);
  ReservaView.renderizarResumo(reservas.length, vagasLivres.length, TOTAL_VAGAS);
});
