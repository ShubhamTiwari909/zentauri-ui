"use client";

import { useState } from "react";

import { Section } from "@/components/common/Section";
import {
  PermissionProvider,
  Can,
  Cannot,
  Role,
  usePermission,
  useRole,
} from "@zentauri-ui/zentauri-components/permission";

const PERMISSION_OPTIONS = [
  "users.read",
  "users.create",
  "users.update",
  "users.delete",
  "billing.view",
  "billing.edit",
  "dashboard.view",
  "analytics.export",
  "posts.publish",
] as const;

const ROLE_OPTIONS = ["admin", "user", "editor", "moderator"] as const;

function ActivePermissions({
  permissions,
  roles,
}: {
  permissions: string[];
  roles: string[];
}) {
  const canDelete = usePermission("users.delete");
  const isAdmin = useRole("admin");

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Current permissions:{" "}
        <code className="text-xs text-slate-700 dark:text-slate-300">
          {permissions.join(", ") || "(none)"}
        </code>
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Current roles:{" "}
        <code className="text-xs text-slate-700 dark:text-slate-300">
          {roles.join(", ") || "(none)"}
        </code>
      </p>

      <hr className="border-slate-200 dark:border-white/10" />

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Declarative components:
        </p>

        <Can permission="users.read">
          <div className="rounded bg-emerald-100 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {"✅ <Can> renders — you can read users"}
          </div>
        </Can>

        <Can permission="users.delete">
          <div className="rounded bg-emerald-100 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {"✅ <Can> renders — you can delete users"}
          </div>
        </Can>

        <Cannot permission="users.delete">
          <div className="rounded bg-red-100 px-3 py-2 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300">
            {"❌ <Cannot> renders — you cannot delete users"}
          </div>
        </Cannot>

        <Role name="admin">
          <div className="rounded bg-emerald-100 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {"✅ <Role> renders — you are an admin"}
          </div>
        </Role>
      </div>

      <hr className="border-slate-200 dark:border-white/10" />

      <div className="space-y-1 text-sm">
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Hooks:
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          <code>usePermission("users.delete")</code> →{" "}
          <span className={canDelete ? "text-emerald-600" : "text-red-500"}>
            {String(canDelete)}
          </span>
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          <code>useRole("admin")</code> →{" "}
          <span className={isAdmin ? "text-emerald-600" : "text-red-500"}>
            {String(isAdmin)}
          </span>
        </p>
      </div>
    </div>
  );
}

export function PermissionPlayground() {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(["users.read", "users.delete", "billing.view"]),
  );
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(
    new Set(["admin"]),
  );

  function togglePermission(p: string) {
    setSelectedPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  }

  function toggleRole(r: string) {
    setSelectedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  }

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Interactive playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Toggle permissions and roles below to see how <code>Can</code>,{" "}
        <code>Cannot</code>, <code>Role</code>, and the hooks react in real
        time.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            Permissions
          </p>
          <div className="flex flex-wrap gap-2">
            {PERMISSION_OPTIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePermission(p)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedPermissions.has(p)
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20"
                }`}
              >
                {selectedPermissions.has(p) ? "✓ " : ""}
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            Roles
          </p>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => toggleRole(r)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedRoles.has(r)
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/20"
                }`}
              >
                {selectedRoles.has(r) ? "✓ " : ""}
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <PermissionProvider
          permissions={[...selectedPermissions]}
          roles={[...selectedRoles]}
        >
          <ActivePermissions
            permissions={[...selectedPermissions]}
            roles={[...selectedRoles]}
          />
        </PermissionProvider>
      </div>
    </Section>
  );
}
