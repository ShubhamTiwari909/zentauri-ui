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
import type {
  PermissionCheckEvent,
  PermissionContextValue,
  PermissionProviderProps,
} from "../types";

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
  const onPermissionLoadedRef = useRef(onPermissionLoaded);
  onPermissionLoadedRef.current = onPermissionLoaded;

  useEffect(() => {
    const loadId = ++loadIdRef.current;
    let mounted = true;
    let resolvedCount = 0;
    let total = 0;

    if (loadPermissions) total++;
    if (loadRoles) total++;

    async function load() {
      setIsLoaded(false);

      if (loadPermissions) {
        try {
          const result = await loadPermissions();
          if (!mounted || loadId !== loadIdRef.current) return;
          setUserPermissions(result);
          onPermissionLoadedRef.current?.(result);
        } catch {
          // individual loader rejection — other loader can still proceed
        }
        if (mounted && loadId === loadIdRef.current) resolvedCount++;
      }

      if (loadRoles) {
        try {
          const result = await loadRoles();
          if (!mounted || loadId !== loadIdRef.current) return;
          setUserRoles(result);
        } catch {
          // individual loader rejection
        }
        if (mounted && loadId === loadIdRef.current) resolvedCount++;
      }

      if (mounted && loadId === loadIdRef.current && resolvedCount >= total) {
        setIsLoaded(true);
      }
    }

    if (total > 0) {
      load();
    }

    return () => {
      mounted = false;
    };
  }, [loadPermissions, loadRoles]);

  const refreshIdRef = useRef(0);

  const refresh = useCallback(() => {
    refreshIdRef.current += 1;
    const current = refreshIdRef.current;

    if (loadPermissions) {
      loadPermissions()
        .then((result) => {
          if (current === refreshIdRef.current) {
            setUserPermissions(result);
            onPermissionLoadedRef.current?.(result);
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
  }, [loadPermissions, loadRoles]);

  const onPermissionDeniedRef = useRef(onPermissionDenied);
  onPermissionDeniedRef.current = onPermissionDenied;
  const onPermissionGrantedRef = useRef(onPermissionGranted);
  onPermissionGrantedRef.current = onPermissionGranted;

  const wrappedOnPermissionDenied = useCallback(
    (details: PermissionCheckEvent) => {
      onPermissionDeniedRef.current?.(details);
    },
    [],
  );

  const wrappedOnPermissionGranted = useCallback(
    (details: PermissionCheckEvent) => {
      onPermissionGrantedRef.current?.(details);
    },
    [],
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
