const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ARRAYS
let carros = [];
let clientes = [];
let alugueis = [];

// IDS
let proximoIdCarro = 1;
let proximoIdCliente = 1;
let proximoIdAluguel = 1;

// ================= MENU =================

function mostrarMenu() {
    console.log("\n========= TURBOCAR =========");
    console.log("1 - Cadastrar Carro");
    console.log("2 - Listar Carros");
    console.log("3 - Cadastrar Cliente");
    console.log("4 - Listar Clientes");
    console.log("5 - Realizar Aluguel");
    console.log("6 - Devolver Carro");
    console.log("7 - Alugueis Ativos");
    console.log("8 - Alugueis Finalizados");
    console.log("0 - Sair");

    rl.question("Escolha: ", (opcao) => {

        if (opcao === "1") cadastrarCarro();
        else if (opcao === "2") listarCarros();
        else if (opcao === "3") cadastrarCliente();
        else if (opcao === "4") listarClientes();
        else if (opcao === "5") realizarAluguel();
        else if (opcao === "6") devolverCarro();
        else if (opcao === "7") listarAtivos();
        else if (opcao === "8") listarFinalizados();
        else if (opcao === "0") rl.close();

    });
}

// ================= CARROS =================

function cadastrarCarro() {
    console.log("Cadastrar carro");

    rl.question("Modelo: ", (modelo) => {
        rl.question("Placa: ", (placa) => {
            rl.question("Ano: ", (ano) => {
                rl.question("Preço por dia: ", (preco) => {

                    ano = Number(ano);
                    preco = Number(preco);

                    let carro = {
                        id: proximoIdCarro++,
                        modelo,
                        placa,
                        ano,
                        precoPorDia: preco,
                        disponivel: true
                    };

                    carros.push(carro);

                    console.log("Carro cadastrado!");
                    mostrarMenu();
                });
            });
        });
    });
}

function listarCarros() {
    console.log("\n=== CARROS ===");

    for (let i = 0; i < carros.length; i++) {
        console.log(carros[i]);
    }

    mostrarMenu();
}

// ================= CLIENTES =================

function cadastrarCliente() {
    console.log("Cadastrar cliente");

    rl.question("Nome: ", (nome) => {
        rl.question("CPF: ", (cpf) => {
            rl.question("Telefone: ", (telefone) => {

                let cliente = {
                    id: proximoIdCliente++,
                    nome,
                    cpf,
                    telefone
                };

                clientes.push(cliente);

                console.log("Cliente cadastrado!");
                mostrarMenu();
            });
        });
    });
}

function listarClientes() {
    console.log("\n=== CLIENTES ===");

    for (let i = 0; i < clientes.length; i++) {
        console.log(clientes[i]);
    }

    mostrarMenu();
}

// ================= ALUGUEL =================

function realizarAluguel() {
    console.log("Realizar aluguel");

    rl.question("ID Cliente: ", (idCliente) => {
        rl.question("ID Carro: ", (idCarro) => {
            rl.question("Dias: ", (dias) => {

                idCliente = Number(idCliente);
                idCarro = Number(idCarro);
                dias = Number(dias);

                let cliente = buscarCliente(idCliente);
                let carro = buscarCarro(idCarro);

                if (!cliente) {
                    console.log("Cliente não existe");
                    mostrarMenu();
                    return;
                }

                if (!carro) {
                    console.log("Carro não existe");
                    mostrarMenu();
                    return;
                }

                if (!carro.disponivel) {
                    console.log("Carro indisponível");
                    mostrarMenu();
                    return;
                }

                let total = dias * carro.precoPorDia;

                let aluguel = {
                    id: proximoIdAluguel++,
                    idCliente,
                    idCarro,
                    dias,
                    total,
                    status: "ativo"
                };

                alugueis.push(aluguel);
                carro.disponivel = false;

                console.log("Aluguel feito! Total: " + total);
                mostrarMenu();
            });
        });
    });
}

function devolverCarro() {
    console.log("Devolver carro");

    rl.question("ID aluguel: ", (id) => {
        id = Number(id);

        let aluguel = null;

        for (let i = 0; i < alugueis.length; i++) {
            if (alugueis[i].id === id && alugueis[i].status === "ativo") {
                aluguel = alugueis[i];
            }
        }

        if (!aluguel) {
            console.log("Aluguel não encontrado");
            mostrarMenu();
            return;
        }

        aluguel.status = "finalizado";

        let carro = buscarCarro(aluguel.idCarro);
        if (carro) carro.disponivel = true;

        console.log("Carro devolvido!");
        mostrarMenu();
    });
}

function listarAtivos() {
    console.log("\n=== ATIVOS ===");

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "ativo") {
            console.log(alugueis[i]);
        }
    }

    mostrarMenu();
}

function listarFinalizados() {
    console.log("\n=== FINALIZADOS ===");

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "finalizado") {
            console.log(alugueis[i]);
        }
    }

    mostrarMenu();
}

// ================= BUSCAS =================

function buscarCarro(id) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].id === id) return carros[i];
    }
    return null;
}

function buscarCliente(id) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id === id) return clientes[i];
    }
    return null;
}

// INICIAR
mostrarMenu();
