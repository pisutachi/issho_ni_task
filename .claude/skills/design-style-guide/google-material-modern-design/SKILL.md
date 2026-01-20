---
name: google-material-modern-design
description: Create bold, colorful Google Material Design interfaces with elevation, ripple effects, FABs, and modern components. Use when designing UI components, dashboards, cards, buttons, forms, or any interface requiring Material Design 3 aesthetics with CSS, Tailwind, React, or HTML.
---

# Google Material Modern Design Guide

A comprehensive guide for creating vibrant, intuitive designs inspired by Google's Material Design philosophy. This skill helps you implement modern, purposeful interfaces with attention to color, elevation, motion, and interaction patterns.

## When to Use This Skill

Use this skill when:
- Designing modern UI components with Material Design aesthetics
- Creating dashboards, admin panels, or data-heavy interfaces
- Building card-based layouts with elevation and shadows
- Implementing forms with Material Design input styles
- Designing navigation drawers, app bars, or bottom navigation
- Working with React, Vue, Angular, Tailwind CSS, or plain CSS/HTML
- Applying ripple effects, FABs, or meaningful motion
- Need consistent, accessible, colorful interfaces with clear hierarchy

## Core Design Philosophy

Material Design philosophy centers on:

1. **Material as Metaphor**: Inspired by physical paper and ink
2. **Bold, Graphic, Intentional**: Strong use of color, imagery, and typography
3. **Motion Provides Meaning**: Animations guide attention and maintain continuity
4. **Elevation System**: Height creates hierarchy through shadows
5. **Flexible Foundation**: Adaptable to any brand or platform
6. **Accessible by Default**: Color contrast, touch targets, screen readers
7. **Component-Based**: Reusable, consistent patterns

## Design Principles

### 1. Color Palette (Material Design 3 / Material You)

**Primary Colors**:
- Primary: `#6750A4` (Purple)
- On Primary: `#FFFFFF`
- Primary Container: `#EADDFF`
- On Primary Container: `#21005E`

**Secondary Colors**:
- Secondary: `#625B71`
- On Secondary: `#FFFFFF`
- Secondary Container: `#E8DEF8`
- On Secondary Container: `#1E192B`

**Tertiary Colors**:
- Tertiary: `#7D5260`
- On Tertiary: `#FFFFFF`
- Tertiary Container: `#FFD8E4`
- On Tertiary Container: `#370B1E`

**Surface & Background**:
- Surface: `#FFFBFE`
- On Surface: `#1C1B1F`
- Surface Variant: `#E7E0EC`
- On Surface Variant: `#49454F`
- Background: `#FFFBFE`
- On Background: `#1C1B1F`

**Error Colors**:
- Error: `#B3261E`
- On Error: `#FFFFFF`
- Error Container: `#F9DEDC`
- On Error Container: `#410E0B`

**Classic Material Colors** (for reference):
- Red: `#F44336`
- Pink: `#E91E63`
- Purple: `#9C27B0`
- Deep Purple: `#673AB7`
- Indigo: `#3F51B5`
- Blue: `#2196F3`
- Light Blue: `#03A9F4`
- Cyan: `#00BCD4`
- Teal: `#009688`
- Green: `#4CAF50`
- Light Green: `#8BC34A`
- Lime: `#CDDC39`
- Yellow: `#FFEB3B`
- Amber: `#FFC107`
- Orange: `#FF9800`
- Deep Orange: `#FF5722`

### 2. Typography

**System Fonts**:
```css
font-family: 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
```

**Type Scale (Material Design 3)**:
- Display Large: 57px / 3.5625rem (line-height: 64px, weight: 400)
- Display Medium: 45px / 2.8125rem (line-height: 52px, weight: 400)
- Display Small: 36px / 2.25rem (line-height: 44px, weight: 400)
- Headline Large: 32px / 2rem (line-height: 40px, weight: 400)
- Headline Medium: 28px / 1.75rem (line-height: 36px, weight: 400)
- Headline Small: 24px / 1.5rem (line-height: 32px, weight: 400)
- Title Large: 22px / 1.375rem (line-height: 28px, weight: 400)
- Title Medium: 16px / 1rem (line-height: 24px, weight: 500)
- Title Small: 14px / 0.875rem (line-height: 20px, weight: 500)
- Body Large: 16px / 1rem (line-height: 24px, weight: 400)
- Body Medium: 14px / 0.875rem (line-height: 20px, weight: 400)
- Body Small: 12px / 0.75rem (line-height: 16px, weight: 400)
- Label Large: 14px / 0.875rem (line-height: 20px, weight: 500)
- Label Medium: 12px / 0.75rem (line-height: 16px, weight: 500)
- Label Small: 11px / 0.6875rem (line-height: 16px, weight: 500)

