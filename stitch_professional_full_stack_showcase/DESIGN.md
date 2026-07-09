---
name: Technical Precision Portfolio
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#1e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#35260c'
  on-tertiary-container: '#a38c6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fadfb8'
  tertiary-fixed-dim: '#ddc39d'
  on-tertiary-fixed: '#271902'
  on-tertiary-fixed-variant: '#564427'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

The design system is engineered for a high-end full-stack developer portfolio, balancing technical rigor with sophisticated modernism. The brand personality is authoritative yet approachable, emphasizing craftsmanship in code and clarity in user experience.

The visual direction leans into **Modern Minimalism** with a **Corporate/SaaS** influence. It utilizes expansive whitespace to frame projects as high-value artifacts. Subtle technical flourishes—such as monospaced accents and structured grid lines—are integrated to signal full-stack expertise without cluttering the interface. The emotional response should be one of trust, competence, and polished professional execution.

## Colors

The palette is built on a foundation of "Deep Slate" (#1E293B) to provide a grounded, high-contrast environment for text and structural elements. The "Off-White" (#F8FAFC) background ensures the UI feels airy and premium, preventing the "heavy" feeling of standard corporate designs.

"Tech Blue" (#3B82F6) serves as the primary action color, used sparingly for call-to-actions and interactive states to maintain its high-contrast impact. For depth, subtle mesh gradients should be applied in hero sections, blending the primary slate with deep indigo and violet tones at low opacity (10-15%) to create a sophisticated, ethereal atmosphere behind project showcases.

## Typography

This design system utilizes **Inter** for all primary communication due to its exceptional legibility and neutral, professional character. Headlines use heavier weights (700-800) with slight negative letter-spacing to create a "display" feel that commands attention.

To reinforce the developer identity, **JetBrains Mono** is used for small labels, tags, and code snippets. This "Label-Mono" style should always be set in uppercase or sentence case with increased tracking to ensure it feels like a deliberate design element rather than unformatted code. Large display text must scale aggressively for mobile to maintain the high-impact visual hierarchy.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, centered within a 1280px container to ensure content density remains controlled and readable. A 12-column system is used for project galleries, while technical documentation or case studies should utilize a centered 8-column column to maximize focus.

Spacing is governed by a strict 8px linear scale. Generous vertical "stack" spacing (80px+) is encouraged between major sections to emphasize the minimalist aesthetic. On mobile, margins reduce to 24px, and the grid collapses to a single column, but the generous vertical padding remains to preserve the airy, premium feel.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. 

1.  **Low Elevation:** Surface elements like cards use a very soft, diffused shadow (0px 4px 20px rgba(30, 41, 59, 0.05)) and a 1px border in a slightly darker gray than the background (#E2E8F0).
2.  **Interactive Elevation:** Upon hover, cards should lift slightly using a more pronounced shadow and a subtle tech-blue border transition.
3.  **Depth:** Background depth is created using "Spotlight" effects—large, blurred radial gradients in the accent color (#3B82F6 at 5% opacity) sitting behind primary content blocks to draw the eye without distracting from the text.

## Shapes

The design system utilizes a **Rounded** (0.5rem / 8px) base for standard UI elements like input fields and small buttons. However, primary cards and project containers use a larger `rounded-xl` (1.5rem / 24px) to create a softer, more modern "container" feel. This juxtaposition of sharper internal elements and softer external containers creates a sophisticated, layered look.

## Components

### Buttons
Primary buttons are solid Deep Slate (#1E293B) with white text, featuring a subtle hover transition to Tech Blue (#3B82F6). Secondary buttons use a "Ghost" style: a 1px border of the primary color with a transparent background.

### Cards
Project cards are the hero of the portfolio. They feature a white background, 24px corner radius, and the standard low-elevation ambient shadow. Images within cards should have a slightly smaller radius (12px) to create a "nested" professional appearance.

### Chips & Tags
Used for tech stacks (e.g., "React", "Node.js"). These use the `label-mono` typography, a light gray background (#F1F5F9), and no border. They should be styled with a "code-bracket" icon prefix or suffix for added personality.

### Input Fields
Inputs are minimalist: a 1px border (#E2E8F0) that turns Tech Blue on focus. Use JetBrains Mono for placeholder text to maintain the technical theme.

### Code Snippets
Inline code uses a subtle highlight of #EFF6FF with a blue text color. Block code snippets should use a Deep Slate background with syntax highlighting that mirrors popular VS Code themes (like One Dark or Night Owl) to signal authentic developer craft.