<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# PulseFlow Landing Page Development Instructions

## Project Overview
This is a React TypeScript project using Vite and Tailwind CSS for the PulseFlow SaaS landing page. The design is based on Figma mockups and follows a component-based architecture for easy development and maintenance.

## Development Guidelines

### Component Structure
- Create reusable components for each major section (Hero, Features, Testimonials, etc.)
- Use TypeScript interfaces for all props
- Follow a modular approach for maintainability
- Implement responsive design using Tailwind CSS

### Styling Guidelines
- Use Tailwind CSS utility classes for styling
- Custom colors are defined in tailwind.config.js:
  - Primary: #005CE8
  - Gray: #191B1C  
  - Brand Green: #017737
  - Success: #0FAF62
  - Danger: #E84646
  - Blue Primary: #1361f5
- Use Inter and Public Sans fonts (already imported)
- Follow the adjustLetterSpacing class for text with -1px letter spacing

### Image Handling
- Image assets are served from localhost:3845 (mock server for development)
- Store image constants in a separate assets file
- Use TypeScript for type safety

### Code Quality
- Write clean, maintainable TypeScript code
- Use semantic HTML elements
- Implement proper accessibility attributes
- Add loading states and error handling where appropriate
- Follow React best practices and hooks

### Multi-Agent Development
- Each major section should be developed as a separate component
- Components should be self-contained and reusable
- Use clear interfaces and prop typing for component communication
- Implement proper error boundaries
