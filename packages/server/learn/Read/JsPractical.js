// CallBack Hell

// EXECUTION CONTEXT:
//     MEMORY/VARIABLE ENVIROMENT : all variables and funcitons. [MEMORY CREATION PHASE]
//     CODE COMPONENT/ THREAD OF EXECUTION: code execution line by line [CODE CREATION PHASE]
//     SYNCRONEOUS SINGLE THREADED languae.
//     All above managed by call Call Stack.
//     CALL STACK: have GLOBAL EXECUTION CONTEXT.

//CAllback hell
const fetchData = (cb) => {
  setTimeout(() => {
    console.log("fetchData");
  }, 1000);
  cb();
};

const readData = (cb) => {
  setTimeout(() => {
    console.log("readData");
  }, 1000);
  cb();
};

const displayData = () => {
  setTimeout(() => {
    console.log("displayData");
  }, 1000);
};

fetchData(() => {
  readData(() => {
    displayData();
  });
});

//CALLBACK SOLUTION  -- async await/promises

const fetchData1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetchdata");
      resolve();
    }, 1000);
  });
};
const readData1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("readData");
      resolve();
    }, 1000);
  });
};
const displayData1 = () => {
  console.log("displayData");
};
// Chaining promises
fetchData1().then(() => readData1().then(() => displayData1()));
//with async await
const handleData = async () => {
  await fetchData();
  await readData();
  displayData();
};

const test = handleData();

// ---------------------------------------- DOUBLE ELEMENT WITH REDUCE ____________________with map

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.reduce((accumulator, currentValue) => {
  accumulator.push(currentValue * 2);
  return accumulator;
}, []);
console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]

// -------------- debounce example-------------- funciton with other function and timer

const showMessage = (msg) => {
  console.log("your message", msg);
};

const messgeDebouce = (callback, delay) => {
  let timer;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...arg);
    }, delay);
  };
};
const calDeb = messgeDebouce(showMessage, 100);
calDeb("new message");
calDeb("new message1");
calDeb("new message2");

//---------------------------------------------------
// CLOUSER:
// When a function is created inside other function and the inner function can have access
//  to the outer function variable even after the the outer function has returned.
// This is possible because the inner function "closes over" its surrounding environment.

function makeCounter() {
  let count = 0; // `count` is a local variable in the outer function
  return function () {
    count += 1; // The inner function has access to `count`
    return count;
  };
}
const counter = makeCounter(); // `counter` is a closure
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
console.log(counter()); // Output: 3

// REST OPERATOR: ... allow a funcion to recieve any number of arg as an array!!
// function parameters
function sum(...number) {
  return number.reduce((a, b) => {
    return a + b;
  });
}
console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(4, 5, 6, 7, 8)); // Output: 30

// destructive assignmets
const [a, ...rest] = [1, 2, 3, 4];
const { b, ...other } = { a: 1, b: 2, c: 3, d: 4 };

// SPREAD OPERATOR: create new array by spreading element of an existing array
// Array Literals:
// const fruits = ['apple', 'banana', 'orange'];
const moreFruits = ["grape", "mango", ...fruits];
console.log(moreFruits); // Output: ['grape', 'mango', 'apple', 'banana', 'orange']

// OBJECT LITRALS:  copy properties from one object to another or merge objects.
const person = { name: "John", age: 30 };
const contact = { email: "john@example.com", phone: "123-456-7890" };
const user = { ...person, ...contact };

// Enhanced Object Literals took the variables and group them to an object
const a = 1;
const b = 2;
const bark = () => { console.log(bark) }
const obj = { a, b, bark }  // {a:1,b:2,bark(){console.log("barl")}}

// PURE FUNCTION: have same input and output. do not dependent on external variables.
function pureFunc(num1, num2) {
  return num1 * num2;
}
pureFunc(2, 5);
// IMOUREFUNCTION: Dependent on outer resources.
const dis = 100;
impureFunc(price);
{
  return price - dis;
}
impureFunc(500);

// PROTOTYPE : in JS array, func, are treated as OB. Prototype is an JS object from which other objects can inherit properties and methods. when we access prop of an object, Js first check the object itself and then prototype chain.
// Constructor function
function Interview(candidate) {
  //a simple function
  this.name = candidate;
}
// Adding a method to the prototype
Interview.prototype.details = function () {
  console.log(`The candidate name is ${this.name}`);
};

const ravin = new Interview("Ravin"); //create instance of function

ravin.details(); //Access prototype method
// ON string
String.prototype.trueLength = () => {
  return this.trim().length;
};
let a = "ravinder".trueLength();
console.log(a);


// Node js session security
npm i express-session;
const session = require("express-session");
const mongoStore= require('connect-mongo');

app.use(session({
  secret: 'your-secure-secret',  // Replace with a strong, unique secret
  resave: false,                 // Prevents session being saved if it wasn’t modified
  saveUninitialized: false,      // Don't save empty sessions
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/yourDB',  // Replace with your database URL
    ttl: 14 * 24 * 60 * 60 // Session expiration in seconds (14 days)
  }),
  cookie: {
    httpOnly: true,              // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    maxAge: 1000 * 60 * 60 * 24  // Sets cookie expiration (e.g., 24 hours)
    sameSite: 'strict'            // Prevents cross-site request forgery (CSRF)
  }
}));
req.session.user = {name:'ravin', role:'fullstack dev'}
access: req.session.user.name
req.session.destroy(()=>{
  res.clearCookie('connect.sid')
})

app.use(cors({
  origin: 'http://localhost:3000', // Replace with the origin of your React app
  credentials: true                // Allow credentials (cookies) to be sent ------------------------------
}));



CSRF: Cross Site Refrence Frogery: prevent malicious websites making request on behalf of authenticated users.
Generate csrf token on backend and then send it to fronend. frontend will have this token in api call header.

npm i csurf;
const csrf = require('csurf');
// initialize middlewawre
const csrfProtection = csrf({cookie: true})

app.use(csrfProtection);
app.get('/api/getcsrf', (req, res)=>{
  res.json({csrf:csrfToken()})
})

app.post('api/protectedRoutes', csrfProtection, (req,res)=>{
  res.json({messae: 'csrf recieved!'})
})
//forntend
headers: {
  'CSRF-Token': csrfToken // Send the CSRF token in the header
}







