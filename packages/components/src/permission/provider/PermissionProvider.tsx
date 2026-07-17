"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
    if (!loadPermissions) {
      setUserPermissions(permissions);
    }
  }, [permissions, loadPermissions]);

  useEffect(() => {
    if (!loadRoles) {
      setUserRoles(roles);
    }
  }, [roles, loadRoles]);

  const loadIdRef = useRef(0);

  useEffect(() => {
    const loadId = ++loadIdRef.current;
    let mounted = true;

    async function load() {
      setIsLoaded(false);

      try {
        if (loadPermissions) {
          const result = await loadPermissions();
          if (!mounted || loadId !== loadIdRef.current) return;
          setUserPermissions(result);
          onPermissionLoaded?.(result);
        }

        if (loadRoles) {
          const result = await loadRoles();
          if (!mounted || loadId !== loadIdRef.current) return;
          setUserRoles(result);
        }
      } catch {
        // loader rejection — mark as loaded so the UI isn't stuck loading
      }

      if (mounted && loadId === loadIdRef.current) {
        setIsLoaded(true);
      }
    }

    if (loadPermissions || loadRoles) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [loadPermissions, loadRoles, onPermissionLoaded]);

  const refreshIdRef = useRef(0);

  const refresh = useCallback(() => {
    refreshIdRef.current += 1;
    const current = refreshIdRef.current;

    if (loadPermissions) {
      loadPermissions()
        .then((result) => {
          if (current === refreshIdRef.current) {
            setUserPermissions(result);
            onPermissionLoaded?.(result);
          }
        })
        .catch(() => {});
    }

    if (loadRoles) {
      loadRoles()
        .then((result) => {
          if (current === refreshIdRef.current) {
            setUserRoles(result);
          }
        })
        .catch(() => {});
    }
  }, [loadPermissions, loadRoles, onPermissionLoaded]);

  const wrappedOnPermissionDenied = useCallback(
    (details: { permission: string }) => {
      onPermissionDenied?.(details);
    },
    [onPermissionDenied],
  );

  const wrappedOnPermissionGranted = useCallback(
    (details: { permission: string }) => {
      onPermissionGranted?.(details);
    },
    [onPermissionGranted],
  );

  const value = useMemo<PermissionContextValue>(
    () => ({
      permissions: userPermissions,
      roles: userRoles,
      isLoaded,
      refresh,
      attributes,
      mode,
      onPermissionDenied: wrappedOnPermissionDenied,
      onPermissionGranted: wrappedOnPermissionGranted,
    }),
    [
      userPermissions,
      userRoles,
      isLoaded,
      refresh,
      attributes,
      mode,
      wrappedOnPermissionDenied,
      wrappedOnPermissionGranted,
    ],
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
