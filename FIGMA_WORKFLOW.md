# Figma-to-Code Workflow for Pixel-Perfect Implementation

This document outlines the workflow to ensure "what you design is what gets developed" when translating Figma designs to code.

## 🎯 Goal
Achieve pixel-perfect implementation where the final code matches the Figma design exactly in:
- Dimensions and spacing
- Typography
- Colors
- Shadows and borders
- Component behavior
- Responsive breakpoints

## 📋 Pre-Development Checklist

### 1. Figma Design Preparation
- [ ] Ensure all components use consistent design tokens
- [ ] Verify all measurements are in pixels (not mixed units)
- [ ] Check that auto-layout is properly configured
- [ ] Export assets in correct formats and sizes
- [ ] Document any interactive states (hover, focus, active)

### 2. Development Environment Setup
- [ ] Design tokens are configured in `src/tokens/index.ts`
- [ ] Tailwind config includes exact color values from Figma
- [ ] Custom utility classes are defined in `src/styles/figma-utilities.css`
- [ ] Measurement utilities are available in `src/utils/measurements.ts`

## 🔄 Step-by-Step Implementation Process

### Step 1: Extract Design Specifications
For each component, document these exact values from Figma:

```typescript
// Component Specifications Template
interface ComponentSpecs {
  // Container
  width: number;           // e.g., 1440
  height: number;          // e.g., 800
  padding: [number, number, number, number]; // [top, right, bottom, left]
  
  // Layout
  display: 'flex' | 'block' | 'grid';
  flexDirection?: 'row' | 'column';
  gap?: number;            // Auto-layout spacing
  alignItems?: string;
  justifyContent?: string;
  
  // Typography
  fontSize: number;        // e.g., 24
  fontWeight: number;      // e.g., 600
  lineHeight: number;      // e.g., 32
  letterSpacing: number;   // e.g., -1
  fontFamily: string;      // e.g., 'Inter'
  
  // Colors (exact hex values)
  backgroundColor: string; // e.g., '#005CE8'
  textColor: string;       // e.g., '#FFFFFF'
  borderColor?: string;
  
  // Effects
  borderRadius: number;    // e.g., 8
  boxShadow?: string;      // Copy from Figma CSS
  borderWidth?: number;
  
  // Responsive behavior
  breakpoints: {
    mobile: ComponentSpecs;
    tablet?: ComponentSpecs;
    desktop: ComponentSpecs;
  };
}
```

### Step 2: Choose Implementation Method

#### Option A: Pure CSS with Exact Values (Recommended for pixel-perfect)
```tsx
const HeroSection: React.FC = () => {
  return (
    <div style={{
      width: '1440px',
      height: '800px',
      padding: '80px 120px',
      backgroundColor: '#005CE8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '48px',
    }}>
      <h1 style={{
        fontSize: '56px',
        fontWeight: 700,
        lineHeight: '64px',
        letterSpacing: '-1px',
        color: '#FFFFFF',
        fontFamily: 'Inter',
        textAlign: 'center',
        margin: 0,
      }}>
        Your Hero Title
      </h1>
    </div>
  );
};
```

#### Option B: FigmaComponent Wrapper
```tsx
import { createFigmaComponent } from '../components/FigmaComponent';

const HeroContainer = createFigmaComponent({
  width: 1440,
  height: 800,
  padding: '80px 120px',
  backgroundColor: '#005CE8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 48,
});

const HeroTitle = createFigmaComponent({
  fontSize: 56,
  fontWeight: 700,
  lineHeight: 64,
  letterSpacing: -1,
  color: '#FFFFFF',
  fontFamily: 'Inter',
});
```

#### Option C: Custom Utility Classes
```tsx
// Use exact measurement classes
<div className="w-exact-1440 h-exact-800 bg-primary-500 figma-auto-layout-vertical gap-exact-48">
  <h1 className="text-exact-56 font-bold text-white adjustLetterSpacing">
    Your Hero Title
  </h1>
</div>
```

### Step 3: Responsive Implementation
For each breakpoint, create specific measurements:

```typescript
// Mobile (375px)
const mobileSpecs = {
  width: 375,
  height: 600,
  padding: '40px 20px',
  fontSize: 32,
  lineHeight: 40,
  gap: 24,
};

// Desktop (1440px)
const desktopSpecs = {
  width: 1440,
  height: 800,
  padding: '80px 120px',
  fontSize: 56,
  lineHeight: 64,
  gap: 48,
};
```

### Step 4: Validation Checklist
After implementation, verify:

