let vetor = [2, 2, 5, 7, 5]
let novoVetor =[];
let repetido;
for (let i = 0; i < vetor.length; i++){
    repetido = false;
    for (let j = 0; j < novoVetor.length; j++){
        if (vetor[i] === novoVetor [j]){
            repetido = true;
        }
    }
    if(!repetido){
        novoVetor [novoVetor.length] = vetor [i];
    }
}
console.log (novoVetor);