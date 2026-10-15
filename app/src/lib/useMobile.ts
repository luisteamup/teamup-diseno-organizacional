import { useSyncExternalStore } from 'react';

/** Breakpoint móvil: teléfonos y tabletas verticales angostas. */
export const MOBILE_QUERY = '(max-width: 767px)';

const mql = typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null;
const subscribe = (cb: () => void) => {
  mql?.addEventListener('change', cb);
  return () => mql?.removeEventListener('change', cb);
};

/** true cuando la pantalla es de teléfono (≤ 767px). */
export function useMobile(): boolean {
  return useSyncExternalStore(subscribe, () => mql?.matches ?? false, () => false);
}
