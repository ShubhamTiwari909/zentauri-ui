import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

import { PermissionProvider } from "./provider/PermissionProvider";
import { usePermission } from "./hooks/usePermission";
import { usePermissions, usePermissionsRefresh } from "./hooks/usePermissions";
import { useRole } from "./hooks/useRole";
import { useRoles } from "./hooks/useRoles";
import { useCan } from "./hooks/useCan";
import { Can } from "./components/Can";
import { Cannot } from "./components/Cannot";
import { Role as RoleComponent } from "./components/Role";
import { PermissionBoundary } from "./components/PermissionBoundary";
import { RouteGuard } from "./components/RouteGuard";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from "./utils/hasPermission";
import {
  hasRole,
  mergePermissions,
  getMissingPermissions,
} from "./utils/mergePermissions";
import { matchWildcard, hasWildcard } from "./utils/matchWildcard";

function TestComponent({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const allowed = usePermission(permission);
  return <div data-testid="test-child">{allowed ? children : null}</div>;
}

function TestPermissionsComponent() {
  const permissions = usePermissions();
  return <div data-testid="permissions-list">{permissions.join(",")}</div>;
}

function TestRoleComponent({ role }: { role: string }) {
  const allowed = useRole(role);
  return <div data-testid="role-check">{allowed ? "yes" : "no"}</div>;
}

function TestRolesComponent() {
  const roles = useRoles();
  return <div data-testid="roles-list">{roles.join(",")}</div>;
}

function TestCanComponent(
  props: Omit<React.ComponentProps<typeof Can>, "children">,
) {
  return (
    <Can {...props}>
      <div data-testid="can-child">Authorized</div>
    </Can>
  );
}

describe("matchWildcard", () => {
  it("matches exact permission", () => {
    expect(matchWildcard("users.read", "users.read")).toBe(true);
  });

  it("rejects different permission", () => {
    expect(matchWildcard("users.read", "users.delete")).toBe(false);
  });

  it("matches wildcard prefix", () => {
    expect(matchWildcard("users.*", "users.read")).toBe(true);
    expect(matchWildcard("users.*", "users.delete")).toBe(true);
    expect(matchWildcard("users.*", "billing.view")).toBe(false);
  });

  it("matches global wildcard", () => {
    expect(matchWildcard("*", "anything.here")).toBe(true);
  });

  it("rejects non-matching pattern", () => {
    expect(matchWildcard("billing.*", "users.read")).toBe(false);
  });

  it("hasWildcard detects wildcards", () => {
    expect(hasWildcard("users.*")).toBe(true);
    expect(hasWildcard("*")).toBe(true);
    expect(hasWildcard("users.read")).toBe(false);
  });
});

describe("hasPermission", () => {
  const permissions = ["users.read", "users.create", "billing.view"];

  it("returns true for existing permission", () => {
    expect(hasPermission("users.read", permissions)).toBe(true);
  });

  it("returns false for missing permission", () => {
    expect(hasPermission("users.delete", permissions)).toBe(false);
  });

  it("matches with wildcard", () => {
    expect(hasPermission("users.*", ["users.*"])).toBe(true);
    expect(hasPermission("users.read", ["users.*"])).toBe(true);
  });
});

describe("hasAnyPermission", () => {
  const permissions = ["users.read", "billing.view"];

  it("returns true when any matches", () => {
    expect(hasAnyPermission(["users.read", "admin"], permissions)).toBe(true);
  });

  it("returns false when none match", () => {
    expect(hasAnyPermission(["admin", "superadmin"], permissions)).toBe(false);
  });
});

describe("hasAllPermissions", () => {
  const permissions = ["users.read", "users.create", "billing.view"];

  it("returns true when all match", () => {
    expect(hasAllPermissions(["users.read", "users.create"], permissions)).toBe(
      true,
    );
  });

  it("returns false when some missing", () => {
    expect(hasAllPermissions(["users.read", "users.delete"], permissions)).toBe(
      false,
    );
  });
});

describe("hasRole", () => {
  it("returns true for existing role", () => {
    expect(hasRole("admin", ["admin", "user"])).toBe(true);
  });

  it("returns false for missing role", () => {
    expect(hasRole("moderator", ["admin", "user"])).toBe(false);
  });
});

describe("mergePermissions", () => {
  it("merges role and user permissions", () => {
    const rolePermissionsMap = {
      admin: ["users.read", "users.delete"],
      user: ["users.read"],
    };
    const result = mergePermissions(
      rolePermissionsMap,
      ["admin"],
      ["billing.view"],
    );
    expect(result).toContain("users.read");
    expect(result).toContain("users.delete");
    expect(result).toContain("billing.view");
  });

  it("deduplicates permissions", () => {
    const rolePermissionsMap = {
      admin: ["users.read"],
    };
    const result = mergePermissions(
      rolePermissionsMap,
      ["admin"],
      ["users.read"],
    );
    expect(result.filter((p) => p === "users.read")).toHaveLength(1);
  });
});

describe("getMissingPermissions", () => {
  it("returns missing permissions in all mode", () => {
    const missing = getMissingPermissions(
      ["users.read", "users.delete"],
      ["users.read"],
      "all",
    );
    expect(missing).toEqual(["users.delete"]);
  });

  it("returns empty when all permissions present", () => {
    const missing = getMissingPermissions(
      ["users.read"],
      ["users.read"],
      "all",
    );
    expect(missing).toEqual([]);
  });

  it("handles any mode", () => {
    const missing = getMissingPermissions(
      ["admin", "users.read"],
      ["users.read"],
      "any",
    );
    expect(missing).toEqual([]);
  });
});

describe("PermissionProvider + hooks", () => {
  it("provides permissions to children via usePermissions", () => {
    render(
      <PermissionProvider permissions={["users.read", "billing.view"]}>
        <TestPermissionsComponent />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("permissions-list")).toHaveTextContent(
      "users.read,billing.view",
    );
  });

  it("usePermission returns true for granted permission", () => {
    render(
      <PermissionProvider permissions={["users.delete"]}>
        <TestComponent permission="users.delete">
          <span>Can delete</span>
        </TestComponent>
      </PermissionProvider>,
    );
    expect(screen.getByText("Can delete")).toBeInTheDocument();
  });

  it("usePermission returns false for denied permission", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <TestComponent permission="users.delete">
          <span>Can delete</span>
        </TestComponent>
      </PermissionProvider>,
    );
    expect(screen.queryByText("Can delete")).not.toBeInTheDocument();
  });

  it("useRole returns true for assigned role", () => {
    render(
      <PermissionProvider roles={["admin"]}>
        <TestRoleComponent role="admin" />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("role-check")).toHaveTextContent("yes");
  });

  it("useRole returns false for unassigned role", () => {
    render(
      <PermissionProvider roles={["user"]}>
        <TestRoleComponent role="admin" />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("role-check")).toHaveTextContent("no");
  });

  it("useRoles returns all roles", () => {
    render(
      <PermissionProvider roles={["admin", "editor"]}>
        <TestRolesComponent />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("roles-list")).toHaveTextContent("admin,editor");
  });

  it("useCan returns allowed for matching permissions", () => {
    function TestUseCan() {
      const { allowed, missingPermissions } = useCan({
        permissions: ["users.read"],
      });
      return (
        <div>
          <span data-testid="can-allowed">{String(allowed)}</span>
          <span data-testid="can-missing">{missingPermissions.join(",")}</span>
        </div>
      );
    }

    render(
      <PermissionProvider permissions={["users.read"]}>
        <TestUseCan />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-allowed")).toHaveTextContent("true");
    expect(screen.getByTestId("can-missing")).toHaveTextContent("");
  });

  it("useCan returns denied with missing permissions", () => {
    function TestUseCan() {
      const { allowed, missingPermissions } = useCan({
        permissions: ["users.read", "users.delete"],
      });
      return (
        <div>
          <span data-testid="can-allowed">{String(allowed)}</span>
          <span data-testid="can-missing">{missingPermissions.join(",")}</span>
        </div>
      );
    }

    render(
      <PermissionProvider permissions={["users.read"]}>
        <TestUseCan />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-allowed")).toHaveTextContent("false");
    expect(screen.getByTestId("can-missing")).toHaveTextContent("users.delete");
  });
});

describe("Can component", () => {
  it("renders children when permission is granted", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <TestCanComponent permission="users.read" />
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-child")).toHaveTextContent("Authorized");
  });

  it("renders fallback when permission is denied", () => {
    render(
      <PermissionProvider permissions={[]}>
        <Can
          permission="users.read"
          fallback={<div data-testid="fallback">Access Denied</div>}
        >
          <div data-testid="can-child">Authorized</div>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("fallback")).toHaveTextContent("Access Denied");
    expect(screen.queryByTestId("can-child")).not.toBeInTheDocument();
  });

  it("renders nothing when permission is denied and no fallback", () => {
    const { container } = render(
      <PermissionProvider permissions={[]}>
        <Can permission="users.read">
          <div data-testid="can-child">Authorized</div>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.queryByTestId("can-child")).not.toBeInTheDocument();
  });

  it("supports multiple permissions in all mode", () => {
    render(
      <PermissionProvider permissions={["users.read", "users.create"]}>
        <Can permissions={["users.read", "users.create"]} mode="all">
          <div data-testid="can-child">Authorized</div>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-child")).toHaveTextContent("Authorized");
  });

  it("supports multiple permissions in any mode", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <Can permissions={["users.read", "admin"]} mode="any">
          <div data-testid="can-child">Authorized</div>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-child")).toHaveTextContent("Authorized");
  });

  it("checks roles", () => {
    render(
      <PermissionProvider roles={["admin"]}>
        <Can role="admin">
          <div data-testid="can-child">Authorized</div>
        </Can>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("can-child")).toHaveTextContent("Authorized");
  });

  it("has displayName", () => {
    expect(Can.displayName).toBe("Can");
  });
});

