function add(a, b) {
    return a + b;
}

const sum = add(2, 3);
console.log(sum); // 5
function extraction(a,b){
    return a-b;
}
console.log(extraction(5,7));

const fruits = ["Apple", "Banana", "Cherry"];
fruits.push("Orange");
console.log(fruits); // ["Apple", "Banana", "Cherry", "Orange"]

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// forEach metodu
fruits.forEach(fruit => console.log(fruit));
//Arrow Fonksiyonlar
const multiply = (a, b) => a * b;
console.log(multiply(2, 3)); // 6
//destruvtion


const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
console.log(moreNumbers); // [1, 2, 3, 4, 5]

function sumAll(...args) {
    return args.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

const person = {
    name: "Ece",
    age: 30,
    city: "Wroclaw"
};

//Destructuring
const { name, age } = person;
console.log(name); // Ece


//Promise ve Async/Await
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data fetched"), 1000);
    });
};

async function getData() {
    const data = await fetchData();
    console.log(data); // Data fetched
}

getData();

