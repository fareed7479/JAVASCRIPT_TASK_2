"use strict";


// PART 1: Types & Coercion

// Validates raw input and returns a positive number or throws an informative Error
function parseAmount(input) {
  // 1. Guard against null and undefined
  if (input === null || input === undefined) {
    throw new Error("Amount is required.");
  }

  // 2. Reject inputs that are not string or number
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: amount must be a string or number.");
  }

  // 3. Trim whitespace from string inputs
  var sanitized = typeof input === "string" ? input.trim() : input;

  // 4. Guard against empty string to prevent coercion to 0
  if (sanitized === "") {
    throw new Error("Amount cannot be empty.");
  }

  // 5. Convert to number and check for NaN
  var num = Number(sanitized);
  if (Number.isNaN(num)) {
    throw new Error("Amount must be a valid number.");
  }

  // 6. Ensure amount is strictly greater than zero
  if (num <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  // 7. Return verified number
  return num;
}

// Explanation of JavaScript coercion and quirks:
// "5" + 2 results in "52" because the binary '+' operator triggers string concatenation when an operand is a string.
// "5" - 2 results in 3 because '-' is purely arithmetic and implicitly coerces the string "5" to number 5.
// typeof null === "object" is a legacy bug from JS 1995 where null (0x00) shared the type tag 0 with objects.

// Testing: parseAmount called inside try/catch; logs the number or error message
var testInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

testInputs.forEach(function (input) {
  try {
    console.log(parseAmount(input));
  } catch (error) {
    console.log(error.message);
  }
});



// PART 2: Scoping & Hoisting


// Step 1: Main Declarations
// const is used for BANK_NAME because its value is constant and should never be reassigned.
// let is used for transactionCounter because its numeric value increments as transactions occur.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;


// Step 2: Hoisting Demo
// HOISTING DEMO

// 1. var: hoisted and initialized to undefined during creation phase
console.log(hoistedVar);
var hoistedVar = "Bank Account";

// 2. let: hoisted into Temporal Dead Zone (TDZ); accessing before initialization throws ReferenceError
try {
  console.log(hoistedLet);
} catch (error) {
  console.log(error.name + ": " + error.message);
}
let hoistedLet = "Bank Account";

// 3. Function Declaration: fully hoisted with its definition during creation phase
announce();
function announce() {
  console.log("System announcement");
}

// 4. Function Expression: var notify is hoisted as undefined; calling undefined() throws TypeError
try {
  notify();
} catch (error) {
  console.log(error.name + ": " + error.message);
}
var notify = function () {
  console.log("Notification sent");
};

// 5. Execution context creation vs. execution phases:
// Creation phase: memory is allocated, function declarations are defined, var is undefined, let/const stay in TDZ.
// Execution phase: code runs line-by-line assigning values and invoking functions.


// Step 3: The Asynchronous Loop Bug
// var shares a single function/global scoped variable across iterations, logging 3, 3, 3 after timeout.
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 100);
}

// let creates a fresh lexical binding for each loop iteration, correctly logging 0, 1, 2.
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 100);
}
