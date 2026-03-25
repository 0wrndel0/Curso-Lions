let numeros = [1, 2, 3, 4, 5, 6];
let menor = numeros[0];

for (let  i= 0; i < numeros.length ; i++) {
    if (numeros[i] < menor ) {
        maior = numeros[i];
    }
}


console.log(menor)