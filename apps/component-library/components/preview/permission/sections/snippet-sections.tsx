import { Section } from "@/components/common/Section";

export function PermissionCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Provider setup
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Wrap your application with PermissionProvider to enable permission and
        role checking throughout the component tree.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
        <code className="block whitespace-pre">{`import { PermissionProvider } from "@zentauri-ui/zentauri-components/permission";

function App() {
  return (
    <PermissionProvider
      roles={["admin"]}
      permissions={[
        "users.read",
        "users.create",
        "users.delete",
        "billing.view",
      ]}
    >
      <YourApp />
    </PermissionProvider>
  );
}`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
        Declarative components
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Can, Cannot, and Role to conditionally render UI elements.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
        <code className="block whitespace-pre">{`import { Can, Cannot, Role } from "@zentauri-ui/zentauri-components/permission";

<Can permission="users.delete">
  <button>Delete User</button>
</Can>

<Can permissions={["users.create", "users.update"]} mode="all">
  <button>Edit</button>
</Can>

<Cannot permission="billing.edit">
  <Alert>You cannot edit billing.</Alert>
</Cannot>

<Role name="admin">
  <AdminPanel />
</Role>`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
        Hooks
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Programmatic permission and role checking with hooks.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
        <code className="block whitespace-pre">{`import { usePermission, useRole, useCan } from "@zentauri-ui/zentauri-components/permission";

function DeleteButton() {
  const canDelete = usePermission("users.delete");
  const isAdmin = useRole("admin");

  const { allowed, missingPermissions } = useCan({
    permissions: ["users.delete", "admin"],
    mode: "any",
  });

  return canDelete ? <button>Delete</button> : null;
}`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
        Route guard
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Protect entire route segments with RouteGuard.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
        <code className="block whitespace-pre">{`import { RouteGuard } from "@zentauri-ui/zentauri-components/permission";

<RouteGuard
  permission="users.read"
  fallback={<div>Access denied</div>}
  redirectTo="/403"
>
  <UsersPage />
</RouteGuard>`}</code>
      </pre>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
        Async permissions
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Load permissions from an API asynchronously.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-slate-50">
        <code className="block whitespace-pre">{`import { PermissionProvider, PermissionBoundary } from "@zentauri-ui/zentauri-components/permission";

function App() {
  return (
    <PermissionProvider
      loadPermissions={async () => {
        const res = await fetch("/api/permissions");
        return res.json();
      }}
      loadRoles={async () => {
        const res = await fetch("/api/roles");
        return res.json();
      }}
    >
      <PermissionBoundary
        loading={<Spinner />}
        fallback={<NoAccess />}
      >
        <Dashboard />
      </PermissionBoundary>
    </PermissionProvider>
  );
}`}</code>
      </pre>
    </Section>
  );
}
