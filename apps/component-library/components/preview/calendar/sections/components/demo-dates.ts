/**
 * Fixed dates shared by every calendar preview demo (hero, playground,
 * locale showcase) so the server-rendered grid is deterministic — no
 * hydration drift from `new Date()`.
 */
export const DEMO_MONTH = new Date(2026, 6, 1);
export const DEMO_TODAY = new Date(2026, 6, 7);
