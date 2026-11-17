"use strict";

// ============================================================================
// PART 1: Types & Coercion
// ============================================================================

/**
 * Validates a user-provided raw input and returns a verified positive number.
 * Uses functional principles, defensive validation, and strict equality.
 * Throws an Error if validation fails; does not directly log to console.
 *
 * @param {unknown} input - Raw value provided by the user
 * @returns {number} - Validated positive numeric amount
 * @throws {Error} - Descriptive error for invalid types or values
 */
function parseAmount(input) {
  // 1. Guard against null and undefined (amount is strictly required)
  if (input === null || input === undefined) {
    throw new Error("Amount is required. Value cannot be null or undefined.");
  }

  // 2. Type check: reject any type that is not a string or number
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: amount must be a number or a numeric string.");
  }

  // 3. Normalize string input by removing leading and trailing whitespace
  const sanitizedInput = typeof input === "string" ? input.trim() : input;

  // 4. Guard against empty string to prevent coercion to 0 (Number("") === 0)
  if (sanitizedInput === "") {
    throw new Error("Amount cannot be empty.");
  }

  // 5. Explicitly convert to number and check for NaN (e.g., "abc", "12.5.3")
  const numericAmount = Number(sanitizedInput);
  if (Number.isNaN(numericAmount)) {
    throw new Error(`Invalid numeric value: "${input}" could not be parsed to a valid number.`);
  }

  // 6. Ensure the transaction amount is strictly positive (> 0)
  if (numericAmount <= 0) {
    throw new Error(`Amount must be greater than zero. Received: ${numericAmount}`);
  }

  // 7. Return verified positive number
  return numericAmount;
}

// ----------------------------------------------------------------------------
// Mandatory Comments: Core JavaScript Coercion & Quirks Explanation
// ----------------------------------------------------------------------------
// 1. Why "5" + 2 === "52" whereas "5" - 2 === 3:
// The '+' operator is overloaded in JavaScript for both addition and string concatenation.
// When one operand is a string ("5"), JavaScript coerces the number 2 to a string ("2"),
// resulting in string concatenation ("52").
// In contrast, the '-' operator is strictly mathematical with no string concatenation meaning.
// Therefore, JavaScript coerces the string "5" into the number 5, computing 5 - 2 = 3.
//
// 2. Why typeof null === "object":
// This is a historical bug from JavaScript's first implementation in 1995.
// Values were represented using type tags, where object type tags were 000.
// Since the NULL pointer was 0x00 (all zeros), typeof misidentified null as an object.
// This behavior is permanently retained across ECMAScript specifications for backwards compatibility.

// ----------------------------------------------------------------------------
// Part 1 Testing Suite (Try / Catch per Test Input)
// ----------------------------------------------------------------------------
console.log("=== PART 1: Types & Coercion - Test Cases ===");

const testInputs = [
  "500",
  " 250 ",
  "",
  "abc",
  null,
  undefined,
  "12.5.3"
];

testInputs.forEach((testCase) => {
  try {
    const result = parseAmount(testCase);
    console.log(`[SUCCESS] Input: ${JSON.stringify(testCase)} -> Verified Amount: ${result}`);
  } catch (error) {
    console.log(`[CAUGHT ERROR] Input: ${JSON.stringify(testCase)} -> Error Message: ${error.message}`);
  }
});

console.log("\n");


// ============================================================================
// PART 2: Scoping & Hoisting
// ============================================================================

// ----------------------------------------------------------------------------
// Step 1: Main Declarations
// ----------------------------------------------------------------------------
// const is used for BANK_NAME because the bank's identifier is immutable and must never be reassigned.
// let is used for transactionCounter because the counter mutates and increments with every new transaction.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

console.log("=== PART 2: Scoping & Hoisting ===");
console.log(`Bank Name (const): ${BANK_NAME}`);
transactionCounter++;
console.log(`Transaction Counter (let): ${transactionCounter}`);
console.log("\n");


// ----------------------------------------------------------------------------
// Step 2: Hoisting Demo (Header: // HOISTING DEMO)
// ----------------------------------------------------------------------------
// HOISTING DEMO

// 1. var hoisting: var declarations are hoisted and initialized to undefined during creation phase.
console.log("1. Hoisted var variable before declaration:", hoistedVar); // prints undefined
var hoistedVar = "Standard Bank Account";

// 2. let hoisting: let declarations are hoisted but NOT initialized (Temporal Dead Zone - TDZ).
try {
  // Accessing a let variable before its initialization line throws ReferenceError
  console.log(hoistedLet);
} catch (error) {
  console.log(`2. Caught TDZ ReferenceError for let: ${error.name} - ${error.message}`);
}
let hoistedLet = "Premium Bank Account";

// 3. Function Declaration: Entire function definition is hoisted into memory during creation phase.
announce(); // Successfully executes before its definition line in code
function announce() {
  console.log("3. Function Declaration hoisted: System announcement broadcasted successfully.");
}

// 4. Function Expression: Variable declaration (var notify) is hoisted as undefined; invoking undefined() throws TypeError.
try {
  notify();
} catch (error) {
  console.log(`4. Caught TypeError for function expression: ${error.name} - ${error.message}`);
}
var notify = function () {
  console.log("Notification: Daily balance statement generated.");
};

// 5. Execution Context Phases Explanation:
// In the Creation Phase, JavaScript sets up the lexical environment and allocates memory:
// - Function declarations are fully hoisted with their implementation attached.
// - 'var' declarations are hoisted and initialized with the default value 'undefined'.
// - 'let' and 'const' declarations are allocated in memory but left uninitialized in the TDZ.
// In the Execution Phase, JavaScript runs the code line-by-line, performing assignments and evaluations.


// ----------------------------------------------------------------------------
// Step 3: The Asynchronous Loop Bug
// ----------------------------------------------------------------------------
// var is function-scoped (or globally scoped). All iterations of the loop share the same variable 'i'.
// By the time setTimeout callbacks execute after the event loop tick, the loop has completed and 'i' equals 3.
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 100);
}

// let is block-scoped. JavaScript creates a new lexical binding for 'i' in each iteration.
// Each setTimeout closure captures the specific value of 'i' for that iteration (0, 1, and 2).
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 100);
}

// Explanation comment for asynchronous loop:
// 'var' creates a single shared binding across the loop lifecycle, leaving the value at 3 when timeouts fire.
// 'let' introduces block-level scoping where a fresh environment record is created for each iteration step.
