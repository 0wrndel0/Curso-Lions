let vetor = [10, 25, 8, 40, 15, 30]
let maior = vetor [0];
let segundoMaior = vetor [0];

for (let i = 1; i < vetor.length; i++){
    if (vetor [i] > maior ){
        segundoMaior = maior
        maior = vetor[i] 
    } else if ( vetor [i] > segundoMaior && vetor [i] != maior  )
    segundoMaior = vetor [i]
}
console.log ("maior numero", maior)
console.log("segundo maior ", segundoMaior)
