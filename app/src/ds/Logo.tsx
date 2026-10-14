const SRC = {
  dark: 'assets/logo/teamup-logo-dark.png',
} as const;

/** TeamUp DS `Logo` (wordmark on light). */
export function Logo({ variant = 'dark', height = 32 }: { variant?: keyof typeof SRC; height?: number }) {
  return <img src={SRC[variant]} alt="TeamUp" style={{ height, width: 'auto', display: 'block' }} />;
}
