# RFC: Permission System

Version: 1.0
Library: Zentauri UI
Author: Zentauri UI
Status: Planned

---

# 1. Permission System

## Overview

The Permission System is a complete authorization layer for React applications.

Instead of manually checking roles or permissions throughout the application, developers should be able to declaratively protect components, routes, buttons, pages, menu items, and actions.

Inspired by:

- CASL
- Clerk
- Auth0
- Laravel Gates
- React Admin

Unlike existing libraries, Zentauri should provide a React-first API with excellent TypeScript support and almost zero boilerplate.

---

# Goals

- Declarative permissions
- Role-based access control (RBAC)
- Permission-based access control (PBAC)
- Attribute-based permissions (optional)
- React hooks
- Components
- Route Guards
- Server-friendly
- Next.js compatible
- Tiny bundle
- Tree-shakable

---

# Installation

```tsx
npm install @zentauri-ui/permission
```

---

# Architecture

```
PermissionProvider
        │
        │
 Permission Context
        │
 ├───────────────┐
 │               │
usePermission    <Can>
 │               │
useRole          <CanAny>
 │               │
usePermissions   <Cannot>
```

---

# Permission Provider

```tsx
<PermissionProvider
  roles={["admin"]}
  permissions={["users.read", "users.create", "users.delete", "billing.view"]}
>
  <App />
</PermissionProvider>
```

---

## Provider Props

```ts
interface PermissionProviderProps {
  children: ReactNode;

  roles?: string[];

  permissions?: string[];

  attributes?: Record<string, unknown>;

  fallback?: ReactNode;

  mode?: "all" | "any";
}
```

---

# Permission Naming Convention

Recommended

```
resource.action
```

Example

```
users.read

users.create

users.update

users.delete

billing.view

billing.edit

dashboard.view

analytics.export

posts.publish
```

Supports wildcard

```
users.*

billing.*

admin.*

*
```

---

# Hook

## usePermission()

Returns whether a permission exists.

```tsx
const canDelete = usePermission("users.delete");
```

Returns

```ts
boolean;
```

---

## usePermissions()

```tsx
const permissions = usePermissions();
```

Returns

```ts
string[]
```

---

## useRole()

```tsx
const isAdmin = useRole("admin");
```

Returns

```ts
boolean;
```

---

## useRoles()

```tsx
const roles = useRoles();
```

Returns

```ts
string[]
```

---

## useCan()

More advanced.

```tsx
const {
  allowed,

  reason,

  missingPermissions,
} = useCan({
  permissions: ["users.create"],

  mode: "all",
});
```

Returns

```ts
{

allowed:boolean

reason?:string

missingPermissions:string[]

}
```

---

# Components

---

## <Can>

Basic authorization component.

```tsx
<Can permission="users.delete">
  <Button>Delete User</Button>
</Can>
```

---

Supports multiple permissions.

```tsx
<Can permissions={["users.create", "users.update"]} mode="all">
  <Button>Edit</Button>
</Can>
```

Props

```ts
interface CanProps {
  permission?: string;

  permissions?: string[];

  role?: string;

  roles?: string[];

  mode?: "all" | "any";

  fallback?: ReactNode;

  children: ReactNode;
}
```

---

## <Cannot>

Inverse component.

```tsx
<Cannot permission="billing.edit">
  <Alert>You cannot edit billing.</Alert>
</Cannot>
```

---

## <CanAny>

```tsx
<CanAny permissions={["admin", "billing.edit", "users.create"]}>
  <Button>Continue</Button>
</CanAny>
```

---

## <Role>

```tsx
<Role name="admin">
  <AdminPanel />
</Role>
```

---

## <PermissionBoundary>

Displays loading/fallback while permissions load.

```tsx
<PermissionBoundary loading={<Spinner />} fallback={<NoAccess />}>
  <Dashboard />
</PermissionBoundary>
```

---

# Route Guard

```tsx
<RouteGuard permission="users.read" fallback="/403">
  <UsersPage />
</RouteGuard>
```

---

Next.js

```tsx
<PermissionGuard permission="dashboard.view">{children}</PermissionGuard>
```

---

# Menu Guard

```
Sidebar

↓

PermissionFilter

↓

Only visible items
```

Example

```tsx
const items = [
  {
    title: "Users",

    permission: "users.read",
  },

  {
    title: "Billing",

    permission: "billing.view",
  },
];
```

Then

```tsx
const filtered = filterPermissions(items);
```

---

# Utility Functions

## hasPermission()

```ts
hasPermission(
  "user.delete",

  permissions,
);
```

---

## hasAnyPermission()

```ts
hasAnyPermission(
  ["users.read", "billing.read"],

  permissions,
);
```

---

## hasAllPermissions()

```ts
hasAllPermissions(...)
```

---

## hasRole()

```ts
hasRole("admin");
```

---

## mergePermissions()

Combines

- Role permissions
- User permissions

---

# Advanced Features

## Wildcards

```
users.*

billing.*

*

admin.*
```

---

## Permission Groups

```
admin

↓

users.*

↓

users.read

users.create

users.delete
```

---

## Async Permission Loading

```tsx
<PermissionProvider

loadPermissions={async()=>{

return fetch(...)

}}

>
```

---

## Permission Refresh

```tsx
const { refresh } = usePermissions();
```

---

## Permission Events

```tsx
onPermissionDenied();

onPermissionGranted();

onPermissionLoaded();
```

---

# DevTools

Development only

```
Permission Inspector

Current Roles

Current Permissions

Matched Rule

Denied Rule

Missing Permissions
```

---

# TypeScript Support

Generate types

```ts
type Permission =
  | "users.read"
  | "users.create"
  | "users.delete"
  | "billing.view"
  | "billing.edit";
```

Autocomplete everywhere.

---

# Folder Structure

```
permission/

components/

Can.tsx

Cannot.tsx

Role.tsx

PermissionBoundary.tsx

RouteGuard.tsx

hooks/

usePermission.ts

useRole.ts

usePermissions.ts

useCan.ts

provider/

PermissionProvider.tsx

utils/

hasPermission.ts

matchWildcard.ts

mergePermissions.ts

types/

index.ts

index.ts
```

---

# Future Enhancements

- Feature flags
- Organization support
- Multi-tenant permissions
- Time-based permissions
- Audit logs
- Permission DevTools
- Permission visualizer
- CLI permission generator

---
