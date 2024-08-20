//create a constructor method
function Candidate(name, role) {
  this.name = name;
  this.role = role;
}

//create prototype
Candidate.prototype.CandidateDetails = function () {
  console.log(`The candidate name ${this.name} for role ${this.role}`);
};

//create inheritance so create a new constructor method
function InterviewSchedule(name, role, time) {
  Candidate.call(this, name, role);
  this.time = time;
}

//create inheritance with prototype
InterviewSchedule.prototype = Object.create(Candidate.prototype); //inherit the prototype of parent
InterviewSchedule.prototype.constructor = Candidate;

//constructor method for second method
InterviewSchedule.prototype.InterviewTimmings = function () {
  console.log(`the interview timing is ${this.time}`);
};

// create instace
let Ravin = new InterviewSchedule("Ravin", "Sofrware Engineer", "2PM");

Ravin.CandidateDetails();
Ravin.InterviewTimmings();
