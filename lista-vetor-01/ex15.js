const nums =[1, 2, 3, 4, 5, 6 ]
let crescente = true;

for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
        crescente = false;
        break;
    }
}

if (crescente) {
    console.log("Crescente");
} else {
    console.log("Não crescente");
}