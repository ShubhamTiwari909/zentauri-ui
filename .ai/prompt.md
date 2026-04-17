You are an expert frontend engineer and design system architect.

I am building a production-grade React component library using:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Class Variance Authority (CVA) or similar variant system
- Testing (Jest / React Testing Library)
- Story/Preview pages for documentation

---

## CONTEXT

I have already built a fully functional Button component with:

- Variants (primary, secondary, outline, ghost, destructive)
- Sizes (sm, md, lg)
- Animation options using Framer Motion
- Loading state
- Disabled state
- Fully reusable and composable API
- Proper TypeScript typing
- Unit test cases
- A preview/demo page showing all variations and usage

This Button component acts as the reference standard for:

- Code structure
- File organization
- API design
- Styling approach
- Animation patterns
- Testing approach
- Documentation/preview

---

## TASK

Using the same patterns and architecture as the Button component:

👉 Build a production-ready **[COMPONENT_NAME]** component.

---

## REQUIREMENTS

### 1. Architecture & Code Quality

- Use TypeScript with strict types
- Follow clean folder structure:
  /components/[component]
  - index.ts
  - [component].tsx
  - [component].types.ts
  - [component].test.tsx
- Make it reusable and composable
- Avoid hardcoded styles

---

### 2. Variants System

- Implement variants using CVA (or similar)
- Include meaningful variants (e.g. for Input: error, success, default)
- Include sizes if applicable
- Allow className overrides

---

### 3. Animations

- Use Framer Motion where relevant
- Keep animations optional and configurable
- Follow the same pattern used in Button

---

### 4. Accessibility (VERY IMPORTANT)

- Add proper ARIA attributes
- Keyboard navigation support (if applicable)
- Focus states
- Screen reader friendly

---

### 5. API Design

- Clean and intuitive props
- Support controlled + uncontrolled usage (if applicable)
- Forward refs where necessary

---

### 6. Styling

- Use Tailwind CSS
- Keep styles consistent with Button design language
- Use design tokens if possible

---

### 7. Testing

- Write unit tests using React Testing Library
- Cover:
  - Rendering
  - Variants
  - Interactions
  - Edge cases

---

### 8. Preview / Demo Page

- Create a preview/demo page
- Show:
  - All variants
  - All states
  - Example usage
- Make it clean and developer-friendly

---

### 9. Documentation

- Add inline comments
- Add usage examples

---

## OUTPUT FORMAT

Provide:

1. Full component code
2. Types file
3. Test file
4. Example usage
5. Preview/demo page code

---

## IMPORTANT

- Follow the exact same philosophy and patterns as the Button component
- Do NOT create a basic component — it should feel like a polished library component
- Think like a library author, not an app developer
- Maintain consistency across components

---

## Reference Pull Requests

https://github.com/ShubhamTiwari909/zentauri-ui/pull/2
https://github.com/ShubhamTiwari909/zentauri-ui/pull/3

## COMPONENT TO BUILD

Input
