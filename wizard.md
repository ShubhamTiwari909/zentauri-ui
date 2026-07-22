# RFC: Wizard Builder

Version: 1.0
Library: Zentauri UI
Author: Zentauri UI
Status: Planned

# 1. Wizard Builder

## Overview

Wizard Builder is a fully featured multi-step workflow engine.

Instead of manually managing step indexes, validation, state persistence, transitions, and progress bars, developers compose steps declaratively.

Perfect for:

- Checkout
- Signup
- Surveys
- Onboarding
- Loan applications
- Job forms
- Product configurators
- Multi-step CRUD

Inspired by:

- Linear onboarding
- Stripe checkout
- Typeform
- Ant Design Steps

---

# Goals

- Zero boilerplate
- RHF support
- Zod support
- Dynamic steps
- Conditional steps
- Async validation
- Animations
- Step persistence
- Progress
- Tiny API

---

# Installation

```tsx
npm install @zentauri-ui/wizard
```

---

# Basic Usage

```tsx
<Wizard>
  <Wizard.Step>Personal</Wizard.Step>

  <Wizard.Step>Address</Wizard.Step>

  <Wizard.Step>Payment</Wizard.Step>
</Wizard>
```

---

# Architecture

```
WizardProvider

↓

Context

↓

Steps

↓

Navigation

↓

Validation

↓

Progress

↓

Storage
```

---

# Components

---

## <Wizard>

Main wrapper.

Props

```ts
interface WizardProps {
  defaultStep?: number;

  linear?: boolean;

  persist?: boolean;

  storageKey?: string;

  onFinish?: () => void;

  children: ReactNode;
}
```

---

## <Wizard.Step>

Props

```ts
interface WizardStepProps {
  id: string;

  title: string;

  description?: string;

  optional?: boolean;

  disabled?: boolean;

  hidden?: boolean;

  icon?: ReactNode;

  validationSchema?: ZodSchema;

  children: ReactNode;
}
```

---

## <Wizard.Header>

Displays

```
Step 2 of 5
```

---

## <Wizard.Progress>

Supports

- Bar
- Circle
- Dots
- Timeline

---

## <Wizard.Navigation>

Built-in navigation buttons.

```
Back

Next

Finish

Cancel
```

---

## <Wizard.Footer>

Custom footer.

---

## <Wizard.Sidebar>

Displays all steps.

---

## <Wizard.Content>

Animated content area.

---

# Hooks

---

## useWizard()

```tsx
const {
  currentStep,

  next,

  previous,

  goTo,

  finish,

  reset,

  steps,

  isFirst,

  isLast,

  progress,
} = useWizard();
```

---

## useWizardStep()

```tsx
const {
  step,

  completed,

  visited,

  optional,

  valid,
} = useWizardStep();
```

---

## useWizardProgress()

Returns

```ts
{

current:2,

total:5,

percentage:40

}
```

---

# Validation

Supports React Hook Form

```tsx
<Wizard.Step

validationSchema={schema}

>
```

Next button disabled until valid.

---

Async validation

```tsx
validate={async()=>{

await api()

}}
```

---

# Conditional Steps

```tsx
<Wizard.Step

hidden={!isBusiness}

>
```

---

Dynamic Steps

```tsx
steps.map(...)
```

---

# Navigation

```tsx
next();

previous();

goTo(3);

reset();

finish();
```

---

# Persistence

```tsx
<Wizard

persist

storageKey="checkout"

>
```

Uses

- localStorage
- sessionStorage
- custom adapter

---

# Events

```tsx
onStepChange();

onStepComplete();

onFinish();

onCancel();

onReset();
```

---

# Keyboard Support

```
Enter

↓

Next

Shift+Enter

↓

Back

Arrow Keys

↓

Navigate
```

---

# Animations

Built-in

```
Slide

Fade

Scale

Flip

None
```

---

# Progress Indicators

```
Linear

Circular

Dots

Breadcrumb

Timeline

Numbers
```

---

# DevTools

```
Current Step

Completed Steps

Visited

Validation

Stored Data
```

---

# Folder Structure

```
wizard/

components/

Wizard.tsx

WizardStep.tsx

WizardHeader.tsx

WizardFooter.tsx

WizardProgress.tsx

WizardNavigation.tsx

WizardSidebar.tsx

WizardContent.tsx

hooks/

useWizard.ts

useWizardProgress.ts

useWizardStep.ts

provider/

WizardProvider.tsx

types/

utils/

storage.ts

validation.ts

navigation.ts

index.ts
```

---

# Future Enhancements

- Nested wizards
- Infinite workflows
- AI-assisted step generation
- Branching logic
- Undo/redo
- Analytics
- Heatmaps
- Collaborative completion
- URL step synchronization
- Auto-save
- Server persistence
- Drag-and-drop step builder
