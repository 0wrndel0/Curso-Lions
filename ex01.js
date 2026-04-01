const prompt = require("prompt-sync")();

// ================== DADOS ==================
let carros = [];
let clientes = [];
let alugueis = [];

let proximoIdCarro = 1;
let proximoIdCliente = 1;
let proximoIdAluguel = 1;

// ================== CARROS ==================
function cadastrarCarro() {
    let modelo = prompt("Modelo: ");
    let placa = prompt("Placa: ");
    let ano = Number(prompt("Ano: "));
    let precoPorDia = Number(prompt("Preço por dia: "));

    carros.push({
        id: proximoIdCarro++,
        modelo,
        placa,
        ano,
        precoPorDia,
        disponivel: true
    });

    console.log("Carro cadastrado!");
}

function listarCarros() {
    console.log(carros);
}

function buscarCarroPorId() {
    let id = Number(prompt("ID do carro: "));
    let carro = carros.find(c => c.id === id);
    console.log(carro || "Carro não encontrado");
}

function atualizarCarro() {
    let id = Number(prompt("ID do carro: "));
    let carro = carros.find(c => c.id === id);

    if (carro) {
        carro.modelo = prompt("Novo modelo: ");
        carro.placa = prompt("Nova placa: ");
        carro.ano = Number(prompt("Novo ano: "));
        carro.precoPorDia = Number(prompt("Novo preço: "));
        console.log("Atualizado!");
    } else {
        console.log("Carro não encontrado");
    }
}

function removerCarro() {
    let id = Number(prompt("ID do carro: "));
    carros = carros.filter(c => c.id !== id);
    console.log("Removido!");
}

// ================== CLIENTES ==================
function cadastrarCliente() {
    let nome = prompt("Nome: ");
    let cpf = prompt("CPF: ");
    let telefone = prompt("Telefone: ");

    clientes.push({
        id: proximoIdCliente++,
        nome,
        cpf,
        telefone
    });

    console.log("Cliente cadastrado!");
}

function listarClientes() {
    console.log(clientes);
}

function buscarClientePorId() {
    let id = Number(prompt("ID do cliente: "));
    let cliente = clientes.find(c => c.id === id);
    console.log(cliente || "Cliente não encontrado");
}

function atualizarCliente() {
    let id = Number(prompt("ID do cliente: "));
    let cliente = clientes.find(c => c.id === id);

    if (cliente) {
        cliente.nome = prompt("Novo nome: ");
        cliente.cpf = prompt("Novo CPF: ");
        cliente.telefone = prompt("Novo telefone: ");
        console.log("Atualizado!");
    } else {
        console.log("Cliente não encontrado");
    }
}

function removerCliente() {
    let id = Number(prompt("ID do cliente: "));
    clientes = clientes.filter(c => c.id !== id);
    console.log("Removido!");
}

// ================== ALUGUEL ==================
function realizarAluguel() {
    let idCliente = Number(prompt("ID Cliente: "));
    let idCarro = Number(prompt("ID Carro: "));
    let dias = Number(prompt("Dias: "));

    let cliente = clientes.find(c => c.id === idCliente);
    let carro = carros.find(c => c.id === idCarro);

    if (!cliente || !carro || !carro.disponivel) {
        console.log("Erro no aluguel!");
        return;
    }

    let total = dias * carro.precoPorDia;

    alugueis.push({
        id: proximoIdAluguel++,
        idCliente,
        idCarro,
        dias,
        total,
        status: "ativo"
    });

    carro.disponivel = false;

    console.log("Aluguel realizado!");
}

function devolverCarro() {
    let id = Number(prompt("ID do aluguel: "));
    let aluguel = alugueis.find(a => a.id === id && a.status === "ativo");

    if (!aluguel) {
        console.log("Aluguel não encontrado!");
        return;
    }

    aluguel.status = "finalizado";

    let carro = carros.find(c => c.id === aluguel.idCarro);
    carro.disponivel = true;

    console.log("Carro devolvido!");
}

function listarAlugueis() {
    console.log(alugueis);
}

function listarAlugueisAtivos() {
    console.log(alugueis.filter(a => a.status === "ativo"));
}

function listarAlugueisFinalizados() {
    console.log(alugueis.filter(a => a.status === "finalizado"));
}

// ================== MENU ==================
function mostrarMenu() {
    console.log(`
==== TURBOCAR ====
1. Cadastrar carro
2. Listar carros
3. Buscar carro
4. Atualizar carro
5. Remover carro
6. Cadastrar cliente
7. Listar clientes
8. Buscar cliente
9. Atualizar cliente
10. Remover cliente
11. Realizar aluguel
12. Devolver carro
13. Alugueis ativos
14. Histórico
0. Sair
`);

    let opcao = Number(prompt("Escolha: "));

    switch (opcao) {
        case 1: cadastrarCarro(); break;
        case 2: listarCarros(); break;
        case 3: buscarCarroPorId(); break;
        case 4: atualizarCarro(); break;
        case 5: removerCarro(); break;
        case 6: cadastrarCliente(); break;
        case 7: listarClientes(); break;
        case 8: buscarClientePorId(); break;
        case 9: atualizarCliente(); break;
        case 10: removerCliente(); break;
        case 11: realizarAluguel(); break;
        case 12: devolverCarro(); break;
        case 13: listarAlugueisAtivos(); break;
        case 14: listarAlugueisFinalizados(); break;
        case 0: return;
        default: console.log("Opção inválida");
    }

    mostrarMenu();
}

// ================== START ==================
mostrarMenu();
