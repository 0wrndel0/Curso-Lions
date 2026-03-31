const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let proximoId = 1;
let alunos = [];
function mostrarMenu() {
    console.log("\n======================");
    console.log("SISTEMA ESCOLAR");
    console.log("=======================");
    console.log("1 - Cadastrar Aluno");
    console.log("2 - Listar Aluno");
    console.log("3 - Buscar por ID");
    console.log("4 - Atualizar Aluno");
    console.log("5 - Remover Aluno");
    console.log("6 - Mostrar Alunos Aprovados");
    console.log("7 - Mostrar Alunos Reprovados");
    console.log("0 - Sair");
    console.log("=======================");

    rl.question("Escolha uma opção ", (opcao) => {
        if (opcao === "1") {
            cadastrarAluno();
        }else if (opcao === "2"){
            listarAluno();
        }else if(opcao === "3"){
            buscarAlunoporId();
        }
    })
}
function listarAluno(){
    console.log("listar alunos")
    if (alunos.lenth === 0){
        console.log("nenhum aluno cadastrado ");
        mostrarMenu();
        return;
    }
    for(let i = 0; i < alunos.length; i++){
        console.log("\n ID:" + alunos[i].id);
        console.log("\n Nome:" + alunos[i].nome)
        console.log("\n Idade:" + alunos[i].idade)
        console.log("\n Turma:" + alunos[i].turma)
        console.log("\n Nota:" + alunos[i].nota)
    }
    mostrarMenu();
}

function cadastrarAluno(){
    console.log("Cadastrar Aluno");

    rl.question("digite o nome do aluno ", (nome) => {
        rl.question("Digite a idade do aluno: ", (idade) => {
            rl.question("Digite a turma do aluno: ", (turma) => {
                rl.question("Digite a nota do aluno: ", (nota) => {
                    idade = Number(idade);
                    nota = Number(nota);


                    if(nome === "" || idade === "" || turma === "" || nota === ""){
                        console.log("ERRO: Não prrencheu todas as infos");
                        mostrarMenu();
                        return;
                    } 

                    if(idade <= 0 ||nota < 0 || nota > 10) {
                        console.log("ERRO: Idade ou nota inválida");
                        mostrarMenu();
                        return;
                    }let aluno ={
                      id: proximoId,
                      nome: nome,
                      idade: idade,
                      turma: turma,
                      nota: nota
                    };

                    alunos.push(aluno);
                    proximoId++;

                    console.log("aluno cadastrado com sucesso")
                    mostrarMenu();
                    
                })
            })
        })
    })
}
function buscarAlunoporId(){
    console.log("buscar aluno por id")
    rl.question("digite o ID do aluno:", (id) => {
        id = Number(id);
        let aluno = encontrarAlunoPorId(id) 
        if (aluno === null){
            console.log("aluno nao encontrado");
            mostrarMenu();
            return;
        }
        console.log("\nAluno encontrado")
        console.log("\n ID:" + aluno.id);
        console.log("\n Nome:" + aluno.nome)
        console.log("\n Idade:" + aluno.idade)
        console.log("\n Turma:" + aluno.turma)
        console.log("\n Nota:" + aluno.nota)
    })
}
function encontrarAlunoPorId(id){
for(let i = 0; i < alunos.length; i++){
    if(alunos[i].id === id) {
        return alunos[i];
    }

}

return null;
}

mostrarMenu();