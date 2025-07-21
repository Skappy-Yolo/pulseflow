// Measurement utilities for pixel-perfect implementation
// These utilities help convert Figma measurements to Tailwind classes

export const measurementUtils = {
  // Convert pixels to rem (assuming 16px base)
  pxToRem: (px: number): string => `${px / 16}rem`,
  
  // Convert pixels to Tailwind spacing unit (4px base)
  pxToSpacing: (px: number): number => px / 4,
  
  // Get closest Tailwind spacing value
  getClosestSpacing: (px: number): string => {
    const spacingValue = px / 4;
    const spacingOptions = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
    
    const closest = spacingOptions.reduce((prev, curr) => 
      Math.abs(curr - spacingValue) < Math.abs(prev - spacingValue) ? curr : prev
    );
    
    return closest.toString();
  },
  
  // Convert Figma line height to Tailwind
  lineHeightToTailwind: (fontSize: number, lineHeight: number): string => {
    const ratio = lineHeight / fontSize;
    
    if (ratio <= 1) return 'leading-none';
    if (ratio <= 1.125) return 'leading-tight';
    if (ratio <= 1.25) return 'leading-snug';
    if (ratio <= 1.375) return 'leading-normal';
    if (ratio <= 1.5) return 'leading-relaxed';
    return 'leading-loose';
  },
  
  // Convert letter spacing to Tailwind
  letterSpacingToTailwind: (letterSpacing: number): string => {
    if (letterSpacing === -1) return 'tracking-adjust'; // Your custom class
    if (letterSpacing <= -0.05) return 'tracking-tighter';
    if (letterSpacing <= -0.025) return 'tracking-tight';
    if (letterSpacing === 0) return 'tracking-normal';
    if (letterSpacing <= 0.025) return 'tracking-wide';
    if (letterSpacing <= 0.05) return 'tracking-wider';
    return 'tracking-widest';
  },
  
  // Generate responsive classes
  generateResponsiveClasses: (mobile: string, tablet?: string, desktop?: string): string => {
    let classes = mobile;
    if (tablet) classes += ` md:${tablet}`;
    if (desktop) classes += ` lg:${desktop}`;
    return classes;
  },
  
  // Convert shadow values from Figma
  shadowToTailwind: (_x: number, _y: number, blur: number, _spread: number, _opacity: number): string => {
    if (blur <= 2) return 'shadow-sm';
    if (blur <= 4) return 'shadow';
    if (blur <= 8) return 'shadow-md';
    if (blur <= 16) return 'shadow-lg';
    if (blur <= 24) return 'shadow-xl';
    return 'shadow-2xl';
  },
  
  // Convert border radius from Figma
  borderRadiusToTailwind: (radius: number): string => {
    if (radius === 0) return 'rounded-none';
    if (radius <= 2) return 'rounded-sm';
    if (radius <= 4) return 'rounded';
    if (radius <= 6) return 'rounded-md';
    if (radius <= 8) return 'rounded-lg';
    if (radius <= 12) return 'rounded-xl';
    if (radius <= 16) return 'rounded-2xl';
    if (radius <= 24) return 'rounded-3xl';
    return 'rounded-full';
  }
};

// Figma-specific utilities
export const figmaHelpers = {
  // Extract measurements from Figma CSS exports
  parseFigmaCSS: (cssString: string) => {
    const rules: Record<string, string> = {};
    const regex = /([a-z-]+):\s*([^;]+);/g;
    let match;
    
    while ((match = regex.exec(cssString)) !== null) {
      rules[match[1]] = match[2].trim();
    }
    
    return rules;
  },
  
  // Convert Figma auto-layout to Flexbox classes
  autoLayoutToFlex: (direction: 'horizontal' | 'vertical', spacing: number, alignment: string) => {
    const baseClasses = direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col';
    const gapClass = `gap-${measurementUtils.getClosestSpacing(spacing)}`;
    
    let alignmentClasses = '';
    switch (alignment) {
      case 'center':
        alignmentClasses = 'items-center justify-center';
        break;
      case 'space-between':
        alignmentClasses = 'items-center justify-between';
        break;
      case 'flex-start':
        alignmentClasses = 'items-start justify-start';
        break;
      case 'flex-end':
        alignmentClasses = 'items-end justify-end';
        break;
      default:
        alignmentClasses = 'items-center justify-start';
    }
    
    return `${baseClasses} ${gapClass} ${alignmentClasses}`;
  }
};

export default measurementUtils;
