## file that outlines the key rules and guidelines for building a personal portfolio using **HTML, CSS, Bootstrap, and JavaScript**:

# 📘 Portfolio Development Rules

A set of essential rules and guidelines for building a responsive and interactive portfolio using **HTML**, **CSS**, **Bootstrap**, and **JavaScript**.

---

## 1. 🔧 Project Structure

```
/portfolio-project
│
├── index.html
├── /assets
│   ├── /images
│   └── /css
│       └── style.css
│   └── /js
│       └── script.js
├── /bootstrap (CDN or local optional)
└── README.md
```

---

## 2. 📄 HTML Guidelines

* Use semantic tags: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`.
* Organize into sections: About, Skills, Projects, Contact.
* Ensure proper indentation and readability.
* All external links should open in a new tab (`target="_blank"`).

---

## 3. 🎨 CSS Rules

* Use a separate `style.css` file.
* Keep consistent spacing, colors, and font styling.
* Follow a naming convention like BEM (Block\_\_Element--Modifier) if the project scales.
* Make use of root variables (`:root`) for colors and fonts.

---

## 4. 🎀 Bootstrap Usage

* Use the latest Bootstrap version (via CDN or local).
* Follow the grid system (`container`, `row`, `col-md-*`, etc.).
* Use Bootstrap classes for buttons, navbars, cards, and forms to ensure consistency.
* Customize Bootstrap using your own CSS if needed.

---

## 5. ⚙️ JavaScript Rules

* Keep JS in a separate `script.js` file.
* Use it for interactive elements: toggles, animations, form validations, modals, etc.
* Always check for `DOMContentLoaded` or place scripts at the end of HTML.
* Keep code modular and avoid global variables.

---

## 6. 📱 Responsiveness

* Ensure mobile responsiveness using Bootstrap’s grid and utility classes.
* Test layout on different screen sizes (mobile, tablet, desktop).
* Use media queries for custom breakpoints if needed.

---

## 7. 🧪 Accessibility & SEO

* Use `alt` attributes for all images.
* Ensure proper contrast ratio.
* Add `meta` tags for description and viewport settings.
* Use descriptive titles and headings.

---

## 8. ✅ Best Practices

* Comment your code where necessary.
* Minimize use of inline styles.
* Optimize images before use.
* Validate HTML & CSS with official W3C validators.

---

## 9. 📤 Deployment

* Use GitHub Pages, Netlify, or Vercel for free hosting.
* Ensure all assets are properly linked.
* Create a `README.md` for project description and instructions.

---