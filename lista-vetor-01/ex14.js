let numeros  = [1, 2, 3, 4, 5, 6, 7, 8,];
let x = 5;
let contador = -1;
for(let i = 0; i< numeros.length; i++){
    if(numeros[i] === x){
   contador = i;
   break;
    }
    
}
console.log ("o numero apareceu na posiçao",contador )