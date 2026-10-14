import { createElement, useState, type CSSProperties, type MouseEvent, type HTMLAttributes, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

type Tag = 'div' | 'button' | 'a' | 'span';

type HoverProps = (HTMLAttributes<HTMLElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>) & {
  as?: Tag;
  style?: CSSProperties;
  /** Styles merged in while the pointer is over the element. */
  hover?: CSSProperties;
  /** Styles merged in while the element is pressed. */
  active?: CSSProperties;
};

/**
 * Element with hover / pressed style overrides — the prototype's
 * `style-hover` / `style-active` attributes, as a React component.
 */
export function H({ as = 'div', style, hover, active, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, ...rest }: HoverProps) {
  const [over, setOver] = useState(false);
  const [down, setDown] = useState(false);
  const props: Record<string, unknown> = {
    ...rest,
    style: { ...style, ...(over ? hover : null), ...(down ? active : null) },
    onMouseEnter: (e: MouseEvent<HTMLElement>) => { setOver(true); onMouseEnter?.(e); },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => { setOver(false); setDown(false); onMouseLeave?.(e); },
    onMouseDown: (e: MouseEvent<HTMLElement>) => { if (active) setDown(true); onMouseDown?.(e); },
    onMouseUp: (e: MouseEvent<HTMLElement>) => { setDown(false); onMouseUp?.(e); },
  };
  if (as === 'button' && !('type' in rest)) props.type = 'button';
  return createElement(as, props);
}
