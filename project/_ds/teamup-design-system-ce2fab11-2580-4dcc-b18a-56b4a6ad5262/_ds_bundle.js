/* @ds-bundle: {"format":4,"namespace":"TeamUpDesignSystem_ce2fab","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"MarkerText","sourcePath":"components/core/MarkerText.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"MeterBar","sourcePath":"components/data/MeterBar.jsx"},{"name":"ScoreRing","sourcePath":"components/data/ScoreRing.jsx"},{"name":"StatBlock","sourcePath":"components/data/StatBlock.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"CalloutCard","sourcePath":"components/surfaces/CalloutCard.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"PricingCard","sourcePath":"components/surfaces/PricingCard.jsx"},{"name":"SectionHeading","sourcePath":"components/surfaces/SectionHeading.jsx"}],"sourceHashes":{"components/core/Button.jsx":"c284eba64032","components/core/Icon.jsx":"9fa9fbdc5f2c","components/core/Logo.jsx":"388b50c03ab5","components/core/MarkerText.jsx":"e96bcf8d39cc","components/data/Badge.jsx":"84838c4050ef","components/data/MeterBar.jsx":"83ebef97b73f","components/data/ScoreRing.jsx":"bc808b1da61d","components/data/StatBlock.jsx":"9ba878b20fab","components/forms/Checkbox.jsx":"090de9a673aa","components/forms/Input.jsx":"ea95e093db33","components/forms/Select.jsx":"7edb942ae561","components/forms/Textarea.jsx":"9af797b3a77d","components/navigation/Footer.jsx":"7284dec658ba","components/navigation/NavBar.jsx":"08d4e139c99a","components/navigation/Tabs.jsx":"4f76f817aab8","components/surfaces/CalloutCard.jsx":"3908ee305129","components/surfaces/Card.jsx":"b4779995505b","components/surfaces/PricingCard.jsx":"bf10a731f940","components/surfaces/SectionHeading.jsx":"874fbb74cb9e","ui_kits/app/AppShell.jsx":"f5d7abc6499d","ui_kits/app/CandidatesScreen.jsx":"8d026a83ce6a","ui_kits/app/PipelineScreen.jsx":"c67cc7c5bf52","ui_kits/app/data.js":"faa02ee5cc30","ui_kits/website/HomeScreen.jsx":"4c58c3da84da","ui_kits/website/PricingScreen.jsx":"2690e29d33a7","ui_kits/website/ServiceScreen.jsx":"5f78e8eb788a","ui_kits/website/SiteChrome.jsx":"548b34b52ffa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TeamUpDesignSystem_ce2fab = window.TeamUpDesignSystem_ce2fab || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Thin wrapper over the Lucide CDN set. The host page must load
   https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js once. */
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = '';
    const i = document.createElement('i');
    i.setAttribute('data-lucide', name);
    el.appendChild(i);
    window.lucide.createIcons({
      nameAttr: 'data-lucide',
      attrs: {
        width: size,
        height: size,
        'stroke-width': strokeWidth
      }
    });
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      color,
      flex: '0 0 auto',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 'var(--control-height-sm)',
    padding: '0 14px',
    fontSize: 'var(--fs-sm)',
    gap: 6,
    icon: 16
  },
  md: {
    height: 'var(--control-height)',
    padding: '0 20px',
    fontSize: 'var(--fs-sm)',
    gap: 8,
    icon: 18
  },
  lg: {
    height: 'var(--control-height-lg)',
    padding: '0 26px',
    fontSize: 'var(--fs-base)',
    gap: 8,
    icon: 20
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--tu-navy-600)',
    color: '#fff',
    border: '1px solid var(--tu-navy-600)',
    hover: {
      background: 'var(--tu-navy-700)',
      borderColor: 'var(--tu-navy-700)'
    }
  },
  secondary: {
    background: '#fff',
    color: 'var(--tu-navy-600)',
    border: '1px solid var(--tu-grey-300)',
    hover: {
      background: 'var(--tu-grey-50)',
      borderColor: 'var(--tu-grey-400)'
    }
  },
  ai: {
    background: 'var(--tu-violet-50)',
    color: 'var(--tu-violet-600)',
    border: '1px solid var(--tu-violet-200)',
    hover: {
      background: 'var(--tu-violet-100)',
      borderColor: 'var(--tu-violet-300)'
    }
  },
  cyan: {
    background: 'var(--tu-cyan-500)',
    color: '#fff',
    border: '1px solid var(--tu-cyan-500)',
    hover: {
      background: 'var(--tu-cyan-600)',
      borderColor: 'var(--tu-cyan-600)'
    }
  },
  ghost: {
    background: 'transparent',
    color: 'var(--tu-grey-600)',
    border: '1px solid transparent',
    hover: {
      background: 'var(--tu-grey-50)',
      color: 'var(--tu-navy-600)'
    }
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  disabled = false,
  as = 'button',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: '-0.005em',
    borderRadius: 'var(--radius-control)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'var(--transition-control), transform var(--dur-instant) var(--ease-standard)',
    transform: down && !disabled ? 'scale(var(--press-scale))' : 'none',
    ...v,
    ...(hover && !disabled ? v.hover : null),
    ...(disabled ? {
      background: 'var(--tu-grey-100)',
      color: 'var(--tu-grey-400)',
      border: '1px solid var(--tu-grey-200)'
    } : null),
    ...style
  };
  delete base.hover;
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: base,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  dark: 'assets/logo/teamup-logo-dark.png',
  white: 'assets/logo/teamup-logo-white.png',
  isotipo: 'assets/logo/teamup-isotipo.png'
};
function Logo({
  variant = 'dark',
  height = 32,
  basePath = '',
  style,
  ...rest
}) {
  const src = (basePath ? basePath.replace(/\/$/, '') + '/' : '') + SRC[variant];
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: "TeamUp",
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/MarkerText.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLORS = {
  aqua: {
    background: 'var(--tu-marker-aqua)',
    color: 'var(--tu-ink)'
  },
  magenta: {
    background: 'var(--tu-marker-magenta)',
    color: '#fff'
  },
  lime: {
    background: 'var(--tu-marker-lime)',
    color: 'var(--tu-ink)'
  },
  blue: {
    background: 'var(--tu-marker-blue)',
    color: '#fff'
  },
  violet: {
    background: 'var(--tu-marker-violet)',
    color: '#fff'
  }
};
function MarkerText({
  children,
  color = 'aqua',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      padding: '0 .18em',
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      ...(COLORS[color] || COLORS.aqua),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { MarkerText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MarkerText.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    background: 'var(--tu-grey-100)',
    color: 'var(--tu-grey-600)',
    border: 'var(--tu-grey-200)'
  },
  info: {
    background: 'var(--tu-info-bg)',
    color: 'var(--tu-cyan-700)',
    border: 'var(--tu-info-border)'
  },
  success: {
    background: 'var(--tu-success-bg)',
    color: 'var(--tu-success)',
    border: 'var(--tu-success-border)'
  },
  warning: {
    background: 'var(--tu-warning-bg)',
    color: 'var(--tu-warning)',
    border: 'var(--tu-warning-border)'
  },
  danger: {
    background: 'var(--tu-danger-bg)',
    color: 'var(--tu-danger)',
    border: 'var(--tu-danger-border)'
  },
  ai: {
    background: 'var(--tu-violet-50)',
    color: 'var(--tu-violet-600)',
    border: 'var(--tu-violet-200)'
  },
  brand: {
    background: 'var(--tu-navy-600)',
    color: '#fff',
    border: 'var(--tu-navy-600)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  uppercase = false,
  bordered = true,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: sm ? '2px 8px' : '3px 11px',
      fontSize: sm ? 'var(--fs-3xs)' : 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: uppercase ? 'var(--ls-caps)' : '0',
      textTransform: uppercase ? 'uppercase' : 'none',
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      borderRadius: 'var(--radius-pill)',
      background: t.background,
      color: t.color,
      border: bordered ? '1px solid ' + t.border : '1px solid transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/MeterBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MeterBar({
  label,
  value = 0,
  suffix = '%',
  color = 'var(--tu-cyan-500)',
  track = 'var(--tu-grey-100)',
  height = 7,
  showValue = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      ...style
    }
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 7
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-700)'
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), showValue ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--tu-navy-600)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value, suffix) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: 'var(--radius-pill)',
      background: track,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: Math.max(0, Math.min(100, value)) + '%',
      borderRadius: 'var(--radius-pill)',
      background: color,
      transition: 'width var(--dur-slower) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { MeterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MeterBar.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreRing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ScoreRing({
  value = 0,
  max = 100,
  size = 96,
  caption = 'AI Score',
  color = 'var(--tu-cyan-500)',
  track = 'var(--tu-cyan-100)',
  style,
  ...rest
}) {
  const stroke = Math.max(5, Math.round(size * 0.075));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      display: 'block',
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: track,
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    style: {
      transition: 'stroke-dashoffset var(--dur-slower) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.32,
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--tu-navy-600)'
    }
  }, value), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 3,
      fontSize: Math.max(9, size * 0.115),
      color: 'var(--tu-grey-500)'
    }
  }, caption) : null));
}
Object.assign(__ds_scope, { ScoreRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreRing.jsx", error: String((e && e.message) || e) }); }

// components/data/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLORS = {
  navy: 'var(--tu-navy-600)',
  cyan: 'var(--tu-cyan-500)',
  violet: 'var(--tu-violet-500)',
  blue: 'var(--tu-blue)',
  white: '#fff'
};
function StatBlock({
  value,
  label,
  color = 'navy',
  size = 'md',
  align = 'left',
  style,
  ...rest
}) {
  const fs = size === 'lg' ? 96 : size === 'sm' ? 44 : 64;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: fs,
      lineHeight: 1,
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tighter)',
      color: COLORS[color] || COLORS.navy
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: size === 'lg' ? 10 : 6,
      fontSize: size === 'sm' ? 'var(--fs-sm)' : 'var(--fs-md)',
      lineHeight: 1.35,
      color: color === 'white' ? 'rgba(255,255,255,.92)' : 'var(--tu-grey-600)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const controlled = checked !== undefined;
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = controlled ? checked : inner;
  const toggle = e => {
    if (disabled) return;
    if (!controlled) setInner(!on);
    onChange && onChange(e, !on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .55 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 19,
      height: 19,
      flex: '0 0 auto',
      marginTop: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--tu-navy-600)' : '#fff',
      border: '1.5px solid ' + (on ? 'var(--tu-navy-600)' : 'var(--tu-grey-300)'),
      color: '#fff',
      transition: 'var(--transition-control)'
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13
  }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-800)'
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 2,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-500)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  size = 'md',
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-height-lg)' : size === 'sm' ? 'var(--control-height-sm)' : 'var(--control-height)';
  const borderColor = error ? 'var(--tu-danger)' : focus ? 'var(--tu-cyan-500)' : 'var(--tu-grey-300)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 7,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--tu-grey-700)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      display: 'flex',
      color: 'var(--tu-grey-400)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })) : null, /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      width: '100%',
      height: h,
      padding: icon ? '0 14px 0 38px' : '0 14px',
      fontSize: 'var(--fs-sm)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--tu-grey-800)',
      background: '#fff',
      border: '1.5px solid ' + borderColor,
      borderRadius: 'var(--radius-control)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px rgba(0,173,217,.15)' : 'none',
      transition: 'var(--transition-control)',
      ...style
    }
  }))), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-500)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  size = 'md',
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-height-lg)' : size === 'sm' ? 'var(--control-height-sm)' : 'var(--control-height)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 7,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--tu-grey-700)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      width: '100%',
      height: h,
      padding: '0 38px 0 14px',
      appearance: 'none',
      fontSize: 'var(--fs-sm)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--tu-grey-800)',
      background: '#fff',
      border: '1.5px solid ' + (focus ? 'var(--tu-cyan-500)' : 'var(--tu-grey-300)'),
      borderRadius: 'var(--radius-control)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px rgba(0,173,217,.15)' : 'none',
      transition: 'var(--transition-control)',
      ...style
    }
  }), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      pointerEvents: 'none',
      color: 'var(--tu-grey-400)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-500)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--tu-danger)' : focus ? 'var(--tu-cyan-500)' : 'var(--tu-grey-300)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 7,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--tu-grey-700)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      width: '100%',
      padding: '11px 14px',
      fontSize: 'var(--fs-sm)',
      fontFamily: 'var(--font-sans)',
      lineHeight: 1.55,
      color: 'var(--tu-grey-800)',
      background: '#fff',
      resize: 'vertical',
      border: '1.5px solid ' + borderColor,
      borderRadius: 'var(--radius-control)',
      outline: 'none',
      boxShadow: focus ? '0 0 0 3px rgba(0,173,217,.15)' : 'none',
      transition: 'var(--transition-control)',
      ...style
    }
  })), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-500)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Footer({
  columns = [],
  blurb,
  address,
  legal = [],
  copyright,
  basePath = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: 'var(--tu-grey-900)',
      color: 'rgba(255,255,255,.72)',
      paddingTop: 'var(--space-12)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(180px,1.4fr) repeat(4,minmax(0,1fr))',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "white",
    height: 26,
    basePath: basePath
  }), blurb ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.65,
      maxWidth: 330
    }
  }, blurb) : null, address ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-xs)',
      lineHeight: 1.7,
      color: 'rgba(255,255,255,.5)'
    }
  }, address) : null), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: '#fff',
      marginBottom: 14
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'rgba(255,255,255,.72)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = '#fff';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'rgba(255,255,255,.72)';
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-11)',
      paddingTop: 'var(--space-6)',
      paddingBottom: 'var(--space-8)',
      borderTop: '1px solid rgba(255,255,255,.12)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 18,
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, legal.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'rgba(255,255,255,.6)',
      whiteSpace: 'nowrap'
    }
  }, l))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'rgba(255,255,255,.45)'
    }
  }, copyright))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  items = [],
  basePath = '',
  locale = 'EN',
  onNavigate,
  activeHref,
  sticky = true,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", _extends({
    onMouseLeave: () => setOpen(null),
    style: {
      position: sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: 40,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '10px var(--gutter-page)',
      minHeight: 68,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px 28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('/');
    },
    style: {
      display: 'flex',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    height: 26,
    basePath: basePath
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 4,
      flex: '1 1 0%',
      minWidth: 0
    }
  }, items.map(it => {
    const active = activeHref && it.href === activeHref;
    return /*#__PURE__*/React.createElement("div", {
      key: it.label,
      style: {
        position: 'relative'
      },
      onMouseEnter: () => setOpen(it.children ? it.label : null)
    }, /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      onClick: e => {
        e.preventDefault();
        if (!it.children) onNavigate && onNavigate(it.href);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-medium)',
        color: active ? 'var(--tu-navy-600)' : 'var(--tu-grey-600)',
        background: open === it.label ? 'var(--tu-grey-50)' : 'transparent',
        transition: 'var(--transition-control)'
      }
    }, it.label, it.children ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-down",
      size: 15
    }) : null), it.children && open === it.label ? /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: 6,
        minWidth: 268,
        background: '#fff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-popover)',
        padding: 8
      }
    }, it.children.map(c => /*#__PURE__*/React.createElement("a", {
      key: c.label,
      href: c.href || '#',
      onClick: e => {
        e.preventDefault();
        setOpen(null);
        onNavigate && onNavigate(c.href);
      },
      style: {
        display: 'block',
        padding: '9px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--fs-sm)',
        color: 'var(--tu-grey-700)'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--tu-grey-50)';
        e.currentTarget.style.color = 'var(--tu-navy-600)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--tu-grey-700)';
      }
    }, c.label))) : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-grey-500)',
      padding: '0 6px'
    }
  }, locale), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => onNavigate && onNavigate('/login')
  }, "Iniciar sesi\xF3n"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNavigate && onNavigate('/registro')
  }, "Registrarse"))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  style,
  ...rest
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && (items[0].value || items[0])));
  const active = controlled ? value : inner;
  const pick = v => {
    if (!controlled) setInner(v);
    onChange && onChange(v);
  };
  const pill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: pill ? 4 : 2,
      alignItems: 'center',
      padding: pill ? 4 : 0,
      background: pill ? 'var(--tu-grey-100)' : 'transparent',
      borderRadius: pill ? 'var(--radius-pill)' : 0,
      borderBottom: pill ? 'none' : '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), items.map(it => {
    const v = it.value || it;
    const label = it.label || it;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(v),
      style: {
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-sm)',
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        padding: pill ? '7px 16px' : '10px 14px',
        borderRadius: pill ? 'var(--radius-pill)' : 0,
        background: pill ? on ? '#fff' : 'transparent' : 'transparent',
        boxShadow: pill && on ? 'var(--shadow-xs)' : 'none',
        color: on ? 'var(--tu-navy-600)' : 'var(--tu-grey-500)',
        borderBottom: pill ? 'none' : '2px solid ' + (on ? 'var(--tu-cyan-500)' : 'transparent'),
        marginBottom: pill ? 0 : -1,
        transition: 'var(--transition-control)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/CalloutCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  navy: 'var(--tu-navy-600)',
  violet: 'var(--tu-violet-500)',
  cyan: 'var(--tu-cyan-500)'
};
function CalloutCard({
  title,
  children,
  tone = 'navy',
  shape = 'card',
  style,
  ...rest
}) {
  const c = TONES[tone] || TONES.navy;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: '2px solid ' + c,
      borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-2xl)',
      padding: shape === 'pill' ? '10px 22px' : 'var(--space-6) var(--space-7)',
      background: 'transparent',
      boxShadow: 'none',
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tight)',
      color: c,
      marginBottom: children ? 10 : 0
    }
  }, title) : null, children);
}
Object.assign(__ds_scope, { CalloutCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/CalloutCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  padding = 'md',
  interactive = false,
  selected = false,
  accent = 'navy',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const pad = padding === 'lg' ? 'var(--card-padding-lg)' : padding === 'sm' ? 'var(--space-4)' : 'var(--card-padding)';
  const accents = {
    navy: 'var(--tu-navy-600)',
    cyan: 'var(--tu-cyan-500)',
    violet: 'var(--tu-violet-500)',
    success: 'var(--tu-success)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: selected ? '2px solid ' + (accents[accent] || accents.navy) : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: pad,
      boxShadow: interactive && hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: interactive && hover ? 'translateY(var(--lift-hover))' : 'none',
      transition: 'var(--transition-card)',
      cursor: interactive ? 'pointer' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/PricingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PricingCard({
  name,
  audience,
  price,
  period,
  description,
  features = [],
  cta,
  ctaVariant,
  featured = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: 'var(--radius-card-lg)',
      border: featured ? '2px solid var(--tu-navy-600)' : '1px solid var(--border-subtle)',
      boxShadow: featured ? 'var(--shadow-md)' : 'var(--shadow-card)',
      padding: 'var(--card-padding-lg)',
      ...style
    }
  }, rest), featured ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -12,
      left: 'var(--card-padding-lg)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand"
  }, "M\xE1s popular")) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)',
      margin: 0
    }
  }, name), audience ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: featured ? 'info' : 'neutral',
    size: "sm"
  }, audience)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tighter)',
      color: 'var(--tu-navy-600)'
    }
  }, price), period ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, period) : null), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.55
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--tu-grey-100)',
      margin: '20px 0'
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      flex: 1
    }
  }, features.map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'flex-start',
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-700)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    color: "var(--tu-cyan-500)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, t)))), cta ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: ctaVariant || (featured ? 'primary' : 'secondary'),
    fullWidth: true
  }, cta)) : null);
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  maxWidth = 660,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      maxWidth,
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--tu-cyan-600)',
      marginBottom: 12
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-3xl)',
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 'var(--fs-md)',
      lineHeight: 1.6,
      color: 'var(--tu-grey-600)'
    }
  }, description) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
