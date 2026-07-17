"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PermissionContextValue, PermissionProviderProps } from "../types";

export const PermissionContext = createContext<PermissionContextValue | null>(
  null,
);

export function usePermissionContext(): PermissionContextValue {
  const ctx = useContext(PermissionContext);
  if (!ctx) {
    throw new Error(
      "usePermissionContext must be used within a PermissionProvider",
    );
  }
  return ctx;
}

export function PermissionProvider({
  children,
  roles = [],
  permissions = [],
  attributes = {},
  fallback,
  mode = "all",
  loadPermissions,
  loadRoles,
  onPermissionDenied,
  onPermissionGranted,
  onPermissionLoaded,
}: PermissionProviderProps) {
  const [userPermissions, setUserPermissions] = useState<string[]>(permissions);
  const [userRoles, setUserRoles] = useState<string[]>(roles);
  const [isLoaded, setIsLoaded] = useState(!loadPermissions && !loadRoles);

  useEffect(() => {
    setUserPermissions(permissions);
  }, [permissions]);

  useEffect(() => {
    setUserRoles(roles);
  }, [roles]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoaded(false);

      if (loadPermissions) {
        const result = await loadPermissions();
        if (!mounted) return;
        setUserPermissions(result);
        onPermissionLoaded?.(result);
      }

      if (loadRoles) {
        const result = await loadRoles();
        if (!mounted) return;
        setUserRoles(result);
      }

      if (mounted) setIsLoaded(true);
    }

    if (loadPermissions || loadRoles) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [loadPermissions, loadRoles, onPermissionLoaded]);

  const refresh = useCallback(() => {
    if (loadPermissions) {
      loadPermissions().then((result) => {
        setUserPermissions(result);
        onPermissionLoaded?.(result);
      });
    }
    if (loadRoles) {
      loadRoles().then(setUserRoles);
    }
  }, [loadPermissions, loadRoles, onPermissionLoaded]);

  const value = useMemo<PermissionContextValue>(
    () => ({
      permissions: userPermissions,
      roles: userRoles,
      isLoaded,
      refresh,
      attributes,
      mode,
    }),
    [userPermissions, userRoles, isLoaded, refresh, attributes, mode],
  );

  if (!isLoaded && (loadPermissions || loadRoles)) {
    return fallback ?? null;
  }

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

PermissionProvider.displayName = "PermissionProvider";
