# Web Development Foundations: Practical Assignment

This repository contains the complete implementation for the **Responsive Web Design & JavaScript Foundations** technical practical assignment, structured into two parts:
- **Part A:** Frontend CSS Responsiveness (IRP LMS Home Page recreation)
- **Part B:** JavaScript Bank Account Simulator (Types, Coercion, Scoping & Hoisting)

---

## 📁 Project Directory Structure

```text
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html       # Semantic HTML5 recreation of IRP LMS Home Page
│   └── style.css        # Responsive CSS (Flexbox, CSS Grid, Media Queries)
├── part-b-javascript/
│   └── bank.js          # Standalone JavaScript file (Part 1 & Part 2)
└── README.md            # Setup notes, responsive testing steps, and execution instructions
```

---

## 🎨 Part A: Frontend CSS Responsiveness (IRP LMS Home Page)

### 1. Key Features & Implementation
- **Semantic HTML5 Architecture:** Utilizes `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` tags to ensure accessibility and standards compliance.
- **Top Sticky Navigation Bar:** Implements `position: sticky; top: 0; z-index: 1000;` along with a clean background and subtle divider shadow so the navigation bar stays anchored at the top as users scroll smoothly underneath.
- **Design Tokens:** Strict adherence to the assignment color palette defined as CSS custom properties (`:root`):
  - `--color-primary-navy` (`#003366`): Headings, brand title, and active navigation indicator.
  - `--color-primary-orange` (`#FE781E`): Hero kicker, CTA buttons, headline highlights, and step card numbers.
  - `--color-secondary-blue` (`#5F9FE0`): Accents, borders, and sub-elements.
  - `--color-bg-light` (`#E2F2FD`): Soft hero and highlights background.
  - `--color-card-bg` (`#FFFFFF`): Main cards and surfaces.
  - `--color-border-light` (`#D6E9FF`): Step card outlines and subtle dividers.
- **Hero Banner:**
  - 2-column desktop layout with text on the left and official illustration on the right.
  - Automatically transforms into a single vertical stacked stream on mobile viewports.
  - Proportional image scaling with no horizontal overflow.
- **Learning Journey Section (Responsive Layout Engine):**
  - **Desktop View (`> 1024px`):** Strict 5-column horizontal grid (`grid-template-columns: repeat(5, 1fr)`).
  - **Tablet View (`768px – 1024px`):** Balanced 3-column wrapping grid.
  - **Mobile View (`≤ 768px`):** Strict 1-column vertical stack (`grid-template-columns: 1fr`), positioning the step numbers distinctly on the top-left of each card matching the specification.

### 2. Testing & Verification Instructions for Part A
1. Navigate to the `part-a-responsive-ui/` directory.
2. Open `index.html` in Google Chrome or any modern browser:
   - On Windows: Double-click `part-a-responsive-ui/index.html` or open via browser address bar: `file:///path/to/part-a-responsive-ui/index.html`.
3. **Verify Sticky Navigation:** Scroll down the page; verify that the top navigation bar stays firmly pinned to the top of the viewport with content scrolling underneath.
4. **Verify Desktop Layout (`≥ 1024px`):**
   - Brand logo and navigation links ("Home", "Courses", "Contact Us") are visible.
   - The "Home" link displays the active orange underline indicator.
   - Outlined orange "Sign In" button is positioned on the right.
   - Learning journey step cards display in an exact 5-column row.
5. **Verify Mobile Layout (`≤ 768px`):**
   - Open Developer Tools (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
   - Toggle the Device Toolbar (`Ctrl + Shift + M`).
   - Select mobile devices (e.g., iPhone 12/13/14 Pro at `390px` or iPhone SE at `375px`).
   - Observe that desktop nav links collapse, leaving the brand logo on the left and the touch-friendly outlined "Sign In" button on the right.
   - Verify the hero layout stacks cleanly and the 5 step cards stack in a single column without horizontal scrollbars.

---

## 💻 Part B: JavaScript — Bank Account Simulator

### 1. Concepts Demonstrated
- **Part 1: Types & Coercion**
  - Pure, functional validation function `parseAmount(input)` without console side-effects.
  - Defensive type checking against `null`, `undefined`, boolean, and object inputs.
  - Guard against empty string zero coercion (`Number("") === 0`).
  - Validation against `NaN` (e.g. `"abc"`, `"12.5.3"`) and non-positive numbers (`<= 0`).
  - Strict equality operators (`===` and `!==`) used exclusively.
  - Inline explanations for:
    - `"5" + 2 === "52"` (string concatenation coercion) vs. `"5" - 2 === 3` (arithmetic numeric coercion).
    - `typeof null === "object"` (historical 1995 JavaScript type-tag implementation bug).
- **Part 2: Scoping, Hoisting & Asynchronous Event Loop**
  - **Step 1:** Proper usage of `const` for immutable variables (`BANK_NAME`) and `let` for reassignable variables (`transactionCounter`).
  - **Step 2 (Hoisting Demo):**
    - `var` hoisting returning `undefined`.
    - `let` Temporal Dead Zone (TDZ) catching `ReferenceError`.
    - Function declaration hoisting (calling before declaration succeeds).
    - Function expression hoisting with `var` catching `TypeError` (`undefined` is not a function).
    - Comprehensive comment explaining Creation Phase vs. Execution Phase.
  - **Step 3 (Async Loop Bug):**
    - `var` in a loop sharing a single global/function binding, resulting in `3, 3, 3` across asynchronous callbacks.
    - `let` creating a fresh lexical binding per iteration, correctly logging `0, 1, 2`.

### 2. Execution Instructions for Part B
Make sure you have Node.js installed (`node -v`).

Run the script from the root of the project:
```bash
node part-b-javascript/bank.js
```

#### Expected Terminal Output:
```text
500
250
Amount cannot be empty.
Amount must be a valid number.
Amount is required.
Amount is required.
Amount must be a valid number.
undefined
ReferenceError: Cannot access 'hoistedLet' before initialization
System announcement
TypeError: notify is not a function
var loop: 3
var loop: 3
var loop: 3
let loop: 0
let loop: 1
let loop: 2
```

---

## 🚀 GitHub Repository Submission Guidelines

As specified in the assignment submission guidelines:
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete IRP LMS responsive page and JavaScript bank simulator"
   ```
2. Create a new **public** repository on GitHub (e.g., `irp-web-development-assignment`).
3. Link the remote and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. **Verification:** Open your repository link in an incognito / private browser window to confirm that the repository is publicly accessible and contains all required folders and files.

