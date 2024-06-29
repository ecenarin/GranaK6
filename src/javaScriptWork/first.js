let name = "Ece";
const age = 30;
var city = "Wroclaw";
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Ece"));
let number = 10;
if (number > 5) {
    console.log("Number is greater than 5");
} else {
    console.log("Number is 5 or less");
}
for (let i = 0; i < 5; i++) {
    console.log(i);
}
let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]); // Apple
let person = {
    name: "Ece",
    age: 30,
    city: "Wroclaw"
};
console.log(person.name); // Ece

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's your name? ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
});