**Font Weights**:
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700

### 3. Spacing System (8dp Grid)

Material Design uses 8dp (density-independent pixels) as base unit:
- xs: 4dp (0.25rem)
- sm: 8dp (0.5rem)
- md: 16dp (1rem)
- lg: 24dp (1.5rem)
- xl: 32dp (2rem)
- 2xl: 40dp (2.5rem)
- 3xl: 48dp (3rem)
- 4xl: 64dp (4rem)
- 5xl: 80dp (5rem)

### 4. Elevation & Shadows

Material Design uses elevation levels (0-5) to create hierarchy:

```css
/* Level 0 (No elevation) */
box-shadow: none;

/* Level 1 (Cards, raised buttons) */
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
            0px 1px 3px 1px rgba(0, 0, 0, 0.15);

/* Level 2 (Hovered cards) */
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
            0px 2px 6px 2px rgba(0, 0, 0, 0.15);

/* Level 3 (FAB, app bar) */
box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
            0px 1px 3px 0px rgba(0, 0, 0, 0.3);

/* Level 4 (Navigation drawer) */
box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15),
            0px 2px 3px 0px rgba(0, 0, 0, 0.3);

/* Level 5 (Modal dialogs) */
box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15),
            0px 4px 4px 0px rgba(0, 0, 0, 0.3);
```

### 5. Border Radius

Material Design 3 uses varied corner radii:
- Extra Small: 4px (chips, small buttons)
- Small: 8px (buttons, small cards)
- Medium: 12px (cards, dialogs)
- Large: 16px (large cards, sheets)
- Extra Large: 28px (FAB, prominent elements)
- Full: 50% or 9999px (circular elements)

### 6. Ripple Effect

Material Design's signature touch feedback:

```css
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple:active::after {
  width: 300px;
  height: 300px;
}
```

## Component Patterns

### App Bar (Top Bar)

**Properties**:
- Height: 64px (desktop), 56px (mobile)
- Background: Primary color or surface
- Elevation: Level 0 (default) or Level 4 (scrolled)
- Title: Title Large (22px)
- Icons: 24px with 48x48dp touch target

### Cards

**Properties**:
- Background: Surface color
- Elevation: Level 1 (default), Level 2 (hover)
- Border radius: 12px
- Padding: 16dp
- Minimum touch target: 48x48dp

### Buttons

**Filled Button**:
- Background: Primary color
- Text: On Primary color
- Height: 40px
- Padding: 0 24px
- Border radius: 20px (full-height)
- Elevation: Level 0, Level 1 on hover

**Outlined Button**:
- Border: 1px solid Outline color
- Text: Primary color
- No elevation
- Background: Transparent

**Text Button**:
- No border, no background
- Text: Primary color
- Padding: 0 12px

### FAB (Floating Action Button)

**Properties**:
- Size: 56x56px (regular), 40x40px (small)
- Border radius: 16px (regular), 12px (small)
- Elevation: Level 3, Level 4 on hover
- Icon: 24px
- Position: Fixed, bottom-right with 16px margin

### Text Fields

**Filled Text Field**:
- Background: Surface variant with subtle alpha
- Border: Bottom border only (1px)
- Border radius: 4px top corners
- Padding: 16px 12px
- Label: Floating label animation
- Focus: Thicker bottom border (2px), primary color

**Outlined Text Field**:
- Border: 1px solid outline color
- Border radius: 4px
- Padding: 16px 12px
- Label: Floating above outline when focused
- Focus: 2px border, primary color

## Example Components

### Example 1: Material App Bar (React + Tailwind)

```jsx
export const MaterialAppBar = () => {
  return (
    <header className="bg-purple-600 text-white shadow-md">
      <div className="flex items-center h-16 px-4">
        {/* Menu Icon */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-xl font-medium ml-4">
          Material Design App
        </h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Icons */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </button>
      </div>
    </header>
  );
};
```

