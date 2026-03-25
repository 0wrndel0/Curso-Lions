let numeros  = [1, 2, 5, 4, 5, 9, 5, 5, 6, 5,];
let contador = 0;
let x = 5;
for(let i = 0; i< numeros.length; i++){
    if(numeros[i] === x){
   contador ++
    }
}
console.log ("apareceu",contador,"vezes" )