describe("Cannot component", () => {
  it("renders children when permission is denied", () => {
    render(
      <PermissionProvider permissions={[]}>
        <Cannot permission="users.read">
          <div data-testid="cannot-child">No Access</div>
        </Cannot>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("cannot-child")).toHaveTextContent("No Access");
  });

  it("does not render when permission is granted", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <Cannot permission="users.read">
          <div data-testid="cannot-child">No Access</div>
        </Cannot>
      </PermissionProvider>,
    );
    expect(screen.queryByTestId("cannot-child")).not.toBeInTheDocument();
  });

  it("has displayName", () => {
    expect(Cannot.displayName).toBe("Cannot");
  });
});

describe("Role component", () => {
  it("renders children when role matches", () => {
    render(
      <PermissionProvider roles={["admin"]}>
        <RoleComponent name="admin">
          <div data-testid="role-child">Admin Panel</div>
        </RoleComponent>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("role-child")).toHaveTextContent("Admin Panel");
  });

  it("renders fallback when role does not match", () => {
    render(
      <PermissionProvider roles={["user"]}>
        <RoleComponent
          name="admin"
          fallback={<div data-testid="fallback">No Access</div>}
        >
          <div data-testid="role-child">Admin Panel</div>
        </RoleComponent>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("fallback")).toHaveTextContent("No Access");
    expect(screen.queryByTestId("role-child")).not.toBeInTheDocument();
  });

  it("has displayName", () => {
    expect(RoleComponent.displayName).toBe("Role");
  });
});