const {
  Logo,
  Button,
  Badge,
  Icon
} = window.TeamUpDesignSystem_ce2fab;
const SIDE = [['layout-dashboard', 'Inicio'], ['briefcase', 'Vacantes'], ['users', 'Candidatos'], ['kanban', 'Pipeline'], ['database', 'Banco de talento'], ['bar-chart-3', 'Reportes'], ['settings', 'Ajustes']];
function AppShell({
  active,
  onNavigate,
  title,
  count,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--tu-grey-50)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 232,
      flex: '0 0 auto',
      background: '#fff',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 14px'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 24,
    basePath: "../.."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, SIDE.map(([ic, label]) => {
    const on = label === active;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => onNavigate && onNavigate(label),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 11px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        background: on ? 'var(--tu-navy-50)' : 'transparent',
        color: on ? 'var(--tu-navy-600)' : 'var(--tu-grey-600)',
        fontSize: 'var(--fs-sm)',
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        textAlign: 'left',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 18
    }), label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--tu-violet-100)',
      background: 'var(--tu-violet-50)',
      borderRadius: 'var(--radius-lg)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      color: 'var(--tu-violet-600)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 16
  }), "Plan Pro"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.55
    }
  }, "Evaluaci\xF3n masiva con IA activa. 38 de 50 vacantes en uso.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 20px',
      height: 58,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--tu-navy-600)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 'var(--fw-bold)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "TU"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--tu-navy-600)',
      letterSpacing: 'var(--ls-tight)'
    }
  }, title), count ? /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    size: "sm"
  }, count) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ai",
    size: "sm",
    icon: "sparkles"
  }, "Evaluar con IA"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 999,
      background: 'var(--tu-grey-100)',
      color: 'var(--tu-grey-600)',
      fontSize: 11,
      fontWeight: 'var(--fw-semibold)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "JD")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, children)));
}
Object.assign(window, {
  AppShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CandidatesScreen.jsx
try { (() => {
const {
  Badge,
  Button,
  Icon,
  Input,
  ScoreRing,
  MeterBar,
  Card
} = window.TeamUpDesignSystem_ce2fab;
const TONE = {
  'Nuevo': 'info',
  'En proceso': 'warning',
  'Contratado': 'success',
  'Descartado': 'danger'
};
function CandidatesScreen({
  selectedId,
  onSelect
}) {
  const list = window.TU_CANDIDATES;
  const [q, setQ] = React.useState('');
  const shown = list.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.role.toLowerCase().includes(q.toLowerCase()));
  const c = list.find(x => x.id === selectedId) || list[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px,420px) minmax(0,1fr)',
      height: '100%',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar candidatos...",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 52px',
      gap: 12,
      padding: '0 16px 8px',
      fontSize: 'var(--fs-3xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--tu-grey-400)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Candidato"), /*#__PURE__*/React.createElement("span", null, "Estado"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Score")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      flex: 1
    }
  }, shown.map(row => {
    const on = row.id === c.id;
    return /*#__PURE__*/React.createElement("button", {
      key: row.id,
      onClick: () => onSelect(row.id),
      style: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr auto 52px',
        alignItems: 'center',
        gap: 12,
        padding: '13px 16px',
        border: 'none',
        borderBottom: '1px solid var(--tu-grey-100)',
        borderLeft: '3px solid ' + (on ? 'var(--tu-cyan-500)' : 'transparent'),
        background: on ? 'var(--tu-grey-50)' : '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flex: '0 0 auto',
        borderRadius: 999,
        background: 'var(--tu-cyan-50)',
        color: 'var(--tu-cyan-700)',
        fontSize: 12,
        fontWeight: 'var(--fw-semibold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, row.initials), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--tu-navy-600)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, row.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--fs-xs)',
        color: 'var(--tu-grey-500)'
      }
    }, row.role))), /*#__PURE__*/React.createElement(Badge, {
      tone: TONE[row.status],
      size: "sm"
    }, row.status), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: 'right',
        fontSize: 'var(--fs-md)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--tu-navy-600)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, row.score));
  }), shown.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      padding: 20,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, "Sin resultados para \u201C", q, "\u201D.") : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      padding: '20px 24px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 58,
      height: 58,
      flex: '0 0 auto',
      borderRadius: 999,
      background: 'var(--tu-cyan-50)',
      color: 'var(--tu-cyan-700)',
      fontSize: 17,
      fontWeight: 'var(--fw-semibold)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, c.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-xl)'
    }
  }, c.name), /*#__PURE__*/React.createElement(Badge, {
    tone: TONE[c.status],
    size: "sm"
  }, c.status)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 4,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, c.email, " \xB7 ", c.city), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 2,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, c.role, " \xB7 ", c.exp)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "calendar"
  }, "Agendar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "check"
  }, "Avanzar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      paddingBottom: 22,
      borderBottom: '1px solid var(--tu-grey-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    key: c.id,
    value: c.score
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-violet-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14
  }), "Deep Insights")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, c.meters.map(([l, v]) => /*#__PURE__*/React.createElement(MeterBar, {
    key: l,
    label: l,
    value: v
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      background: 'var(--tu-cyan-50)',
      border: '1px solid var(--tu-info-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-cyan-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain",
    size: 17
  }), "An\xE1lisis IA"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.6,
      color: 'var(--tu-grey-700)'
    }
  }, c.analysis)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 17,
    color: "var(--tu-violet-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--tu-violet-600)'
    }
  }, "Deep Insights"), /*#__PURE__*/React.createElement(Badge, {
    tone: "ai",
    size: "sm",
    uppercase: true
  }, "Beta")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--tu-grey-500)'
    }
  }, "Patrones detectados"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '10px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, c.patterns.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-700)',
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--tu-violet-500)',
      flex: '0 0 auto',
      marginTop: 7
    }
  }), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--tu-grey-500)'
    }
  }, "\xC1ngulos de entrevista"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '10px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, c.angles.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-700)',
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "var(--tu-cyan-500)",
    style: {
      marginTop: 3
    }
  }), t))))));
}
Object.assign(window, {
  CandidatesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CandidatesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PipelineScreen.jsx
try { (() => {
const {
  Badge,
  Icon,
  Button
} = window.TeamUpDesignSystem_ce2fab;
function PipelineScreen({
  onSelect
}) {
  const byId = Object.fromEntries(window.TU_CANDIDATES.map(c => [c.id, c]));
  const [cols, setCols] = React.useState(window.TU_PIPELINE);
  const move = (fromIdx, id) => {
    const to = Math.min(fromIdx + 1, cols.length - 1);
    if (to === fromIdx) return;
    setCols(cols.map((c, i) => i === fromIdx ? {
      ...c,
      ids: c.ids.filter(x => x !== id)
    } : i === to ? {
      ...c,
      ids: [...c.ids, id]
    } : c));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      height: '100%',
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,minmax(250px,1fr))',
      gap: 16,
      alignItems: 'start'
    }
  }, cols.map((col, i) => /*#__PURE__*/React.createElement("div", {
    key: col.stage,
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: col.tone,
    size: "sm"
  }, col.stage), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-400)'
    }
  }, col.ids.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minHeight: 80
    }
  }, col.ids.map(id => {
    const c = byId[id];
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      style: {
        border: '1px solid var(--tu-grey-200)',
        borderRadius: 'var(--radius-md)',
        padding: 12,
        background: '#fff',
        boxShadow: 'var(--shadow-xs)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 999,
        background: 'var(--tu-cyan-50)',
        color: 'var(--tu-cyan-700)',
        fontSize: 11,
        fontWeight: 'var(--fw-semibold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, c.initials), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--tu-navy-600)'
      }
    }, c.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--fs-xs)',
        color: 'var(--tu-grey-500)'
      }
    }, c.role)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 'var(--fw-bold)',
        color: 'var(--tu-cyan-600)'
      }
    }, c.score)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => onSelect && onSelect(id)
    }, "Ver perfil"), i < cols.length - 1 ? /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconRight: "arrow-right",
      onClick: () => move(i, id)
    }, "Avanzar") : null));
  }), col.ids.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--tu-grey-400)',
      padding: '14px 4px'
    }
  }, "Sin candidatos en esta etapa.") : null)))));
}
Object.assign(window, {
  PipelineScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PipelineScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
window.TU_CANDIDATES = [{
  id: 'mg',
  initials: 'MG',
  name: 'María García',
  role: 'Gerente de Operaciones',
  status: 'En proceso',
  score: 94,
  email: 'maria.garcia@email.com',
  city: 'CDMX, México',
  exp: '8 años exp.',
  meters: [['Compatibilidad con puesto', 92], ['Expectativa salarial', 88], ['Disponibilidad geográfica', 100]],
  analysis: 'Perfil altamente compatible. Experiencia en operaciones complejas, liderazgo probado y alineación salarial dentro del rango. Recomendación: priorizar entrevista.',
  patterns: ['Historial de liderazgo en equipos de +15 personas en entornos de alta presión operativa.', 'Transición profesional deliberada hacia roles estratégicos con fundamento técnico sólido.'],
  angles: ['¿Cómo gestionó el cambio cultural en la última transición organizacional?', '¿Qué métricas usó para medir el impacto de sus decisiones operativas?']
}, {
  id: 'cm',
  initials: 'CM',
  name: 'Carlos Mendoza',
  role: 'Coordinador Logístico',
  status: 'Nuevo',
  score: 87,
  email: 'carlos.mendoza@email.com',
  city: 'Monterrey, NL',
  exp: '6 años exp.',
  meters: [['Compatibilidad con puesto', 85], ['Expectativa salarial', 91], ['Disponibilidad geográfica', 100]],
  analysis: 'Fuerte en ejecución de última milla y control de inventarios. Menor exposición a liderazgo de equipos grandes; validar en entrevista.',
  patterns: ['Crecimiento continuo dentro de una misma operación durante 4 años.', 'Experiencia directa con WMS y planeación de rutas.'],
  angles: ['¿Cómo redujo el costo por entrega en su operación actual?', '¿Qué tamaño de equipo ha coordinado directamente?']
}, {
  id: 'at',
  initials: 'AT',
  name: 'Ana Torres',
  role: 'Analista de Datos',
  status: 'Nuevo',
  score: 82,
  email: 'ana.torres@email.com',
  city: 'Guadalajara, JAL',
  exp: '5 años exp.',
  meters: [['Compatibilidad con puesto', 80], ['Expectativa salarial', 84], ['Disponibilidad geográfica', 70]],
  analysis: 'Perfil técnico sólido con buen dominio de SQL y visualización. Requiere reubicación; confirmar disponibilidad.',
  patterns: ['Proyectos de tablero operativo con impacto medible en tiempos de ciclo.'],
  angles: ['¿Qué decisión operativa cambió a partir de un análisis suyo?']
}, {
  id: 'rs',
  initials: 'RS',
  name: 'Roberto Silva',
  role: 'Supervisor de Planta',
  status: 'En proceso',
  score: 76,
  email: 'roberto.silva@email.com',
  city: 'Saltillo, COAH',
  exp: '11 años exp.',
  meters: [['Compatibilidad con puesto', 74], ['Expectativa salarial', 79], ['Disponibilidad geográfica', 100]],
  analysis: 'Amplia experiencia en piso, menor exposición a indicadores y reporteo. Buen encaje si la vacante prioriza operación sobre analítica.',
  patterns: ['Estabilidad alta: dos empleadores en once años.'],
  angles: ['¿Cómo maneja el ausentismo en turnos nocturnos?']
}, {
  id: 'lj',
  initials: 'LJ',
  name: 'Laura Jiménez',
  role: 'Especialista RRHH',
  status: 'Nuevo',
  score: 71,
  email: 'laura.jimenez@email.com',
  city: 'CDMX, México',
  exp: '4 años exp.',
  meters: [['Compatibilidad con puesto', 68], ['Expectativa salarial', 82], ['Disponibilidad geográfica', 100]],
  analysis: 'Experiencia en reclutamiento de volumen, menor en operaciones. Considerar para vacantes de RRHH antes que operativas.',
  patterns: ['Enfoque en atracción de alto volumen para retail.'],
  angles: ['¿Qué fuentes de atracción le han dado mejor conversión?']
}];
window.TU_PIPELINE = [{
  stage: 'Nuevo',
  tone: 'info',
  ids: ['lj', 'at']
}, {
  stage: 'Entrevista',
  tone: 'warning',
  ids: ['cm', 'rs']
}, {
  stage: 'Oferta',
  tone: 'ai',
  ids: []
}, {
  stage: 'Contratado',
  tone: 'success',
  ids: ['mg']
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Icon,
  SectionHeading,
  StatBlock,
  MeterBar,
  Input,
  Textarea
} = window.TeamUpDesignSystem_ce2fab;
const SERVICES = [['Reclutamiento operativo', 'Personal para planta, tienda, logística y operaciones con alta rotación. Volumen y velocidad sin sacrificar calidad.'], ['Reclutamiento TI', 'Desarrolladores, ingenieros y perfiles digitales evaluados técnicamente antes de llegar a tu mesa.'], ['Headhunting ejecutivo', 'Búsqueda directa y confidencial de mandos medios, gerencias y direcciones.'], ['Reclutamiento especializado', 'Perfiles técnicos y de nicho: ingenierías, ventas B2B, salud y posiciones difíciles de cubrir.'], ['Consultoría de RRHH', 'Gestión de talento, diseño organizacional, compensaciones y desarrollo de equipos.'], ['Plataforma TeamUp', '¿Prefieres reclutar tú mismo? Usa la misma tecnología con IA que usa nuestro equipo.']];
const AI_FEATURES = [['search-check', 'Screening con IA', 'Cada postulante se evalúa contra los criterios de la vacante en minutos, con un score de 0 a 100 y justificación clara.'], ['sliders-horizontal', 'Criterios inteligentes por vacante', 'La IA convierte el perfil del puesto en criterios medibles y ponderados, para que cada evaluación sea consistente.'], ['scan-search', 'Identificación de skills', 'Detectamos habilidades reales en el CV y el historial laboral, no solo coincidencias de palabras clave.'], ['database', 'Banco de talento evaluado', 'Cada búsqueda alimenta un banco de candidatos ya evaluados, listo para acelerar tu siguiente vacante.']];
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      paddingTop: 72,
      paddingBottom: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr)',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-4xl)',
      lineHeight: 1.08
    }
  }, "Tu agencia de reclutamiento y ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--tu-cyan-500)'
    }
  }, "headhunting"), " en M\xE9xico"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: 'var(--fs-md)',
      lineHeight: 1.65,
      color: 'var(--tu-grey-600)',
      maxWidth: 520
    }
  }, "Reclutamiento y selecci\xF3n de personal operativo, TI y especializado. Nuestro equipo gestiona el proceso completo, respaldado por tecnolog\xEDa propia con IA."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('/#contacto')
  }, "Agenda una llamada"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('/servicio')
  }, "Nuestros servicios")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16,
    color: "var(--tu-cyan-500)"
  }), "Respuesta en menos de 24 h h\xE1biles")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--tu-grey-200)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/app-candidatos.png",
    alt: "Plataforma TeamUp",
    style: {
      width: '100%',
      display: 'block'
    }
  })))), /*#__PURE__*/React.createElement(Section, {
    tone: "subtle",
    id: "servicios"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Servicios de reclutamiento y headhunting",
    description: "Del piso de planta a la direcci\xF3n general: encontramos, evaluamos y entregamos a las personas correctas para cada posici\xF3n."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, SERVICES.map(([t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    interactive: true,
    padding: "lg",
    onClick: () => go('/servicio'),
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.6,
      color: 'var(--tu-grey-600)',
      flex: 1
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 18,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-cyan-600)'
    }
  }, "Conocer el servicio \u2192"))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "AI-Driven Recruitment",
    title: "Una agencia impulsada por inteligencia artificial",
    description: "No sustituimos reclutadores con IA: los potenciamos. Nuestra tecnolog\xEDa propia eval\xFAa a cada candidato con criterio, para que las decisiones se tomen con datos y no con corazonadas.",
    maxWidth: 720
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, AI_FEATURES.map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "lg",
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-md)',
      background: 'var(--tu-violet-50)',
      border: '1px solid var(--tu-violet-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    color: "var(--tu-violet-500)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-md)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 7,
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.6,
      color: 'var(--tu-grey-600)'
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginTop: 12,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-cyan-600)'
    }
  }, "Ver c\xF3mo funciona \u2192"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-11)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-7)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "80%",
    label: "menos tiempo de revisi\xF3n de CVs",
    color: "cyan"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "100%",
    label: "de los postulantes evaluados con IA",
    color: "violet"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "24/7",
    label: "atracci\xF3n y evaluaci\xF3n continua",
    color: "navy"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 420,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/photo-manufactura-bw.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-photo)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-12) var(--gutter-page)',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      maxWidth: 740,
      fontSize: 'var(--fs-3xl)'
    }
  }, "Una agencia de reclutamiento hecha para operaciones reales"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      color: 'rgba(255,255,255,.88)',
      maxWidth: 680,
      fontSize: 'var(--fs-md)',
      lineHeight: 1.65
    }
  }, "Reclutamos para tiendas, f\xE1bricas, gasolineras, equipos de tecnolog\xEDa y posiciones especializadas. No somos una bolsa gen\xE9rica: somos tu equipo de reclutamiento externo."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14
    }
  }, ['Especialistas por vertical', 'Cobertura en todo México', 'Shortlist en 5–10 días hábiles', 'Tecnología propia con IA'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 16px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid rgba(255,255,255,.34)',
      background: 'rgba(255,255,255,.10)',
      color: '#fff',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  }), t))))), /*#__PURE__*/React.createElement(Section, {
    tone: "subtle"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Resultados que puedes medir",
    description: "Contrata mejor, reduce la rotaci\xF3n y cubre posiciones antes de que el negocio lo sienta."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "5 d\xEDas",
    label: "Velocidad de cobertura",
    color: "cyan",
    size: "sm"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.6
    }
  }, "Tiempo promedio para cubrir una vacante operativa con candidatos evaluados por IA."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MeterBar, {
    label: "Con TeamUp",
    value: 28,
    suffix: "",
    showValue: false
  }), /*#__PURE__*/React.createElement(MeterBar, {
    label: "Promedio industria",
    value: 100,
    suffix: "",
    showValue: false,
    color: "var(--tu-grey-300)"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "3.2x",
    label: "Contrata mejor",
    color: "violet",
    size: "sm"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.6
    }
  }, "Mejor compatibilidad candidato-puesto versus revisi\xF3n manual sin criterios objetivos."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MeterBar, {
    label: "Score 90+",
    value: 43
  }), /*#__PURE__*/React.createElement(MeterBar, {
    label: "Score 80\u201389",
    value: 35
  }), /*#__PURE__*/React.createElement(MeterBar, {
    label: "Score 70\u201379",
    value: 22
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "88%",
    label: "Retenci\xF3n en los primeros 90 d\xEDas",
    color: "navy",
    size: "sm"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.6
    }
  }, "Reducci\xF3n de rotaci\xF3n temprana en posiciones cubiertas con candidatos evaluados por IA."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MeterBar, {
    label: "D\xEDa 30",
    value: 94
  }), /*#__PURE__*/React.createElement(MeterBar, {
    label: "D\xEDa 60",
    value: 91
  }), /*#__PURE__*/React.createElement(MeterBar, {
    label: "D\xEDa 90",
    value: 88
  }))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-xl)'
    }
  }, "Reclutamiento de personal operativo por sector"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)'
    }
  }, "Adaptamos el reclutamiento a la operaci\xF3n de cada industria con alta rotaci\xF3n."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, ['Manufactura', 'Logística', 'Retail', 'Healthcare', 'Ver todos los sectores'].map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral",
    size: "md"
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-xl)'
    }
  }, "Reclutamiento de personal operativo por ciudad"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)'
    }
  }, "Atrae talento operativo en las principales plazas industriales de M\xE9xico."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, ['Monterrey', 'Guadalajara', 'Querétaro', 'Ciudad de México'].map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral",
    size: "md"
  }, t)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--tu-navy-600)',
      padding: 'var(--section-y) 0'
    },
    id: "contacto"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 'var(--fs-3xl)'
    }
  }, "\xBFListo para cubrir tus vacantes?"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      color: 'rgba(255,255,255,.82)',
      fontSize: 'var(--fs-md)',
      lineHeight: 1.65,
      maxWidth: 520
    }
  }, "Cu\xE9ntanos qu\xE9 posiciones necesitas cubrir y un especialista te propone el plan de reclutamiento en menos de 24 horas h\xE1biles."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 26,
      color: 'rgba(255,255,255,.6)',
      fontSize: 'var(--fs-sm)'
    }
  }, "Consulta inicial gratuita \xB7 Garant\xEDa de reemplazo \xB7 Cobertura en todo M\xE9xico"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mascot/mascot-wave.png",
    alt: "",
    style: {
      height: 170,
      marginTop: 24
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      borderRadius: 'var(--radius-card-lg)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)'
    }
  }, "\xBFHablamos?"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)'
    }
  }, "Cu\xE9ntanos sobre tu operaci\xF3n y un especialista te contacta en menos de 24 horas h\xE1biles."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Nombre",
    placeholder: "Mar\xEDa Garc\xEDa"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Correo",
    placeholder: "maria@empresa.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Empresa",
    placeholder: "Empaques del Norte"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Tel\xE9fono",
    placeholder: "81 1234 5678"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    label: "Mensaje",
    rows: 3,
    placeholder: "Necesitamos cubrir 20 posiciones de almac\xE9n en Apodaca."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg"
  }, "Enviar mensaje"))))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PricingScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Card,
  Badge,
  Icon,
  PricingCard,
  SectionHeading,
  Tabs
} = window.TeamUpDesignSystem_ce2fab;
const PLANS = [{
  name: 'Free',
  price: 'Gratis',
  description: 'Para empezar a organizar tu reclutamiento sin costo.',
  features: ['Bolsa de empleo propia', 'Gestión de posiciones', 'Hasta 10 vacantes activas', 'Postulaciones ilimitadas', 'Perfil de empresa público'],
  cta: 'Inicia gratis'
}, {
  name: 'Pro',
  price: '$999',
  period: '/mes MXN',
  featured: true,
  description: 'Todo lo que necesitas para reclutar con inteligencia artificial.',
  features: ['Todo lo de Free', 'Hasta 50 vacantes activas', 'Evaluación masiva con IA', 'AI Score por candidato', 'Deep Insights (patrones + entrevista)', 'Análisis global de candidatos', 'Soporte prioritario'],
  cta: 'Inicia gratis 14 días'
}, {
  name: 'Enterprise',
  price: 'A medida',
  description: 'Para operaciones con alto volumen, múltiples ubicaciones o integraciones.',
  features: ['Todo lo de Pro', 'Vacantes ilimitadas', 'Múltiples workspaces', 'Integraciones a medida', 'SLA garantizado', 'Onboarding dedicado', 'Gerente de cuenta'],
  cta: 'Contáctanos'
}];
const BOOSTS = [['Boost Básico', '$1,999', 'Visibilidad estándar en plataformas digitales. Ideal para posiciones de nivel inicial o alto volumen.', false], ['Boost Pro', '$5,999', 'Publicidad dirigida con targeting avanzado. Mayor visibilidad en canales premium y prioridad en búsqueda.', true], ['Boost Scale', '$9,999', 'Máxima exposición con targeting de precisión. Alcance a perfiles ejecutivos y especializados.', false]];
function PricingScreen({
  go
}) {
  const [period, setPeriod] = React.useState('Mensual');
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 80,
      paddingBottom: 'var(--space-9)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--fs-4xl)'
    }
  }, "Planes para cada operaci\xF3n"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-md)',
      color: 'var(--tu-grey-600)'
    }
  }, "Empieza gratis y escala cuando lo necesites. Sin contrato, sin sorpresas."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: ['Mensual', 'Anual'],
    value: period,
    onChange: setPeriod
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)',
      alignItems: 'stretch'
    }
  }, PLANS.map(p => /*#__PURE__*/React.createElement(PricingCard, _extends({
    key: p.name
  }, p, {
    price: period === 'Anual' && p.name === 'Pro' ? '$799' : p.price,
    period: period === 'Anual' && p.name === 'Pro' ? '/mes MXN · anual' : p.period
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      marginTop: 28,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, "Sin tarjeta de cr\xE9dito \xB7 Cancelaci\xF3n en cualquier momento \xB7 Soporte incluido")), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--tu-grey-50)',
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Boost de candidatos",
    title: "Cuando necesitas candidatos ya",
    description: "Los Boosts anuncian tus vacantes en redes sociales con segmentaci\xF3n precisa. M\xE1s candidatos, mejor perfil, en d\xEDas."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, BOOSTS.map(([n, p, d, rec]) => /*#__PURE__*/React.createElement(Card, {
    key: n,
    padding: "lg",
    selected: rec,
    accent: "cyan",
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, rec ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -12,
      left: 24
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "Recomendado")) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-lg)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tighter)',
      color: 'var(--tu-navy-600)'
    }
  }, p), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-500)'
    }
  }, "MXN por mes")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-grey-600)',
      lineHeight: 1.6,
      flex: 1
    }
  }, d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: rec ? 'cyan' : 'secondary',
    fullWidth: true
  }, "Ver detalles"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
    },
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, "Ver todo sobre los Boosts \u2192")))));
}
Object.assign(window, {
  PricingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PricingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServiceScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  Icon,
  SectionHeading,
  CalloutCard,
  StatBlock
} = window.TeamUpDesignSystem_ce2fab;
const STEPS = [['Perfil y criterios', 'Levantamos el perfil con tu equipo y la IA lo convierte en criterios medibles y ponderados.'], ['Atracción', 'Publicación en TeamUp.mx, multiposting y Boost en redes sociales con segmentación por plaza.'], ['Screening con IA', 'Cada postulante recibe un AI Score de 0 a 100 con justificación y Deep Insights.'], ['Shortlist y entrevistas', 'Entregamos la shortlist en 5–10 días hábiles con scorecards listos para tu decisión.'], ['Oferta e incorporación', 'Carta oferta digital, background check y seguimiento de los primeros 90 días.']];
function ServiceScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingTop: 72,
      paddingBottom: 'var(--space-11)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "info",
    size: "sm",
    uppercase: true
  }, "Servicio"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 14,
      fontSize: 'var(--fs-4xl)',
      lineHeight: 1.08
    }
  }, "Reclutamiento operativo"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: 'var(--fs-md)',
      lineHeight: 1.65,
      color: 'var(--tu-grey-600)',
      maxWidth: 520
    }
  }, "Personal para planta, tienda, log\xEDstica y operaciones con alta rotaci\xF3n. Volumen y velocidad sin sacrificar calidad."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go('/#contacto')
  }, "Agenda una llamada"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('/precios')
  }, "Ver precios"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-media)',
      overflow: 'hidden',
      height: 340
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/photo-manufactura-bw.png",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-protect-bottom)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 22,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xl)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Manufactura \xB7 Log\xEDstica \xB7 Retail"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--tu-grey-50)',
      padding: 'var(--section-y-compact) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "5",
    label: "D\xEDas de time to hire",
    color: "violet",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3.2x",
    label: "Mejor atracci\xF3n",
    color: "cyan",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "68%",
    label: "Retenci\xF3n a 90 d\xEDas",
    color: "navy",
    size: "sm"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "80%",
    label: "Menos costo de contrataci\xF3n",
    color: "blue",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--section-y) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "As\xED reclutamos: proceso completo con IA",
    description: "El mismo proceso que ejecuta nuestro equipo de reclutadores, sobre nuestra plataforma con inteligencia artificial."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
      gap: 'var(--space-4)'
    }
  }, STEPS.map(([t, d], i) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "md",
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 999,
      background: 'var(--tu-navy-600)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-bold)'
    }
  }, i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 14,
      fontSize: 'var(--fs-base)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 'var(--fs-xs)',
      lineHeight: 1.6,
      color: 'var(--tu-grey-600)'
    }
  }, d)))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28,
      textAlign: 'center',
      fontSize: 'var(--fs-md)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--tu-navy-600)'
    }
  }, "Menos ruido. M\xE1s control. Mejores decisiones."))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: 'var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 'var(--space-9)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(CalloutCard, {
    tone: "navy",
    title: "Qu\xE9 incluye"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px 24px',
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-navy-600)',
      fontWeight: 'var(--fw-medium)'
    }
  }, ['Estrategia basada en competencias', 'EVP y mensajes clave', 'Sourcing especializado', 'Analítica de contratación', 'Background checks', 'Garantía de reemplazo'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, "\u25CF ", t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(CalloutCard, {
    tone: "violet",
    shape: "pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-navy-600)'
    }
  }, /*#__PURE__*/React.createElement("b", null, "100 CVs"), " analizados en 4 minutos")), /*#__PURE__*/React.createElement(CalloutCard, {
    tone: "violet",
    shape: "pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-navy-600)'
    }
  }, /*#__PURE__*/React.createElement("b", null, "+500"), " background checks")), /*#__PURE__*/React.createElement(CalloutCard, {
    tone: "violet",
    shape: "pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--tu-navy-600)'
    }
  }, /*#__PURE__*/React.createElement("b", null, "1000"), " horas mensuales ahorradas"))))));
}
Object.assign(window, {
  ServiceScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServiceScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteChrome.jsx
try { (() => {
const {
  NavBar,
  Footer
} = window.TeamUpDesignSystem_ce2fab;
const NAV_ITEMS = [{
  label: 'Inicio',
  href: '/'
}, {
  label: 'Servicios',
  children: [{
    label: 'Reclutamiento Operativo',
    href: '/servicio'
  }, {
    label: 'Reclutamiento TI',
    href: '/servicio'
  }, {
    label: 'Headhunting Ejecutivo',
    href: '/servicio'
  }, {
    label: 'Reclutamiento Especializado',
    href: '/servicio'
  }, {
    label: 'Outsourcing de Reclutamiento',
    href: '/servicio'
  }, {
    label: 'Consultoría de RRHH',
    href: '/servicio'
  }, {
    label: 'Ver todos los servicios',
    href: '/servicio'
  }]
}, {
  label: 'Sectores',
  children: [{
    label: 'Manufactura'
  }, {
    label: 'Logística'
  }, {
    label: 'Retail'
  }, {
    label: 'Healthcare'
  }, {
    label: 'Reclutamiento Monterrey'
  }, {
    label: 'Reclutamiento CDMX'
  }, {
    label: 'Ver todos los sectores'
  }]
}, {
  label: 'Plataforma',
  children: [{
    label: 'Screening con IA'
  }, {
    label: 'Identificación de Skills'
  }, {
    label: 'Pipeline Kanban'
  }, {
    label: 'Entrevistas & Scorecards'
  }, {
    label: 'Carta Oferta Digital'
  }, {
    label: 'Banco de Talento'
  }, {
    label: 'Ver toda la plataforma'
  }]
}, {
  label: 'Precios',
  href: '/precios'
}, {
  label: 'Boost',
  href: '/precios'
}, {
  label: 'Contacto',
  href: '/#contacto'
}];
const FOOTER_COLUMNS = [{
  title: 'Plataforma',
  links: ['Screening AI', 'Identificación de Skills', 'Pipeline Kanban', 'Scorecards', 'Carta Oferta Digital', 'Banco de Talento', 'Ver todo →']
}, {
  title: 'Sectores',
  links: ['Manufactura', 'Logística', 'Retail', 'Healthcare', 'Monterrey', 'Guadalajara', 'Querétaro', 'CDMX', 'Ver todo →']
}, {
  title: 'Servicios',
  links: ['Reclutamiento Operativo', 'Reclutamiento TI', 'Headhunting Ejecutivo', 'Reclutamiento Especializado', 'Nearshoring', 'Ver todo →']
}, {
  title: 'Empresa',
  links: ['Bolsa de trabajo', 'Cómo funciona', 'Precios', 'Recursos', 'Contacto', 'Iniciar sesión']
}];
function SiteHeader({
  go,
  active
}) {
  return /*#__PURE__*/React.createElement(NavBar, {
    items: NAV_ITEMS,
    basePath: "../..",
    activeHref: active,
    onNavigate: go
  });
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement(Footer, {
    basePath: "../..",
    columns: FOOTER_COLUMNS,
    blurb: "Agencia de reclutamiento y headhunting para M\xE9xico, con plataforma propia de IA: screening, pipeline y gesti\xF3n completa del proceso.",
    address: /*#__PURE__*/React.createElement(React.Fragment, null, "Av. L\xE1zaro C\xE1rdenas 2424 Piso 8", /*#__PURE__*/React.createElement("br", null), "San Pedro Garza Garc\xEDa, NL \xB7 M\xE9xico"),
    legal: ['Política de privacidad', 'Términos del servicio', 'Eliminación de datos'],
    copyright: "\xA9 2026 Rhematch SAPI. Todos los derechos reservados."
  });
}
function Section({
  children,
  tone = 'white',
  id,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: tone === 'subtle' ? 'var(--tu-grey-50)' : '#fff',
      padding: 'var(--section-y) 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter-page)'
    }
  }, children));
}
function BrowserFrame({
  url,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--tu-grey-200)',
      boxShadow: 'var(--shadow-lg)',
      background: '#fff',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      background: 'var(--tu-grey-50)',
      borderBottom: '1px solid var(--tu-grey-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['#FF5F57', '#FEBC2E', '#28C840'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 11,
      height: 11,
      borderRadius: 999,
      background: c,
      display: 'block'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      background: '#fff',
      border: '1px solid var(--tu-grey-200)',
      borderRadius: 999,
      padding: '5px 14px',
      fontSize: 12,
      color: 'var(--tu-grey-500)'
    }
  }, url)), children);
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  Section,
  BrowserFrame,
  NAV_ITEMS,
  FOOTER_COLUMNS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteChrome.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.MarkerText = __ds_scope.MarkerText;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.MeterBar = __ds_scope.MeterBar;

__ds_ns.ScoreRing = __ds_scope.ScoreRing;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.CalloutCard = __ds_scope.CalloutCard;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
