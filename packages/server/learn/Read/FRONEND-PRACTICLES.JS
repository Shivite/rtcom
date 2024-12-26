// react memo: HOC, optimize func comp by memoizing them, render only when props will change. Improve performance by avoin unwanted extra renders,Usefull in case of pure comp : same input same output.
const myComp = react.memo((props) => {
  return <>test</>;
});length;
// if default comparision is not enough then we can do

const mycomp = react.memo(
  (props) => {},
  (prevProps, nextState) => {
    return prevProps.value !== props.value;
  }
);

//Offline Storage:
// Local storage : store the date that can be persist after browser close / refresh, use by the browser only
localstorage.getItem("key");
localstorage.setItem("key", "value");
localStorage.removeItem("key");
localStorage.clear();

//Cookies: store small piece of info on browser. and can be accessed on both client and server.
npm in cookies - parser;
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// ES6 -> let const arrow functions, template litrals,  array/Object destructuring, rest operator, spread operator, enhanced obj litrals, import, export, Promises
//let block scope
let x = 10;
if (true) {
  let x = 20;
  console.log("inside", x);
}
console.log("outside", x);

//enhanced object litrals: took the variables and group them to an object
const a = 1;
const b = 2;
const bark = () => {
  console.log(bark);
};
const obj = { a, b, bark }; // {a:1,b:2,bark(){console.log("barl")}}

// Promises

const testPromise = new Promise((resolve, reject) => {
  if (true) {
    resolve("resolved");
  } else {
    reject("reject");
  }
});
//runcases
const test = testPromise
  .then((res) => {
    console.log("respose---", res);
  })
  .catch((err) => {
    console.log("error----", err);
  });

  // title case
    let res = str.split(" ").map(word=> word[0].toUpperCase() + word.slice(1)).join(" ");

// Input: arr[] = {10, 22, 28, 29, 30, 40}, k = 54
// Output: 22 and 30

// Array: [2, 3, 6, 7]
// Target Sum: 7
// Output: [[2, 2, 3], [7]]

sort any array 
let res = data.slice().sort((a,b)=> a.age - b.age)

agile methodology, 
strict mode in react and js
find max element from array which have nested arrays
prime numbers
factorial
revese string
palindrom
fibonacii series with and without recurssion
factorial
stringfy: json data to stringfy
parse: convert from json string to javascript Object.
palindrom number [with or without inbuilt functions]
practical 
would implement a linked list with methods to insert a node at the beginning, end, and at specific positions. Then, I would delete a node from a given position.  
Implement a function that flattens a nested array in JavaScript, converting it into a single-level array. 