### Example 2: Material Card (Plain CSS)

```html
<div class="material-card">
  <img src="/image.jpg" alt="Card image" class="card-image" />
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">
      This is a Material Design card with elevation and hover effects.
      Cards contain content and actions about a single subject.
    </p>
  </div>
  <div class="card-actions">
    <button class="text-button">Learn More</button>
    <button class="text-button">Action</button>
  </div>
</div>

<style>
.material-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
              0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 400px;
}

.material-card:hover {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
              0px 2px 6px 2px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  color: #1C1B1F;
  margin: 0 0 8px 0;
  font-family: 'Roboto', sans-serif;
}

.card-description {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #49454F;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.card-actions {
  padding: 8px 16px 16px 16px;
  display: flex;
  gap: 8px;
}

.text-button {
  background: none;
  border: none;
  color: #6750A4;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1px;
}

.text-button:hover {
  background-color: rgba(103, 80, 164, 0.08);
}
</style>
```

### Example 3: Material Buttons (React)

```jsx
export const MaterialButtons = () => {
  return (
    <div className="flex flex-wrap gap-4 p-6">
      {/* Filled Button */}
      <button className="h-10 px-6 bg-purple-600 text-white rounded-full font-medium text-sm hover:shadow-md hover:bg-purple-700 transition-all duration-200 uppercase tracking-wide">
        Filled Button
      </button>

      {/* Outlined Button */}
      <button className="h-10 px-6 bg-transparent border border-purple-600 text-purple-600 rounded-full font-medium text-sm hover:bg-purple-50 transition-all duration-200 uppercase tracking-wide">
        Outlined
      </button>

      {/* Text Button */}
      <button className="h-10 px-3 bg-transparent text-purple-600 rounded-full font-medium text-sm hover:bg-purple-50 transition-all duration-200 uppercase tracking-wide">
        Text
      </button>

      {/* Filled Icon Button */}
      <button className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full hover:shadow-md hover:bg-purple-700 transition-all duration-200">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
  );
};
```

### Example 4: Material FAB (Floating Action Button)

```jsx
export const MaterialFAB = () => {
  return (
    <>
      {/* Regular FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group">
        <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>

      {/* Extended FAB */}
      <button className="fixed bottom-6 right-6 h-14 px-6 bg-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 group">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span className="font-medium text-sm uppercase tracking-wide">
          Create
        </span>
      </button>
    </>
  );
};
```

### Example 5: Material Text Field (CSS)

```html
<div class="text-field-container">
  <div class="text-field-outlined">
    <input
      type="text"
      id="email"
      class="text-field-input"
      placeholder=" "
    />
    <label for="email" class="text-field-label">Email address</label>
    <fieldset class="text-field-outline">
      <legend class="text-field-legend"><span>Email address</span></legend>
    </fieldset>
  </div>
</div>

<style>
.text-field-container {
  padding: 16px;
}

.text-field-outlined {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 400px;
}

.text-field-input {
  width: 100%;
  padding: 16px 12px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: #1C1B1F;
  background: transparent;
  border: none;
  outline: none;
  position: relative;
  z-index: 1;
}

.text-field-label {
  position: absolute;
  left: 12px;
  top: 16px;
  font-size: 16px;
  color: #49454F;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
  padding: 0 4px;
  z-index: 2;
}

.text-field-input:focus + .text-field-label,
.text-field-input:not(:placeholder-shown) + .text-field-label {
  top: -8px;
  left: 8px;
  font-size: 12px;
  color: #6750A4;
}

.text-field-outline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #79747E;
  border-radius: 4px;
  pointer-events: none;
  margin: 0;
  padding: 0;
}

.text-field-input:focus ~ .text-field-outline {
  border: 2px solid #6750A4;
}

.text-field-legend {
  font-size: 12px;
  visibility: hidden;
  width: auto;
  height: 0;
  padding: 0;
  margin: 0 2px;
}

.text-field-input:focus ~ .text-field-outline .text-field-legend,
.text-field-input:not(:placeholder-shown) ~ .text-field-outline .text-field-legend {
  visibility: visible;
}
</style>
```

### Example 6: Material Chip

