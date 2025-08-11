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
const inputAlteracaoNome = document.getElementById('alteracoes-nome') as HTMLInputElement;
const inputAlteracaoSobrenome = document.getElementById('alteracoes-sobrenome') as HTMLInputElement
const inputAlteracaoNumero = document.getElementById('alteracoes-numero') as HTMLInputElement
const inputAlteracaoEmpresa = document.getElementById('alteracoes-empresa') as HTMLInputElement
const inputAlteracaoEmail = document.getElementById('alteracoes-email') as HTMLInputElement

const listaHtml = document.getElementById('lista-de-contatos') as HTMLUListElement; // Onde os contatos serão exibidos

const btnAdicionar = document.getElementById('btn-adicionar') as HTMLButtonElement;
const btnPesquisar = document.getElementById('btn-pesquisar') as HTMLButtonElement;
const btnExcluir = document.getElementById('btn-excluir') as HTMLButtonElement;
const btnSalvarAlteracoes = document.getElementById('btn-salvar-alteracoes') as HTMLButtonElement;
const btnCancelarAlteracoes = document.getElementById('btn-cancelar-alteracoes') as HTMLButtonElement;

btnAdicionar.addEventListener('click', adicionaContatos);
btnPesquisar.addEventListener('click', lidarComPesquisa);
btnExcluir.addEventListener('click', excluirContato);
btnSalvarAlteracoes.addEventListener('click', editarContato);
btnCancelarAlteracoes.addEventListener('click', fecharFormulario)

const overlay = document.getElementById('overlay') as HTMLDivElement;
let formularioDeEdicao = document.getElementById('formulario-de-edicao') as HTMLDivElement;
//-------------------------------------------------------------------------------------------------------

// Variavel global
// Inicia como null, essa variavel captura um elemento que foi clicado e aberto. Os botões cancelar e salvar contato não possuem um id próprio, então eles vão receber o contato que essa variavel pegar
let contatoSendoEditado: Contato | null = null;

//-------------------------------------------------------------------------------------------------------
function exibeContatos(lista?: Array<Contato>): void { //exibe uma lista filtrada, ou caso seja executada sem uma lista exibe a listaDeContatos (lista principal)

  listaHtml.textContent = '' // -->  para limpar a lista visualmente antes de renderizar os itens novamente.

  // pq limpar? precisamos garantir que não estamos duplicando a exibição.

  if (lista?.length === 0 || listaDeContatos.length === 0) {
    console.log("Nenhum contato encontrado.");
  }

  if (lista !== undefined) {
    // forEach acessa cada elemento e executa uma função com ele
    // inserindo no elemento a ser exibido na lista
    lista.forEach(contato => {
      const liDeContatos = document.createElement('li'); // elemento novo para o html
      liDeContatos.id = `contato-item-${contato.nome.replace(/\s/g, '-')}-${contato.numero}`; // esse id eu implementei depois, ele torna cada contato identificavel para ser usado em parametros de funções
      liDeContatos.addEventListener('click', lidarCliqueContato);
      liDeContatos.textContent = `Nome: ${contato.nome}, Sobrenome: ${contato.sobrenome || "N/A"}, Número: ${contato.numero},Empresa: ${contato.empresa || "N/A"}, Email: ${contato.email || "N/A"}`;
      listaHtml.appendChild(liDeContatos); // --> anexa os contatos formatado que veio de uma lista filtrada a listaHtml (lista não ordenada lá do html)
    });
  } else {
    listaDeContatos.forEach(contato => {
      const liDeContatos = document.createElement('li'); // elemento novo para o html, 'li' é uma tag que o html já entende como o elemento de uma lista
      liDeContatos.id = `contato-item-${contato.nome.replace(/\s/g, '-')}-${contato.numero}`; // formatando o id do contato (*)
      liDeContatos.addEventListener('click', lidarCliqueContato);
      liDeContatos.textContent = `Nome: ${contato.nome},  Sobrenome: ${contato.sobrenome || "N/A"},  Número: ${contato.numero},  Empresa: ${contato.empresa || "N/A"},  Email: ${contato.email || "N/A"}`;
      listaHtml.appendChild(liDeContatos); // --> anexa os contatos formatados que vieram do array listaDeContatos a listaHtml
    });
  }

}

