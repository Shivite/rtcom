class User {
  constructor(name, age) {
    this._name = name; // use underscore to differentiate actual property
    this._age = age;
  }

  // Getter for name
  get name() {
    return this._name;
  }

  // Setter for name
  set name(value) {
    if (value.length > 0) {
      this._name = value;
    } else {
      console.error("Name cannot be empty");
    }
  }

  // Getter for age
  get age() {
    return this._age;
  }

  // Setter for age with validation
  set age(value) {
    if (value > 0) {
      this._age = value;
    } else {
      console.error("Age must be a positive number");
    }
  }
}

// Create a new user object
let user = new User("Ravinder", 29);

// Using the getter
console.log(user.name); // Output: Ravinder
console.log(user.age); // Output: 29

// Using the setter to update name
user.name = "Kumar"; // Updates the name
console.log(user.name); // Output: Kumar

// Trying to set an invalid age
user.age = -5; // Error: Age must be a positive number
console.log(user.age); // Output: 29 (age remains unchanged)
