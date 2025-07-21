import React from 'react';

// Template interface for Figma-derived components
export interface FigmaComponentProps {
  // Exact dimensions from Figma
  width?: string | number;
  height?: string | number;
  
  // Exact positioning
  position?: 'static' | 'relative' | 'absolute' | 'fixed';
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  
  // Exact spacing
  padding?: string | number;
  margin?: string | number;
  gap?: string | number;
  
  // Exact colors (use hex values from Figma)
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  
  // Typography from Figma
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  fontFamily?: string;
  
  // Border and shadow
  borderRadius?: string | number;
  boxShadow?: string;
  borderWidth?: string | number;
  
  // Flexbox (for auto-layout)
  display?: 'flex' | 'block' | 'inline-block' | 'grid';
  flexDirection?: 'row' | 'column';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  
  // Additional styling
  className?: string;
  children?: React.ReactNode;
}

// Base component that converts Figma props to styles
export const FigmaComponent: React.FC<FigmaComponentProps> = ({
  width,
  height,
  position = 'static',
  top,
  left,
  right,
  bottom,
  padding,
  margin,
  gap,
  backgroundColor,
  color,
  borderColor,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  borderRadius,
  boxShadow,
  borderWidth,
  display = 'block',
  flexDirection,
  alignItems,
  justifyContent,
  className = '',
  children,
}) => {
  const styles: React.CSSProperties = {};
  
  // Convert measurements
  if (width !== undefined) styles.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) styles.height = typeof height === 'number' ? `${height}px` : height;
  
  // Positioning
  styles.position = position;
  if (top !== undefined) styles.top = typeof top === 'number' ? `${top}px` : top;
  if (left !== undefined) styles.left = typeof left === 'number' ? `${left}px` : left;
  if (right !== undefined) styles.right = typeof right === 'number' ? `${right}px` : right;
  if (bottom !== undefined) styles.bottom = typeof bottom === 'number' ? `${bottom}px` : bottom;
  
  // Spacing
  if (padding !== undefined) styles.padding = typeof padding === 'number' ? `${padding}px` : padding;
  if (margin !== undefined) styles.margin = typeof margin === 'number' ? `${margin}px` : margin;
  if (gap !== undefined) styles.gap = typeof gap === 'number' ? `${gap}px` : gap;
  
  // Colors
  if (backgroundColor) styles.backgroundColor = backgroundColor;
  if (color) styles.color = color;
  if (borderColor) styles.borderColor = borderColor;
  
  // Typography
  if (fontSize !== undefined) styles.fontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
  if (fontWeight !== undefined) styles.fontWeight = fontWeight;
  if (lineHeight !== undefined) styles.lineHeight = typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight;
  if (letterSpacing !== undefined) styles.letterSpacing = typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing;
  if (fontFamily) styles.fontFamily = fontFamily;
  
  // Border and shadow
  if (borderRadius !== undefined) styles.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  if (boxShadow) styles.boxShadow = boxShadow;
  if (borderWidth !== undefined) styles.borderWidth = typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth;
  
  // Layout
  styles.display = display;
  if (flexDirection) styles.flexDirection = flexDirection;
  if (alignItems) styles.alignItems = alignItems;
  if (justifyContent) styles.justifyContent = justifyContent;
  
  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};

// Utility function to create components with exact Figma measurements
export const createFigmaComponent = (figmaStyles: FigmaComponentProps) => {
  return ({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: any }) => (
    <FigmaComponent {...figmaStyles} {...props} className={`${figmaStyles.className || ''} ${className || ''}`}>
      {children}
    </FigmaComponent>
  );
};

// Example usage:
// export const HeroContainer = createFigmaComponent({
//   width: 1440,
//   height: 800,
//   backgroundColor: '#FFFFFF',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: 80,
//   gap: 48,
// });

// Type for common Figma measurements
export type FigmaMeasurement = number | string;

// Helper functions for common Figma to CSS conversions
export const figmaHelpers = {
  px: (value: number): string => `${value}px`,
  rem: (value: number): string => `${value / 16}rem`,
  percent: (value: number): string => `${value}%`,
  
  // Convert Figma's auto-layout spacing to CSS gap
  autoLayoutGap: (spacing: number): React.CSSProperties => ({
    display: 'flex',
    gap: `${spacing}px`,
  }),
  
  // Convert Figma's padding to CSS
  figmaPadding: (top: number, right?: number, bottom?: number, left?: number): React.CSSProperties => {
    if (right === undefined) return { padding: `${top}px` };
    if (bottom === undefined) return { padding: `${top}px ${right}px` };
    if (left === undefined) return { padding: `${top}px ${right}px ${bottom}px` };
    return { padding: `${top}px ${right}px ${bottom}px ${left}px` };
  },
  
  // Convert Figma's text styles
  figmaTextStyle: (
    fontSize: number,
    fontWeight: number,
    lineHeight: number,
    letterSpacing: number = 0,
    fontFamily: string = 'Inter'
  ): React.CSSProperties => ({
    fontSize: `${fontSize}px`,
    fontWeight,
    lineHeight: `${lineHeight}px`,
    letterSpacing: letterSpacing === -1 ? '-1px' : `${letterSpacing}em`,
    fontFamily,
  }),
  
  // Convert Figma's shadow to CSS
  figmaShadow: (x: number, y: number, blur: number, spread: number, color: string, opacity: number = 1): string => {
    const rgba = color.includes('#') 
      ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`
      : color;
    return `${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
  },
};

export default FigmaComponent;
