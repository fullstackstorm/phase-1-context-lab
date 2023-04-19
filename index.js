/* Your Code Here */
function createEmployeeRecord(employeeArray) {
  const [firstName, familyName, title, payPerHour] = employeeArray;
  const employeeRecord = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };

  return employeeRecord;
}

function createEmployeeRecords(arrayOfEmployees) {
  const arrayOfEmployeeRecords = arrayOfEmployees.map(createEmployeeRecord);
  return arrayOfEmployeeRecords;
}

function createTimeInEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour),
  };
  this.timeInEvents.push(timeInEvent);
  return this;
}

function createTimeOutEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour),
  };
  this.timeOutEvents.push(timeOutEvent);
  return this;
}

function hoursWorkedOnDate(date) {
  const matchingStart = this.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  );
  const matchingStop = this.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  );
  const hoursWorkedInteger = (matchingStop.hour - matchingStart.hour) / 100;

  return hoursWorkedInteger;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  const payOwed = hoursWorked * this.payPerHour;
  return payOwed;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(arrayOfEmployeeRecords, firstName) {
  const matchingRecord = arrayOfEmployeeRecords.find(
    (employeeRecord) => employeeRecord.firstName === firstName
  );
  return matchingRecord;
}

function calculatePayroll(arrayOfEmployeeRecords) {
  const sumOfPayForAll = arrayOfEmployeeRecords
    .map((employeeRecord) => allWagesFor.call(employeeRecord))
    .reduce((payRoll, currentWage) => payRoll + currentWage);
  return sumOfPayForAll;
}
