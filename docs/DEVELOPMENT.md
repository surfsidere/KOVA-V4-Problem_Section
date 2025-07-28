# 💻 KOVA Development Guide

> **Best practices, workflows, and guidelines for contributing to the KOVA component library**

---

## 📋 Table of Contents

1. [Development Setup](#-development-setup)
2. [Code Quality Standards](#-code-quality-standards)
3. [Performance Guidelines](#-performance-guidelines)
4. [Accessibility Standards](#-accessibility-standards)
5. [Testing Procedures](#-testing-procedures)
6. [Security Practices](#-security-practices)
7. [Git Workflow](#-git-workflow)
8. [Deployment Process](#-deployment-process)

---

## 🚀 Development Setup

### **Prerequisites**

```bash
# Required versions
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.30.0
```

### **Local Development**

```bash
# Clone the repository
git clone https://github.com/surfsidere/KOVA-V4-Problem_Section.git
cd KOVA-V4-Problem_Section

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:9002
```

### **Environment Configuration**

```bash
# .env.local (create this file)
NEXT_PUBLIC_APP_URL=http://localhost:9002
NEXT_PUBLIC_API_URL=https://api.kova.dev
NODE_ENV=development
```

### **IDE Setup**

**Recommended VS Code Extensions:**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

**VS Code Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

---

## 🔍 Code Quality Standards

### **TypeScript Guidelines**

**Strict Configuration:**
```typescript
// tsconfig.json requirements
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Type Safety Patterns:**

```typescript
// ✅ Good: Explicit generic constraints
export function useDebounce<T extends (...args: readonly unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  // Implementation
}

// ❌ Bad: Any types
export function useDebounce(callback: any, delay: number): any {
  // Implementation
}

// ✅ Good: Discriminated unions
type ToggleState = 'instituciones' | 'aliados' | null;

// ✅ Good: Branded types for type safety
type AnimationDuration = number & { readonly brand: unique symbol };
```

### **Component Architecture**

**File Structure:**
```
src/components/
├── ui/                 # Reusable UI components
├── sections/           # Page sections
├── shared/             # Shared components
└── providers/          # Context providers
```

**Component Template:**
```typescript
// src/components/ui/example-component.tsx
"use client";

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ExampleComponentProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ExampleComponent = forwardRef<
  HTMLDivElement, 
  ExampleComponentProps
>(({ title, description, className, children, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={cn("base-styles", className)}
      {...props}
    >
      <h2 className="font-bold">{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
});

ExampleComponent.displayName = "ExampleComponent";
```

### **Naming Conventions**

```typescript
// ✅ Components: PascalCase
export const FluidScrollHero = () => {};

// ✅ Hooks: camelCase with 'use' prefix
export const useScrollTrigger = () => {};

// ✅ Constants: SCREAMING_SNAKE_CASE
export const ANIMATION_DURATION = 300;

// ✅ Types/Interfaces: PascalCase
interface ComponentProps {
  isActive: boolean;
}

// ✅ Files: kebab-case
// fluid-scroll-hero.tsx
// kova-liquid-toggle.tsx
```

### **Import Organization**

```typescript
// ✅ Correct import order
// 1. React & Next.js
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 2. Third-party libraries
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// 3. Internal utilities
import { cn } from '@/lib/utils';
import { KOVA_DESIGN } from '@/lib/design-system';

// 4. Components
import { Button } from '@/components/ui/button';

// 5. Types
import type { ComponentProps } from '@/types/components';
```

---

## ⚡ Performance Guidelines

### **Animation Performance**

**GPU Acceleration Rules:**
```typescript
// ✅ GPU-accelerated properties only
const performantAnimation = gsap.to(element, {
  opacity: 1,
  x: 100,
  y: 50,
  scale: 1.1,
  rotation: 45,
  force3D: true,
  willChange: 'transform, opacity'
});

// ❌ Avoid layout-triggering properties
const slowAnimation = gsap.to(element, {
  width: '300px',    // Triggers layout
  height: '200px',   // Triggers layout
  top: '50px',       // Triggers layout
  left: '100px'      // Triggers layout
});
```

**Memory Management:**
```typescript
// ✅ Proper cleanup pattern
useEffect(() => {
  const animations: GSAPTween[] = [];
  const scrollTriggers: ScrollTrigger[] = [];
  
  // Create animations
  animations.push(gsap.to(element, { x: 100 }));
  scrollTriggers.push(ScrollTrigger.create({ /* config */ }));
  
  return () => {
    // Clean up all resources
    animations.forEach(anim => anim.kill());
    scrollTriggers.forEach(st => st.kill());
  };
}, []);
```

### **Bundle Optimization**

**Dynamic Imports:**
```typescript
// ✅ Code splitting for heavy components
const InteractiveDiagnosisDeck = dynamic(
  () => import('@/components/interactive-diagnosis-deck'),
  { 
    loading: () => <ComponentSkeleton />,
    ssr: false // Client-side only for animations
  }
);

// ✅ Selective library imports
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Don't import entire GSAP suite
```

**Image Optimization:**
```typescript
// ✅ Next.js Image component
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="KOVA Hero"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### **Performance Monitoring**

```typescript
// Performance measurement utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name}: ${end - start}ms`);
};

// Component performance wrapper
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  name: string
) => {
  return (props: P) => {
    useEffect(() => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        if (end - start > 16.67) { // > 1 frame
          console.warn(`${name} render took ${end - start}ms`);
        }
      };
    });
    
    return <Component {...props} />;
  };
};
```

---

## ♿ Accessibility Standards

### **WCAG 2.1 AA Compliance**

**Required Patterns:**

```typescript
// ✅ Semantic HTML structure
<main role="main">
  <section aria-label="Hero presentation">
    <h1>Page Title</h1>
    <p>Description</p>
  </section>
</main>

// ✅ Interactive elements
<button
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  aria-pressed={isPressed}
  aria-label="Descriptive action"
  tabIndex={0}
>
  Action
</button>

// ✅ Form elements
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
  required
/>
{hasError && (
  <div id="email-error" role="alert">
    Error message
  </div>
)}
```

### **Keyboard Navigation**

```typescript
// Comprehensive keyboard handling
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleActivate();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      focusPrevious();
      break;
    case 'ArrowRight':
      event.preventDefault();
      focusNext();
      break;
    case 'Escape':
      event.preventDefault();
      handleEscape();
      break;
    case 'Home':
      event.preventDefault();
      focusFirst();
      break;
    case 'End':
      event.preventDefault();
      focusLast();
      break;
  }
};
```

### **Screen Reader Support**

```typescript
// Live announcements
const useAnnouncement = () => {
  const announcementRef = useRef<HTMLDivElement>(null);
  
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcementRef.current) {
      announcementRef.current.setAttribute('aria-live', priority);
      announcementRef.current.textContent = message;
    }
  }, []);
  
  return {
    announce,
    AnnouncementRegion: () => (
      <div
        ref={announcementRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    )
  };
};
```

### **Color and Contrast**

```css
/* WCAG AA compliant color ratios */
.text-primary {
  color: hsl(0 0% 3.9%); /* Contrast ratio: 21:1 */
}

.text-secondary {
  color: #4A4A4A; /* Contrast ratio: 9.7:1 */
}

/* Focus indicators */
.focus-visible {
  outline: 2px solid #FFF9E1;
  outline-offset: 2px;
}
```

---

## 🧪 Testing Procedures

### **Testing Strategy**

```typescript
// Component testing template
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { KovaLiquidToggle } from '../kova-liquid-toggle';

expect.extend(toHaveNoViolations);

describe('KovaLiquidToggle', () => {
  it('renders without accessibility violations', async () => {
    const { container } = render(
      <KovaLiquidToggle 
        selected={null} 
        onSelectionChange={jest.fn()} 
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('handles keyboard navigation', () => {
    const handleChange = jest.fn();
    render(
      <KovaLiquidToggle 
        selected={null} 
        onSelectionChange={handleChange} 
      />
    );
    
    const institutionButton = screen.getByRole('radio', { name: /instituciones/i });
    fireEvent.keyDown(institutionButton, { key: 'Enter' });
    
    expect(handleChange).toHaveBeenCalledWith('instituciones');
  });
  
  it('maintains focus management', () => {
    render(
      <KovaLiquidToggle 
        selected={null} 
        onSelectionChange={jest.fn()} 
      />
    );
    
    const institutionButton = screen.getByRole('radio', { name: /instituciones/i });
    institutionButton.focus();
    
    expect(document.activeElement).toBe(institutionButton);
  });
});
```

### **Performance Testing**

```typescript
// Performance testing utilities
describe('Component Performance', () => {
  it('renders within performance budget', async () => {
    const startTime = performance.now();
    
    render(<FluidScrollHero title="Test" subtitle="Test" />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(16.67); // 60fps budget
  });
  
  it('handles memory cleanup', () => {
    const { unmount } = render(<AnimatedComponent />);
    
    // Simulate some time passing
    jest.advanceTimersByTime(1000);
    
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    unmount();
    
    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
    
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    expect(finalMemory).toBeLessThanOrEqual(initialMemory);
  });
});
```

### **Visual Regression Testing**

```typescript
// Storybook stories for visual testing
export default {
  title: 'Components/KovaLiquidToggle',
  component: KovaLiquidToggle,
  parameters: {
    chromatic: { 
      delay: 300,  // Wait for animations
      pauseAnimationAtEnd: true 
    }
  }
};

export const Default = () => (
  <KovaLiquidToggle selected={null} onSelectionChange={() => {}} />
);

export const InstitutionSelected = () => (
  <KovaLiquidToggle selected="instituciones" onSelectionChange={() => {}} />
);

export const AccessibilityTest = () => (
  <div>
    <h2>Keyboard Navigation Test</h2>
    <KovaLiquidToggle selected={null} onSelectionChange={() => {}} />
  </div>
);
```

---

## 🛡️ Security Practices

### **Input Validation**

```typescript
// Secure input handling
const validateProps = <T extends Record<string, unknown>>(
  props: T,
  schema: Record<keyof T, (value: unknown) => boolean>
): T => {
  Object.entries(schema).forEach(([key, validator]) => {
    if (!validator(props[key as keyof T])) {
      throw new Error(`Invalid prop: ${key}`);
    }
  });
  return props;
};

// Usage in components
export const SecureComponent = ({ title, count }: Props) => {
  const validatedProps = validateProps({ title, count }, {
    title: (value): value is string => typeof value === 'string' && value.length > 0,
    count: (value): value is number => typeof value === 'number' && value >= 0
  });
  
  // Component implementation
};
```

### **XSS Prevention**

```typescript
// ✅ Safe HTML rendering
import DOMPurify from 'dompurify';

const SafeHTML = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

// ✅ Safe URL handling
const SafeLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isValidUrl = /^https?:\/\//.test(href);
  if (!isValidUrl) {
    console.warn('Invalid URL provided:', href);
    return <span>{children}</span>;
  }
  return <a href={href} rel="noopener noreferrer">{children}</a>;
};
```

### **Dependency Security**

```bash
# Regular security audits
npm audit
npm audit fix

# Check for vulnerable dependencies
npm ls --depth=0

# Update dependencies regularly
npm update
```

---

## 🔄 Git Workflow

### **Branching Strategy**

```bash
# Main branches
main        # Production-ready code
develop     # Integration branch

# Feature branches
feature/component-name
feature/accessibility-improvements
feature/performance-optimization

# Hotfix branches
hotfix/critical-bug-fix
```

### **Commit Convention**

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat        # New feature
fix         # Bug fix
docs        # Documentation
style       # Formatting, missing semicolons, etc.
refactor    # Code change that neither fixes bug nor adds feature
perf        # Performance improvement
test        # Adding tests
chore       # Maintain

# Examples:
feat(toggle): add liquid animation to KovaLiquidToggle
fix(hero): resolve ScrollTrigger memory leak
docs(api): update component prop documentation
perf(animations): optimize GPU acceleration for mobile
```

### **Pull Request Process**

```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Make changes and commit
git add .
git commit -m "feat(component): add new interactive component"

# 3. Push and create PR
git push origin feature/new-component

# 4. PR Requirements:
# - All tests passing
# - Accessibility audit passed
# - Performance benchmarks met
# - Documentation updated
# - Code review approved
```

---

## 🚀 Deployment Process

### **Build Process**

```bash
# Production build
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Bundle analysis
npm run analyze
```

### **Environment Configuration**

```bash
# Production environment variables
NEXT_PUBLIC_APP_URL=https://kova.production.com
NEXT_PUBLIC_API_URL=https://api.kova.production.com
NODE_ENV=production
ANALYZE=false
```

### **Performance Monitoring**

```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to your analytics service
  console.log(metric);
};

// Measure Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### **Deployment Checklist**

- [ ] All tests passing
- [ ] Accessibility audit completed
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Bundle size within limits
- [ ] Browser compatibility tested
- [ ] Mobile responsiveness verified

---

## 📊 Code Quality Metrics

### **Quality Gates**

| Metric | Target | Tool |
|--------|--------|------|
| Type Coverage | >95% | TypeScript |
| Test Coverage | >80% | Jest |
| Accessibility | WCAG 2.1 AA | axe-core |
| Performance | <16.67ms render | React DevTools |
| Bundle Size | <500KB initial | Webpack Bundle Analyzer |
| Security | Zero vulnerabilities | npm audit |

### **Automated Checks**

```json
// package.json scripts
{
  "scripts": {
    "test": "jest --coverage",
    "test:a11y": "jest --testPathPattern=accessibility",
    "test:perf": "jest --testPathPattern=performance",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "audit": "npm audit --audit-level moderate"
  }
}
```

---

## 🎯 Development Best Practices

### **Code Organization**

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── sections/       # Page sections
│   ├── shared/         # Shared components
│   └── providers/      # Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── app/                # Next.js app directory
```

### **Performance Optimization**

```typescript
// Memoization patterns
const ExpensiveComponent = memo(({ data }: Props) => {
  const processedData = useMemo(() => {
    return heavyComputation(data);
  }, [data]);
  
  const handleClick = useCallback((id: string) => {
    // Handler logic
  }, []);
  
  return <div>{/* Component JSX */}</div>;
});

// Lazy loading
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

### **Error Handling**

```typescript
// Error boundary pattern
class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component error:', error, errorInfo);
    // Send to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

---

<div align="center">

**💻 Built with development excellence and engineering best practices**

[← Component Guide](./COMPONENTS.md) | [API Reference →](./API.md)

</div>