/* Model: dados e regras de negócio das reservas de vagas.
 * guarda a lista de reservas e oferece os métodos
 * Como não existe back-end, os dados ficam tanto em um array com reservas fictícias
 * (dados iniciais) ou no localStorage do navegador, para que uma reserva feita
 *na tela de cadastro apareça também na tela de listagem.
 */

const TOTAL_VAGAS = 30;
const CHAVE_STORAGE = 'estacionamento:reservas-v2'; // nome novo para carregar os novos dados fictícios

// Dados fictícios usados na primeira vez que o sistema é aberto
const RESERVAS_INICIAIS = [
  { id: 1, placa: 'ABC1D23', proprietario: 'Proprietário 1', apartamento: 101, bloco: 'A', modelo: 'Hyundai', cor: 'Prata', vaga: 5 },
  { id: 2, placa: 'BRA2E19', proprietario: 'Proprietário 2', apartamento: 204, bloco: 'B', modelo: 'Fiat', cor: 'Branco', vaga: 9 },
  { id: 3, placa: 'QWE4567', proprietario: 'Proprietário 4', apartamento: 302, bloco: 'A', modelo: 'Nissan', cor: 'Preto', vaga: 24 },
  { id: 4, placa: 'RTY8F90', proprietario: 'Proprietário 3', apartamento: 403, bloco: 'C', modelo: 'Honda', cor: 'Vermelho', vaga: 12 }
];

// Lê a lista salva no navegador (texto JSON) e converte para array
function carregarDoStorage() {
  try {
    const texto = localStorage.getItem(CHAVE_STORAGE);
    return texto ? JSON.parse(texto) : [...RESERVAS_INICIAIS];
  } catch (erro) {
    return [...RESERVAS_INICIAIS];
  }
}

// Converte o array para texto JSON e grava no navegador
function gravarNoStorage(lista) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  } catch (erro) {
    console.warn('Não foi possível gravar no localStorage:', erro);
  }
}

const ReservaModel = {
  reservas: carregarDoStorage(),

  // LISTAR: devolve todas as reservas, ordenadas pelo número da vaga
  listar() {
    return [...ReservaModel.reservas].sort((a, b) => a.vaga - b.vaga);
  },

  // SALVAR: cria a reserva com um id único e guarda
  salvar(dados) {
    const nova = { id: Date.now(), ...dados };
    ReservaModel.reservas.push(nova);
    gravarNoStorage(ReservaModel.reservas);
    return nova;
  },

  // REMOVER: tira da lista a reserva com o id informado
  remover(id) {
    ReservaModel.reservas = ReservaModel.reservas.filter(r => r.id !== id);
    gravarNoStorage(ReservaModel.reservas);
  },

  // Todas as vagas do condomínio
  listarTodasAsVagas() {
    const vagas = [];
    for (let numero = 1; numero <= TOTAL_VAGAS; numero++) {
      vagas.push(numero);
    }
    return vagas;
  },

  // Vagas que não aparecem em nenhuma reserva
  listarVagasDisponiveis() {
    const ocupadas = ReservaModel.reservas.map(r => r.vaga);
    return ReservaModel.listarTodasAsVagas().filter(n => !ocupadas.includes(n));
  },

  // Reserva que ocupa uma vaga (ou undefined se estiver livre)
  buscarPorVaga(vaga) {
    return ReservaModel.reservas.find(r => r.vaga === vaga);
  },

  // Devolve uma lista de mensagens de erro 
  validar(dados) {
    const erros = [];
    const formatoPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/; 
    const somenteLetras = /^[\p{L}\s'-]+$/u; // só letras (com acento), espaço, hífen e apóstrofo
    const temLetra = /\p{L}/u;               // pelo menos uma letra

    if (!formatoPlaca.test(dados.placa)) {
      erros.push('Placa inválida. Use o formato ABC1234 ou ABC1D23.');
    } else if (ReservaModel.reservas.some(r => r.placa === dados.placa)) {
      erros.push('Esta placa já possui uma vaga reservada.');
    }

    if (dados.proprietario.length < 3) {
      erros.push('Informe o nome do proprietário (mínimo de 3 letras).');
    } else if (!somenteLetras.test(dados.proprietario)) {
      erros.push('O nome do proprietário deve conter apenas letras.');
    }
    if (!Number.isInteger(dados.apartamento) || dados.apartamento <= 0) {
      erros.push('Informe um número de apartamento válido.');
    }
    if (!dados.bloco) {
      erros.push('Selecione o bloco.');
    }
    if (!dados.modelo) {
      erros.push('Informe o modelo do veículo.');
    } else if (!temLetra.test(dados.modelo)) {
      erros.push('O modelo do veículo deve conter letras (ex.: Fiat, HB20).');
    }
    if (!dados.cor) {
      erros.push('Informe a cor do veículo.');
    } else if (!somenteLetras.test(dados.cor)) {
      erros.push('A cor do veículo deve conter apenas letras.');
    }

    if (!Number.isInteger(dados.vaga) || dados.vaga < 1 || dados.vaga > TOTAL_VAGAS) {
      erros.push(`Selecione uma vaga entre 1 e ${TOTAL_VAGAS}.`);
    } else if (ReservaModel.buscarPorVaga(dados.vaga)) {
      erros.push(`A vaga ${dados.vaga} já está ocupada.`);
    }

    return erros;
  }
};