describe("PermissionBoundary", () => {
  it("renders children when loaded with permissions", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <PermissionBoundary>
          <div data-testid="boundary-child">Content</div>
        </PermissionBoundary>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("boundary-child")).toHaveTextContent("Content");
  });

  it("renders fallback when no permissions and no roles", () => {
    render(
      <PermissionProvider permissions={[]} roles={[]}>
        <PermissionBoundary
          fallback={<div data-testid="fallback">No Access</div>}
          loading={<div data-testid="loading">Loading...</div>}
        >
          <div data-testid="boundary-child">Content</div>
        </PermissionBoundary>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("fallback")).toHaveTextContent("No Access");
    expect(screen.queryByTestId("boundary-child")).not.toBeInTheDocument();
  });

  it("has displayName", () => {
    expect(PermissionBoundary.displayName).toBe("PermissionBoundary");
  });
});

describe("RouteGuard", () => {
  it("renders children when permission is granted", () => {
    render(
      <PermissionProvider permissions={["users.read"]}>
        <RouteGuard permission="users.read">
          <div data-testid="guard-child">Protected Content</div>
        </RouteGuard>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("guard-child")).toHaveTextContent(
      "Protected Content",
    );
  });

  it("renders fallback when permission is denied", () => {
    render(
      <PermissionProvider permissions={[]}>
        <RouteGuard
          permission="users.read"
          fallback={<div data-testid="fallback">Access Denied</div>}
        >
          <div data-testid="guard-child">Protected Content</div>
        </RouteGuard>
      </PermissionProvider>,
    );
    expect(screen.getByTestId("fallback")).toHaveTextContent("Access Denied");
    expect(screen.queryByTestId("guard-child")).not.toBeInTheDocument();
  });

  it("has displayName", () => {
    expect(RouteGuard.displayName).toBe("RouteGuard");
  });
});
