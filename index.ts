let listaDeContatos: Array<Contato> = []; //array recebe recebe objetos. No caso especifiquei objetos da classe contatos

// adicionador de listaDeContatos

class Contato { // antes de construir de fato o objeto é preciso definir suas variaveis
  numero: number;
  nome: string;
  sobrenome?: string; // --> "?" torna essa propriedade opcional, ou seja ela pode receber string ou undefined
  empresa?: string;
  email?: string;


  constructor(numero: number, nome: string, sobrenome: string | undefined, empresa: string | undefined, email: string | undefined) {
    this.numero = numero;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.empresa = empresa;
    this.email = email;
  }
}

function adicionaContatos(): void {
  let contatoNumero: number = parseFloat(prompt("Número do contato")!);
  let contatoNome = prompt("Nome do contato")!;
  let contatoSobrenome = prompt("Sobrenome do contato") || undefined; // --> lembrando esses atributos não são obrigatórios
  let contatoEmpresa = prompt("Nome da empresa") || undefined;
  let contatoEmail = prompt("Email")! || undefined;

  let contato = new Contato(contatoNumero, contatoNome, contatoSobrenome, contatoEmpresa, contatoEmail);
  listaDeContatos.push(contato);
}

function exibeContatos(): void {
  if (listaDeContatos.length === 0) {
    console.log("Nenhum contato cadastrado.");
    return;
  }

  console.log("Lista de Contatos:");
  listaDeContatos.forEach((contato) => {  // --> forEach percorre o array e executa a função para cada elemento, no caso mostrando eles
    console.log(`Número: ${contato.numero}, Nome: ${contato.nome}, Sobrenome: ${contato.sobrenome || "N/A"}, Empresa: ${contato.empresa || "N/A"}, Email: ${contato.email || "N/A"}`);
  });
}

function buscaContato(contatoNome: string): number {
  for (let i = 0; i < listaDeContatos.length; i++) {
    if (listaDeContatos[i].nome == contatoNome) {
      return i;
    }
  }
  return -1;
}


function excluirContato(nomeParaExcluir: string): void {
  let index = buscaContato(nomeParaExcluir); // --> findIndex retorna o índice do primeiro elemento que satisfaz a condição fornecida, ou -1 se nenhum elemento satisfizer a condição

  if (index !== -1) {
    listaDeContatos.splice(index, 1);
    console.log(`Contato com número ${nomeParaExcluir} excluído.`);
  } else {
    console.log(`Contato com número ${nomeParaExcluir} não encontrado.`);
  }
}

