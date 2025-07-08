let listaDeContatos: Array<Contato> = [];

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

function adicionaContatos (): void {
  let contatoNumero: number = parseFloat(prompt("Número do contato")!);
  let contatoNome = prompt("Nome do contato")!;
  let contatoSobrenome= prompt("Sobrenome do contato") || undefined; // --> lembrando esses atributos não são obrigatórios
  let contatoEmpresa = prompt("Nome da empresa") || undefined;
  let contatoEmail = prompt("Email")! || undefined;
  
  let contato = new Contato(contatoNumero, contatoNome, contatoSobrenome, contatoEmpresa, contatoEmail);
  listaDeContatos.push(contato);
}

alert(adicionaContatos());
console.log(listaDeContatos); 