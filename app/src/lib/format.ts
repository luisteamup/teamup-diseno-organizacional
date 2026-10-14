export const fmt = (n: number) => Math.round(n).toLocaleString('es-MX');
export const initials = (name: string) => name.split(' ').map((w) => w[0]).slice(0, 2).join('');
export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
/** Cubic ease-out used by every count-up. */
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
