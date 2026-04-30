You are a senior frontend architect and design system expert.

I am building a Typography section for my component + hooks library preview website. I want you to create a COMPLETE planning and execution document that includes architecture, UX structure, component API design, and implementation steps.

## Context
- Tech stack: React + TypeScript + Tailwind CSS v4, reference doc https://tailwindcss.com/docs/font-family (assume modern setup)
- This is a component library showcase site (like shadcn/ui, radix, etc.)
- Each typography type should have a dedicated preview page and should be added inside the `packages/components` as a package component, refer the `packages/components` folder to see the structure and folder pattern for the components

---

## 🎯 Goal

Design a scalable, developer-friendly Typography system that:
1. Showcases all typography elements
2. Provides variants and formatting options
3. Is reusable as a component library API
4. Has clean UI/UX for preview + copy usage

---

## 📦 Typography Types to Support

Create a structured plan for these pages:

- Headings (h1 → h6)
- Paragraph
- Lists
  - Ordered
  - Unordered
  - Nested lists
- Blockquote
- Inline text elements
  - Bold
  - Italic
  - Underline
  - Strikethrough
  - Highlight
  - Code inline
- Code blocks (optional but preferred)

---

## 🎨 Variant Requirements

Each typography component should support:

### 1. Semantic variants
- h1 → h6 (for headings)
- p sizes (sm, base, lg)
- list styles (disc, decimal, etc.)

### 2. Style variants
- Bold
- Italic
- Underline
- Strikethrough

### 3. Color variants
- Default
- Muted
- Primary
- Secondary
- Accent
- Error (optional)

### 4. Combination examples
- h1 + bold + underline
- paragraph + muted + italic
- blockquote + accent color

---

## 🧩 What I Need You To Generate

### 1. 🏗️ Information Architecture
- Folder structure
- Routing structure (e.g. `/typography/heading`, `/typography/paragraph`)
- Component organization within `packages/components` like this -> `components/src/typography/*`

---

### 2. 🧱 Component API Design

Design reusable components like:

- `<Heading />`
- `<Text />`
- `<List />`
- `<Blockquote />`

Include:
- Props interface (TypeScript)
- Variant system (class-variance-authority or similar)
- Examples of usage

---

### 3. 🖥️ Page Layout Design (VERY IMPORTANT)

Each typography preview page should include:

#### Section 1: Title + Description
- What this typography is used for

#### Section 2: Live Preview
- Rendered examples

#### Section 3: Variants Showcase
- All variants in grid or stacked format

#### Section 4: Formatting Showcase
- Bold, italic, underline, etc.

#### Section 5: Combination Examples
- Real-world usage combinations

#### Section 6: Code Snippets
- Copy-paste usage

#### Section 7 (Optional): Playground
- Controls to toggle variants dynamically

---

### 4. 🎯 UX Enhancements

Suggest improvements like:
- Copy-to-clipboard button
- Theme support (dark/light)
- Responsive typography preview
- Accessibility considerations

---

### 5. ⚙️ Implementation Plan

Step-by-step execution:

1. Create base typography tokens (font sizes, weights, line heights)
2. Build core components
3. Add variant system
4. Create preview pages
5. Add code preview system
6. Add playground (optional)

---

### 6. 💡 Best Practices

Include:
- Accessibility (semantic HTML usage)
- SEO considerations
- Performance (avoid unnecessary re-renders)
- Scalability for future additions

---

### 7. 🎁 Bonus (If Possible)

- Suggest how to integrate MDX for typography demos
- Suggest how this system could be exported as an npm package

---

## ⚠️ Important Instructions

- Keep the design clean and minimal (like shadcn/ui style)
- Focus on reusability and developer experience
- Avoid overengineering
- Use practical, production-ready patterns
- Include code examples wherever helpful

---

Output everything in a well-structured markdown document.