function adicionaContatos(): void {

  let contatoNumero: string = inputTelefone.value.trim(); // .trim() retira os espaços transforma, por exemplo '    barril    ' em: 'barril' importante pq o usuario pode digitar apenas espaço no nome de contato e queremos que isso seja desconsiderado.  
  let contatoNome: string = inputNome.value.trim();
  let contatoSobrenome: string | undefined = inputSobrenome.value.trim() || undefined; // --> lembrando esses atributos não são obrigatórios
  let contatoEmpresa: string | undefined = inputEmpresa.value.trim() || undefined;
  let contatoEmail: string | undefined = inputEmail.value.trim() || undefined;

  const erro: string | null = validaContato(contatoNome, contatoNumero);

  if (erro !== null) {
    alert(erro);
    return;
  }

  else {

    let novoContato = new Contato(contatoNumero, contatoNome, contatoSobrenome, contatoEmpresa, contatoEmail);

    listaDeContatos.push(novoContato);

    exibeContatos();

    // Limpa os campos de digitação do HTML para a próxima entrada

    inputTelefone.value = "";
    inputNome.value = "";
    inputSobrenome.value = "";
    inputEmpresa.value = "";
    inputEmail.value = "";

  }
}


function excluirContato(): void {
  let IndexContato = listaDeContatos.findIndex((contato) => contato == contatoSendoEditado);
  listaDeContatos.splice(IndexContato, 1);

  fecharFormulario();
  exibeContatos();
}

function editarContato(): void {

  let index = listaDeContatos.findIndex((contato) => contato == contatoSendoEditado);

  const novoNome = inputAlteracaoNome.value.trim();
  const novoNumero = inputAlteracaoNumero.value.trim();
  const novoSobrenome = inputAlteracaoSobrenome.value.trim() || undefined;
  const novoEmpresa = inputAlteracaoEmpresa.value.trim() || undefined;
  const novoEmail = inputAlteracaoEmail.value.trim() || undefined;

  const erro: string | null = validaContato(novoNome, novoNumero, contatoSendoEditado);

  if (erro) {
    alert(erro);
  }

  else {

    listaDeContatos[index].numero = novoNumero;
    listaDeContatos[index].nome = novoNome;
    listaDeContatos[index].sobrenome = novoSobrenome ?? 'N/A';
    listaDeContatos[index].empresa = novoEmpresa ?? 'N/A';
    listaDeContatos[index].email = novoEmail ?? 'N/A';

    alert(`Contato editado: \n \n Nome: ${listaDeContatos[index].nome} \n Número: ${listaDeContatos[index].numero} \n Sobrenome: ${listaDeContatos[index].sobrenome} \n Empresa: ${listaDeContatos[index].empresa} \n Email: ${listaDeContatos[index].email}`);

    fecharFormulario();
    exibeContatos();
  }
}

function verificaBusca(contatoAtual: Contato, termoDePesquisa: string): boolean {
  let verificacaoPorContato: Array<string> = [
    contatoAtual.nome.toLowerCase(),
    (contatoAtual.sobrenome ?? '').toLowerCase(),
    contatoAtual.numero.toLowerCase(),
    (contatoAtual.empresa ?? '').toLowerCase(),
    (contatoAtual.email ?? '').toLowerCase()
  ];
  return verificacaoPorContato.some((valor) => valor.includes(termoDePesquisa));
}

function lidarComPesquisa(): void {
  let termoDePesquisa = inputTermoProcurado.value.toLowerCase();
  if (termoDePesquisa === '') {
    return exibeContatos();
  }
  let contatosFiltrados = listaDeContatos.filter(contato => verificaBusca(contato, termoDePesquisa));
  exibeContatos(contatosFiltrados);
}

