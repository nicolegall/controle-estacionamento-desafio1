/* Controller da tela de cadastro (cadastro.html). */

const formulario = document.getElementById('form-reserva');

// Lê os campos do formulário e devolve um objeto com os dados já tratados
function lerFormulario() {
  return {
    placa: document.getElementById('placa').value.toUpperCase().replace(/[^A-Z0-9]/g, ''), // tira espaço e hífen
    proprietario: document.getElementById('proprietario').value.trim(),
    apartamento: Number(document.getElementById('apartamento').value),
    bloco: document.getElementById('bloco').value,
    modelo: document.getElementById('modelo').value.trim(),
    cor: document.getElementById('cor').value.trim(),
    vaga: Number(document.getElementById('vaga').value)
  };
}

//Preenche o <select> com as vagas livres.
function atualizarVagas() {
  const parametros = new URLSearchParams(window.location.search);
  const vagaDaUrl = Number(parametros.get('vaga'));
  ReservaView.preencherSelectVagas(ReservaModel.listarVagasDisponiveis(), vagaDaUrl);
}

document.addEventListener('DOMContentLoaded', atualizarVagas);

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // impede o recarregamento da página

  const dados = lerFormulario();
  const erros = ReservaModel.validar(dados);

  if (erros.length > 0) {
    ReservaView.mostrarErros(erros);
    return;
  }

  ReservaView.limparErros();
  const reserva = ReservaModel.salvar(dados);

  // exibir os dados no console e um pop-up de confirmação
  console.log('Reserva cadastrada:', reserva);
  alert(`Reserva cadastrada com sucesso!\n\nVaga ${reserva.vaga} · ${reserva.placa} · ${reserva.proprietario}`);

  formulario.reset();
  window.history.replaceState(null, '', 'cadastro.html'); 
  atualizarVagas();
});

//limpa o formulário e some também a caixa de erros
formulario.addEventListener('reset', function () {
  ReservaView.limparErros();
});