- [ ] **Exact dimensions**: Component matches Figma pixel dimensions
- [ ] **Spacing accuracy**: Padding, margin, and gaps are exact
- [ ] **Typography precision**: Font size, weight, line height, letter spacing match
- [ ] **Color fidelity**: Colors match hex values exactly
- [ ] **Border and shadow accuracy**: Radius and shadow effects are precise
- [ ] **Layout behavior**: Flexbox/grid behavior matches auto-layout
- [ ] **Responsive scaling**: Components adapt correctly at breakpoints
- [ ] **Interactive states**: Hover, focus, active states match design
- [ ] **Asset quality**: Images are sharp and properly sized

## 🛠️ Tools and Resources

### Figma Dev Mode Features
- Use Figma's Dev Mode to copy CSS values directly
- Export assets in multiple formats (SVG, PNG, WebP)
- Get exact measurements for spacing and typography
- Copy color values in hex format

### Browser DevTools
- Use pixel-perfect browser extensions
- Overlay Figma designs on the live site
- Measure actual vs. intended dimensions
- Test responsive behavior

### Custom Utilities
- `src/tokens/index.ts` - Design token definitions
- `src/utils/measurements.ts` - Conversion utilities
- `src/styles/figma-utilities.css` - Exact measurement classes
- `src/components/FigmaComponent.tsx` - Pixel-perfect component wrapper

## 📱 Responsive Strategy

### Breakpoint-Specific Measurements
```typescript
const componentSpecs = {
  mobile: {
    width: 375,
    padding: '20px',
    fontSize: 24,
    gap: 16,
  },
  tablet: {
    width: 768,
    padding: '40px',
    fontSize: 32,
    gap: 24,
  },
  desktop: {
    width: 1440,
    padding: '80px',
    fontSize: 48,
    gap: 32,
  },
};
```

### Implementation
```tsx
<div 
  className="w-full"
  style={{
    padding: '20px',
    fontSize: '24px',
    gap: '16px',
  }}
  // Tablet
  style={{
    '@media (min-width: 768px)': {
      padding: '40px',
      fontSize: '32px',
      gap: '24px',
    }
  }}
  // Desktop
  style={{
    '@media (min-width: 1440px)': {
      padding: '80px',
      fontSize: '48px',
      gap: '32px',
    }
  }}
>
```

## 🎨 Color Management

### Extract Exact Colors from Figma
1. Select element in Figma
2. Copy hex value (e.g., #005CE8)
3. Add to design tokens
4. Use exact value in code

```typescript
// Good - exact hex values
backgroundColor: '#005CE8'
color: '#FFFFFF'
borderColor: '#E5E7EB'

// Avoid - Tailwind approximations that might not match
className="bg-blue-600 text-white border-gray-200"
```

## 🚀 Performance Considerations

### Image Optimization
- Export images at exact dimensions needed
- Use WebP format when possible
- Implement responsive images for different screen densities
- Lazy load images below the fold

### CSS Optimization
- Use CSS custom properties for repeated values
- Minimize inline styles in production
- Consider CSS-in-JS solutions for dynamic styling

## 🔄 Iterative Refinement

### Testing Process
1. **Visual comparison**: Side-by-side with Figma design
2. **Pixel measurement**: Use browser tools to verify dimensions
3. **Cross-browser testing**: Ensure consistency across browsers
4. **Device testing**: Validate on actual devices
5. **Accessibility testing**: Ensure proper contrast and focus states

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Text appears larger/smaller | Check line-height and letter-spacing values |
| Spacing looks off | Verify padding/margin includes border-box sizing |
| Colors don't match | Use exact hex values, check for color profile differences |
| Images appear blurry | Ensure proper image dimensions and pixel density |
| Layout breaks on mobile | Use exact breakpoint measurements from Figma |

## 📝 Documentation Template

For each component, maintain this documentation:

```markdown
## ComponentName

### Figma Specifications
- **Figma URL**: [link to component in Figma]
- **Dimensions**: 400px × 200px
- **Padding**: 24px all sides
- **Typography**: Inter, 16px, 600 weight, 24px line-height
- **Colors**: Background #005CE8, Text #FFFFFF
- **Border Radius**: 8px
- **Shadow**: 0px 4px 12px rgba(0, 0, 0, 0.1)

### Implementation Notes
- Uses exact pixel values for mobile/desktop
- Responsive breakpoints at 768px and 1440px
- Hover state changes background to #0049B8

### Validation Checklist
- [ ] Exact dimensions match Figma
- [ ] Typography specifications match
- [ ] Colors match hex values
- [ ] Interactive states work correctly
```

By following this workflow, you'll achieve pixel-perfect implementation that matches your Figma designs exactly.
