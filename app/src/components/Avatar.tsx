/** Círculo con iniciales. `solid` = navy relleno (encabezado de perfil). */
export function Avatar({ ini, size = 32, fontSize = 12, solid = false, muted = false }: { ini: string; size?: number; fontSize?: number; solid?: boolean; muted?: boolean }) {
  return (
    <span
      style={{
        width: size, height: size, flex: '0 0 auto', borderRadius: 999, fontSize, fontWeight: muted ? 600 : 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: solid ? 'var(--tu-navy-600)' : muted ? 'var(--tu-grey-100)' : 'var(--tu-navy-50)',
        color: solid ? '#fff' : muted ? 'var(--tu-grey-600)' : 'var(--tu-navy-600)',
      }}
    >
      {ini}
    </span>
  );
}
