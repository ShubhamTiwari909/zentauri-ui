import type { ReactNode } from "react";

export interface PermissionProviderProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
  attributes?: Record<string, unknown>;
  fallback?: ReactNode;
  mode?: "all" | "any";
  loadPermissions?: () => Promise<string[]>;
  loadRoles?: () => Promise<string[]>;
  onPermissionDenied?: (details: { permission: string }) => void;
  onPermissionGranted?: (details: { permission: string }) => void;
  onPermissionLoaded?: (permissions: string[]) => void;
}

export interface PermissionContextValue {
  permissions: string[];
  roles: string[];
  isLoaded: boolean;
  refresh: () => void;
  attributes: Record<string, unknown>;
  mode: "all" | "any";
  onPermissionDenied?: (details: { permission: string }) => void;
  onPermissionGranted?: (details: { permission: string }) => void;
}

export type PermissionMode = "all" | "any";

export interface CanProps {
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
  mode?: PermissionMode;
  fallback?: ReactNode;
  children: ReactNode;
}

export interface UseCanParams {
  permissions: string[];
  mode?: PermissionMode;
}

export interface UseCanResult {
  allowed: boolean;
  reason?: string;
  missingPermissions: string[];
}

export interface RouteGuardProps {
  permission?: string;
  permissions?: string[];
  role?: string;
  roles?: string[];
  mode?: PermissionMode;
  fallback?: ReactNode;
  redirectTo?: string;
  children: ReactNode;
}

export interface PermissionBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

export interface RoleProps {
  name: string;
  fallback?: ReactNode;
  children: ReactNode;
}
