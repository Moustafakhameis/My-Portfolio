import React, { useCallback, useMemo, memo, ReactNode } from 'react';
import './LogoLoop.css';

export interface LogoItemNode {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
}

export interface LogoItemImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  title?: string;
  href?: string;
}

export type LogoItem = LogoItemNode | LogoItemImage;

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toCssLength = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed, // Note: Pure CSS implementation uses animation-play-state instead of hoverSpeed
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }: LogoLoopProps) => {
    const isVertical = direction === 'up' || direction === 'down';

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        // Calculate a reasonable CSS animation duration from the speed prop
        '--logoloop-duration': `${2000 / Math.abs(speed || 1)}s`,
        '--logoloop-direction': direction === 'left' ? 'normal' : direction === 'right' ? 'reverse' : direction === 'up' ? 'normal' : 'reverse',
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      } as React.CSSProperties),
      [gap, logoHeight, fadeOutColor, speed, direction]
    );

    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          pauseOnHover !== false && 'logoloop--pause-hover', // default to pause if undefined or true
          className
        ]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, scaleOnHover, pauseOnHover, className]
    );

    const renderLogoItem = useCallback(
      (item: LogoItem, key: string) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }
        const isNodeItem = 'node' in item;
        const content = isNodeItem ? (
          <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );
        const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : ((item as LogoItemImage).alt ?? item.title);
        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {itemContent}
          </li>
        );
      },
      [renderItem]
    );

    const containerStyle = useMemo(
      () => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    );

    return (
      <div className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
        <div className="logoloop__track">
          {/* Render exactly 2 copies for pure CSS infinite marquee */}
          <ul className="logoloop__list" role="list">
            {logos.map((item, itemIndex) => renderLogoItem(item, `copy-0-${itemIndex}`))}
          </ul>
          <ul className="logoloop__list" role="list" aria-hidden="true">
            {logos.map((item, itemIndex) => renderLogoItem(item, `copy-1-${itemIndex}`))}
          </ul>
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
