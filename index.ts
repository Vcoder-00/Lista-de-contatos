// Construindo a classe Contato

class Contato { // antes de construir de fato o objeto é preciso definir suas variaveis
  numero: string;
  nome: string;
  sobrenome?: string; // --> "?" torna essa propriedade opcional, ou seja ela pode receber string ou undefined
  empresa?: string;
  email?: string;

  constructor(numero: string, nome: string, sobrenome: string | undefined, empresa: string | undefined, email: string | undefined) {
    this.numero = numero;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.empresa = empresa;
    this.email = email;
  }
}

// Array recebe recebe objetos. No caso especifiquei para APENAS objetos da classe contatos

let listaDeContatos: Array<Contato> = [];

// Coletando os elementos do html

const inputNome = document.getElementById('contato-nome') as HTMLInputElement;
const inputTelefone = document.getElementById('contato-numero') as HTMLInputElement;
const inputSobrenome = document.getElementById('contato-sobrenome') as HTMLInputElement;
const inputEmpresa = document.getElementById('contato-empresa') as HTMLInputElement;
const inputEmail = document.getElementById('contato-email') as HTMLInputElement;
const inputTermoProcurado = document.getElementById('termo-procurado') as HTMLInputElement;
const inputNomeExcluido = document.getElementById('nome-excluido') as HTMLInputElement;
const inputParaEditar = document.getElementById('nome-para-editar') as HTMLInputElement;

const btnAdicionar = document.getElementById('btn-adicionar') as HTMLButtonElement;
const btnPesquisar = document.getElementById('btn-pesquisar') as HTMLButtonElement;
const btnExcluir = document.getElementById('btn-excluir') as HTMLButtonElement;
const btnEditar = document.getElementById('btn-editar') as HTMLButtonElement;
const listaHtml = document.getElementById('lista-de-contatos') as HTMLUListElement; // Onde os contatos serão exibidos
btnAdicionar.addEventListener('click', adicionaContatos);
btnPesquisar.addEventListener('click', lidarComPesquisa);
btnExcluir
btnEditar

//-------------------------------------------------------------------------------------------------------


function exibeContatos(): void {

  listaHtml.textContent = '' // -->  para limpar a lista visualmente antes de renderizar os itens novamente.

  // pq limpar? precisamos garantir que não estamos duplicando a exibição.

  if (listaDeContatos.length === 0) {
    console.log("Nenhum contato cadastrado.");
  }

  listaDeContatos.forEach(contato => { // forEach acessa cada elemento e executa uma função com ele
    // inserindo no elemento a ser exibido na lista
    const liDeContatos = document.createElement('li'); // elemento novo para o html
    liDeContatos.textContent = `Nome: ${contato.nome}, Sobrenome: ${contato.sobrenome || "N/A"}, Número: ${contato.numero},Empresa: ${contato.empresa || "N/A"}, Email: ${contato.email || "N/A"}`;

    listaHtml.appendChild(liDeContatos); // --> arvore do DOM se anexa a esse novo elemento
  });

}

function adicionaContatos(): void {
  let contatoNumero = inputTelefone.value;
  let contatoNome = inputNome.value;
  let contatoSobrenome = inputSobrenome.value || undefined; // --> lembrando esses atributos não são obrigatórios
  let contatoEmpresa = inputEmpresa.value || undefined;
  let contatoEmail = inputEmail.value || undefined;

  let contato = new Contato(contatoNumero, contatoNome, contatoSobrenome, contatoEmpresa, contatoEmail);
  listaDeContatos.push(contato);

  exibeContatos();

  // Limpa os campos de input do HTML para a próxima entrada

  inputTelefone.value = "";
  inputNome.value = "";
  inputSobrenome.value = "";
  inputEmpresa.value = "";
  inputEmail.value = "";

}

// função auxiliar (ela vai ajudar as próximas funções)

function buscaContato(termoDePesquisa: string): number {
  // Normatiza o termo de pesquisa para minúsculas apenas uma vez.
  const termoNormatizado = termoDePesquisa.toLowerCase();

  // Percorre cada contato na listaDeContatos.
  for (let i = 0; i < listaDeContatos.length; i++) {
    let contato = listaDeContatos[i]; // Atribui o contato atual a uma constante para facilitar o acesso.

    // Cria um array com os valores string (em minúsculas) de todas as propriedades que você quer buscar.
    // O operador ?? garante que, se a propriedade for 'undefined', uma string vazia '' será usada.
    let valoresParaBuscar = [
      contato.nome.toLowerCase(),
      (contato.sobrenome ?? '').toLowerCase(), // Trata 'sobrenome' opcional
      contato.numero.toLowerCase(),           // Assume que 'numero' é string. Se for number, converta: String(contato.numero).toLowerCase()
      (contato.empresa ?? '').toLowerCase(),  // Trata 'empresa' opcional
      (contato.email ?? '').toLowerCase()     // Trata 'email' opcional
    ];

    // Usa 'some()' para verificar se Pelo Menos Um dos valores no array inclui o termo de pesquisa.
    // 'some()' retorna 'true' assim que encontra uma correspondência e para a iteração.
    let encontrado = valoresParaBuscar.some(valor => valor.includes(termoNormatizado));

    if (encontrado == true) {
      return i; // Se o termo for encontrado em QUALQUER propriedade do contato, retorna o índice.
    }
  }
  return -1; // Se o loop terminar e nenhum contato for encontrado, retorna -1.
}


// function excluirContato(termoParaExcluir: string): void {
//   let index = buscaContato(termoParaExcluir);

//   if (index !== -1) {
//     listaDeContatos.splice(index, 1);
//     console.log(`Contato com número ${nomeParaExcluir} excluído.`);
//   } else {
//     console.log(`Contato com número ${nomeParaExcluir} não encontrado.`);
//   }
// }

function editarContato(nomeParaEditar: string): void {
  let index = buscaContato(nomeParaEditar);
  listaDeContatos[index].numero = prompt("Insira um número")!;
  listaDeContatos[index].nome = prompt("Edite o nome")!;
  listaDeContatos[index].sobrenome = prompt("Edite o sobrenome") || "N/A";
  listaDeContatos[index].empresa = prompt("Edite o nome") || "N/A";
  listaDeContatos[index].email = prompt("Edite o nome") || "N/A";
  alert(`Contato editado: \n \n Nome: ${listaDeContatos[index].nome} \n Número: ${listaDeContatos[index].numero} \n Sobrenome: ${listaDeContatos[index].sobrenome} \n Empresa: ${listaDeContatos[index].empresa} \n Email: ${listaDeContatos[index].email}`)
}

function verificaBusca (termoDePesquisa: string): boolean {
  for (let contatos in listaDeContatos){
    if (buscaContato(termoDePesquisa) >= 0)
      return true;
  }
  return false;
}
function lidarComPesquisa(): void {
  const termoDePesquisa = inputTermoProcurado.value.toLowerCase();
  listaDeContatos.filter(verificaBusca());

}
}