```jsx
export const MaterialChip = ({ label, onDelete }) => {
  return (
    <div className="inline-flex items-center h-8 px-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-400 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
};
```

## Best Practices

### Visual Design
- **Use bold colors intentionally**: Material Design embraces vibrant colors
- **Maintain elevation hierarchy**: Higher elements cast larger shadows
- **8dp grid alignment**: All spacing should be multiples of 8
- **Meaningful motion**: Animations should guide user attention
- **Touch targets**: Minimum 48x48dp for interactive elements
- **Color contrast**: Ensure WCAG AA compliance (4.5:1 minimum)

### Typography
- **Clear hierarchy**: Use defined type scale consistently
- **Roboto font family**: Default to Roboto for Material Design
- **Line height**: 1.5 for body text, 1.2-1.3 for headlines
- **Letter spacing**: Follow Material Design type scale specs
- **Truncation**: Use ellipsis for long text with proper title attributes

### Layout
- **Responsive grids**: Use 12-column grid system
- **Breakpoints**: 600dp (phone), 905dp (tablet), 1240dp (desktop)
- **Consistent spacing**: Apply 8dp grid throughout
- **Cards for content**: Group related information in cards
- **Navigation patterns**: Use appropriate nav for screen size

### Interactions
- **Ripple effect**: Apply to all clickable elements
- **State layers**: Show hover, focus, pressed states
- **Transitions**: Use standard Material motion curves
- **Loading states**: Use progress indicators (circular/linear)
- **Feedback**: Provide immediate visual response

### Elevation
- **Resting elevation**: Default state of component
- **Hover elevation**: Increase by 2-4dp on hover
- **Dragged elevation**: Highest elevation while dragging
- **Consistent levels**: Don't create arbitrary elevation values

## Common Patterns

### Pattern 1: Dashboard Cards

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {metrics.map(metric => (
    <div
      key={metric.id}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {metric.label}
        </h3>
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <metric.icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <div className="text-3xl font-normal text-gray-900 mb-2">
        {metric.value}
      </div>
      <div className="text-sm text-gray-600">
        {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}% from last month
      </div>
    </div>
  ))}
</div>
```

### Pattern 2: List with Actions

```jsx
<div className="bg-white rounded-xl shadow-md overflow-hidden">
  {items.map((item, index) => (
    <div
      key={item.id}
      className={`flex items-center p-4 hover:bg-gray-50 transition-colors duration-150 ${
        index !== items.length - 1 ? 'border-b border-gray-200' : ''
      }`}
    >
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
        <span className="text-blue-600 font-medium">{item.initial}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
      </div>
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-150">
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  ))}
</div>
```

### Pattern 3: Bottom Navigation

```jsx
export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'search', label: 'Search', icon: SearchIcon },
    { id: 'favorites', label: 'Favorites', icon: FavoriteIcon },
    { id: 'profile', label: 'Profile', icon: ProfileIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
              activeTab === tab.id ? 'text-purple-600' : 'text-gray-600'
            }`}
          >
            <tab.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
```

## Accessibility Guidelines

1. **Color Contrast**:
   - Normal text: minimum 4.5:1 ratio
   - Large text (18px+): minimum 3:1 ratio
   - Don't rely on color alone to convey information

2. **Touch Targets**:
   - Minimum 48x48dp for all interactive elements
   - Adequate spacing between targets (8dp minimum)
   - Clear visual feedback on interaction

3. **Semantic HTML**:
   - Use proper heading hierarchy (h1-h6)
   - Landmark regions (header, nav, main, footer)
   - Button vs link semantics

4. **ARIA Labels**:
   - Add aria-label for icon-only buttons
   - Use aria-describedby for helper text
   - Implement aria-live for dynamic content
   - Add aria-expanded for expandable elements

5. **Keyboard Navigation**:
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - Keyboard shortcuts documented

6. **Screen Reader Support**:
   - Descriptive alt text for images
   - Form labels associated with inputs
   - Error messages announced
   - Loading states communicated

## AI Assistant Instructions

When this skill is activated, follow these guidelines:

