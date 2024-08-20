// with es6 we can use class syntax that is a syntatical sugar over js prototype
class Interview {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  condidateDetails() {
    console.log(
      `candidate name id ${this.name} and applied for role ${this.role}`
    );
  }
}

class InterviewSchedule extends Interview {
  constructor(name, role, time) {
    super(name, role); //creating inhericance with super in constructor
    this.time = time;
  }
  interviewTiming() {
    console.log(`the interview time is ${this.time}`);
  }
}

let ravin = new InterviewSchedule("ravin", "Dev", "2pm");
ravin.condidateDetails();
ravin.interviewTiming();
