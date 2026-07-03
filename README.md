# Task Manager -- Browser Concepts Notes

## 1. Parsing

Parsing is the process where the browser reads your HTML, CSS, and
JavaScript and converts them into structures it can understand.

Flow:

    Source Code
        ↓
    Browser reads line by line
        ↓
    Creates internal structures

In this project: - `index.html` is parsed to create the DOM. -
`style.css` is parsed to build the CSSOM. - `script.js` is parsed before
execution.

------------------------------------------------------------------------

## 2. Tokenization

Before parsing, the browser breaks code into small pieces called
**tokens**.

Example HTML:

``` html
<div class="card">Hello</div>
```

Tokens:

    <div
    class
    =
    "card"
    >
    Hello
    </div>

Tokenization happens for HTML, CSS, and JavaScript.

------------------------------------------------------------------------

## 3. DOM Tree (Document Object Model)

HTML:

``` html
<body>
    <div>
        <h1>Hello</h1>
    </div>
</body>
```

DOM Tree:

    Document
       └── html
            └── body
                 └── div
                      └── h1
                           └── Hello

Where it's used in this project: - `document.querySelector()` -
`document.createElement()` - `append()` - `appendChild()` -
`textContent` - `classList.add()`

------------------------------------------------------------------------

## 4. CSSOM Tree

The browser parses CSS and creates a CSS Object Model.

Example:

``` css
.task-card {
  background: red;
  color: white;
}
```

When you execute:

``` js
CARD.classList.add("task-card");
```

the browser looks up `.task-card` in the CSSOM and applies the styles.

------------------------------------------------------------------------

## 5. Render Tree

The browser combines:

    DOM Tree
          +
    CSSOM Tree
          ↓
    Render Tree

The Render Tree contains only the visible elements and their computed
styles.

In this project: - After calling `UI()` - After
`CARD_SECTION.append(CARD)` - After deleting or editing a task

the browser updates the Render Tree and repaints the screen.

------------------------------------------------------------------------

## 6. Event Bubbling

When you click a child element, the event travels upward.

Example:

    Button
      ↓
    Div
      ↓
    Body
      ↓
    HTML
      ↓
    Document

In this project:

``` js
CARD_SECTION.addEventListener("click", ...)
```

Clicking **Delete** or **Edit** bubbles the event to `CARD_SECTION`.

------------------------------------------------------------------------

## 7. Event Capturing

Capturing is the opposite of bubbling.

    Document
       ↓
    HTML
       ↓
    Body
       ↓
    Div
       ↓
    Button

Enable it using:

``` js
element.addEventListener("click", handler, true);
```

This project does **not** use event capturing.

------------------------------------------------------------------------

## 8. Event Delegation

Instead of adding listeners to every button, add one listener to the
parent.

Example:

``` js
CARD_SECTION.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    // Edit
  }

  if (e.target.classList.contains("del-btn")) {
    // Delete
  }
});
```

Benefits: - Fewer event listeners - Better performance - Easier to
maintain - Works for dynamically created elements

Your project uses event delegation because the Edit and Delete buttons
are created dynamically inside `UI()`.

------------------------------------------------------------------------

# How Everything Works Together

    Open index.html
            │
            ▼
    Parsing
            │
            ▼
    Tokenization
            │
            ▼
    DOM Tree Created
            │
            ▼
    CSS Parsed
            │
            ▼
    CSSOM Tree Created
            │
            ▼
    DOM + CSSOM
            │
            ▼
    Render Tree
            │
            ▼
    Page Rendered
            │
            ▼
    User Clicks Edit/Delete
            │
            ▼
    Event Bubbling
            │
            ▼
    CARD_SECTION Listener
            │
            ▼
    Event Delegation
            │
            ▼
    Update taskData
            │
            ▼
    Update localStorage
            │
            ▼
    Call UI()
            │
            ▼
    DOM Updated
            │
            ▼
    Render Tree Updated
            │
            ▼
    Screen Updated

------------------------------------------------------------------------

# Mapping Concepts to This Project

  Concept            Where it appears
  ------------------ -----------------------------------------------------------
  Parsing            Browser loads HTML, CSS, JS
  Tokenization       Browser breaks HTML/CSS/JS into tokens
  DOM Tree           `querySelector`, `createElement`, `append`, `textContent`
  CSSOM Tree         `classList.add("task-card")`, `.edit-btn`, `.del-btn`
  Render Tree        `UI()` rendering cards and updating the screen
  Event Bubbling     Click events travel from button to `CARD_SECTION`
  Event Capturing    Not used
  Event Delegation   `CARD_SECTION.addEventListener("click", ...)`