### Always Do:
1. **Apply Material Design principles**: Use elevation, bold colors, and 8dp grid
2. **Provide complete code examples**: Include all necessary HTML/CSS/JSX with proper styling
3. **Use Roboto font family**: Default to Roboto font stack
4. **Include ripple effects**: All clickable elements should have ripple or state layer feedback
5. **Ensure accessibility**: Proper contrast ratios, 48dp touch targets, ARIA labels
6. **Add smooth transitions**: Use Material motion curves (cubic-bezier)
7. **Implement elevation correctly**: Use proper shadow definitions for each level
8. **Follow 8dp spacing**: All spacing should be multiples of 8
9. **Provide Material Design 3 colors**: Use the new color system when applicable
10. **Include responsive considerations**: Mobile-first with proper breakpoints

### Never Do:
1. **Don't use flat shadows**: Material shadows have specific blur and spread values
2. **Don't ignore elevation hierarchy**: Higher components need higher elevation
3. **Don't skip ripple effects**: It's a core Material Design pattern
4. **Don't use arbitrary colors**: Stick to Material Design color palette
5. **Don't create small touch targets**: Minimum 48x48dp always
6. **Don't use inconsistent spacing**: Follow 8dp grid religiously
7. **Don't ignore motion**: Material Design relies on meaningful animations
8. **Don't forget state layers**: Hover, focus, pressed states are essential
9. **Don't mix design systems**: Don't blend with iOS or other styles
10. **Don't overcomplicate**: Material Design has clear, consistent patterns

### Code Output Format:
- Use Tailwind CSS when user's project includes it
- Use plain CSS with Material Design classes when Tailwind isn't available
- Provide React/Vue/Angular components based on user's stack
- Include comments for complex styling decisions
- Show full component code, not just snippets
- Always include proper elevation shadows

### When User Requests:
- **"Material button"**: Provide filled/outlined/text variants with ripple effect
- **"Material card"**: White background, elevation level 1, 12px radius
- **"FAB"**: 56x56px, elevation level 3, primary color, with icon
- **"App bar"**: 64px height, primary color, with title and icons
- **"Text field"**: Provide filled or outlined variant with floating label
- **"Material colors"**: Use Material Design 3 color system
- **"Navigation"**: Bottom nav for mobile, drawer for desktop
- **"Elevation"**: Apply proper shadow based on hierarchy

### Customization Approach:
1. Start with base Material Design aesthetic
2. Ask about brand primary color if not specified
3. Generate full Material Design 3 color palette from primary
4. Maintain elevation and spacing principles
5. Ensure customizations don't compromise accessibility
6. Keep motion and interaction patterns consistent

## Troubleshooting

**Issue**: Shadows look wrong or too harsh
**Solution**: Ensure using exact Material Design shadow definitions with proper blur, spread, and opacity values. Don't create custom shadows.

**Issue**: Colors don't match Material Design
**Solution**: Use Material Design 3 color system. Generate palette from primary color using Material Theme Builder.

**Issue**: Touch targets too small on mobile
**Solution**: Ensure all interactive elements are minimum 48x48dp. Add padding to increase clickable area.

**Issue**: Ripple effect not working
**Solution**: Check overflow: hidden on parent, position: relative, and proper z-index layering.

**Issue**: Text field label animation broken
**Solution**: Ensure placeholder=" " trick for CSS, or use proper JavaScript for label float animation.

**Issue**: Spacing looks inconsistent
**Solution**: Audit all spacing values, ensure they're multiples of 8dp. Use spacing variables/utilities.

**Issue**: Cards don't have depth
**Solution**: Apply proper elevation shadows. Level 1 for resting state, Level 2 for hover.

**Issue**: Design doesn't feel Material
**Solution**: Add bold colors, ensure proper elevation hierarchy, implement ripple effects, use Roboto font, follow 8dp grid.

## Additional Resources

- [Material Design 3 Guidelines](https://m3.material.io/)
- [Material Design 2 Guidelines](https://material.io/design)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [Material Icons](https://fonts.google.com/icons)
- [Material Components Web](https://material.io/develop/web)
- [Roboto Font](https://fonts.google.com/specimen/Roboto)
- [Material Design Color Tool](https://material.io/resources/color/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design Motion](https://material.io/design/motion)

---

This skill empowers you to create vibrant, intuitive Material Design interfaces that are both beautiful and functional. Focus on bold colors, elevation hierarchy, and meaningful motion to achieve that distinctive Google Material aesthetic.
