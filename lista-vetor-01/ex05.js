let numeros = [1, 2, 3, 4, 5, 6];
let maior = numeros[0];

for (let  i= 0; i < numeros.length ; i++) {
    if (numeros[i] > maior ) {
        maior = numeros[i];
    }
}


console.log(maior)