function lidarCliqueContato(event: Event): void {
  console.log("função lidarCliqueContato() funcionando");
  let elementoClicado = event.currentTarget as HTMLLIElement; // evento disparado no caso clicar o li (elemento da lista de contatos)
  let idDoContatoClicado = elementoClicado.id;
  let partesDoContato: Array<string> = idDoContatoClicado.split('-'); // formatei o id de cada contato assim: ex contato-item-Maria-Silva-987654321. E agora estou retirando os '-' para pegar o nome e numero separados
  let numeroExtraido = partesDoContato[partesDoContato.length - 1]; //captura do ultimo elemento (numero)
  let nomeExtraido: string = partesDoContato.slice(2, partesDoContato.length - 1).join(' '); //captura do 3º elemento até o penultimo (excluindo 'contato' e 'item') e formatação com o join(). Fazendo por exemplo o id Maria-Silva se tornar Maria Silva
  console.log(numeroExtraido);
  console.log(nomeExtraido);
  //Pesquisa do contato com base no nome + numero
  let contatoEncontrado = listaDeContatos.find((contato) => contato.nome == nomeExtraido && contato.numero == numeroExtraido)

  if (contatoEncontrado) { // Se contatoEncontrado existir ele é true. Coisas o if em TypeScript e JavaScript
    abrirFormulario(contatoEncontrado!);
  }
  else console.log("Erro: Contato não encontrado para o ID:", idDoContatoClicado);
}

function abrirFormulario(contato: Contato) {
  overlay.classList.add('ativo'); // ativa o 'overlay' que é fundo semi-transparente
  formularioDeEdicao.classList.add('ativo'); // ativa o formulario (torna ele visivel) por cima do overlay

  // inserindo o dado do contato selecionado nos campos de alteração
  inputAlteracaoNome.value = contato.nome;
  inputAlteracaoSobrenome.value = contato.sobrenome ?? '';
  inputAlteracaoNumero.value = contato.numero;
  inputAlteracaoEmpresa.value = contato.empresa ?? '';
  inputAlteracaoEmail.value = contato.email ?? '';

  // definindo minha variavel global para depois repassa-la para os botões de 'Salvar Alterações' e 'Excluir'
  contatoSendoEditado = contato;
}

function fecharFormulario(): void {
  overlay.classList.remove('ativo'); // Remove a classe que exibe o overlay
  formularioDeEdicao.classList.remove('ativo'); // Remove a classe que exibe o formulário
}

function validaContato(contatoNome: string, contatoNumero: string, contatoAEditar?: Contato | null): string | null { // precisei incluir uma variavel opcional para ignorar o contato que está sendo editado na hora de comparar pra ver se há duplicidade de contatos. Caso contrário a função '.some' vai disparar erro ao encontrar o mesmo contato que já está sendo editado.

  if (contatoNumero == '' || contatoNome == '') {
    return 'nome e número precisam estar preenchidos!';
  }

  if (isNaN(Number(contatoNumero))) { // verifica se o usuario digitou um nome. Se digitou, Number(contatoNumero) vai resultar em NaN o que torna esse if(true) e dispara o alert de erro pro usuario
    return 'número inválido';
  }

  const contatoDuplicado: boolean = listaDeContatos.some(contatoAtualNaLista => {
    // Primeira verificação: É o contato que estamos editando?
    if (contatoAtualNaLista === contatoAEditar) {
      // Se for o próprio contato que estamos editando,
      // NÃO o consideramos um duplicado.
      return false;
    }
    // Segunda verificação: É um duplicado do novo nome/número?
    // Só chegamos aqui se não for o contato em edição.

    // Tem o mesmo nome? retorna true: existe um erro!
    else if (contatoAtualNaLista.nome === contatoNome) {
      return true;
    }
    // Tem o mesmo numero? retorna true: existe um erro!
    else if (contatoAtualNaLista.numero === contatoNumero) {
      return true;
    }
  });

  if (contatoDuplicado) { // contatoDuplicado retorna 'true' se nele houver um valor
    return "Já existe um contato com o mesmo nome e/ou número.";
  }

  return null; // Se tudo passar
}