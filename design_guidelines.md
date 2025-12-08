# RO Water Purifier Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium service websites like Tesla (for product showcases), Apple (for clean product presentation), and modern SaaS landing pages for the service-oriented sections.

## Core Design Elements

### Typography System
**Font Family**: Poppins (Google Fonts) throughout
- Headlines (H1): 3xl-5xl, font-bold (Hero section)
- Section Headers (H2): 2xl-4xl, font-semibold
- Subsections (H3): xl-2xl, font-medium
- Body Text: base-lg, font-normal
- Buttons/CTAs: base-lg, font-semibold
- Small Text/Labels: sm-base, font-medium

### Layout System
**Spacing Units**: Use Tailwind spacing of 4, 6, 8, 12, 16, 20, 24 for consistency
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-6 md:gap-8 lg:gap-12
- Container max-width: max-w-7xl mx-auto px-4 md:px-6
- Card padding: p-6 md:p-8

### Color Specifications (User-Provided)
- Background: Black/Slate dark theme
- Brand Accent: Copper/Bronze (#b87333)
- Video overlay: Dark gradient overlay for readability

## Component Library

### Navigation Bar
- Fixed top position with backdrop blur
- Logo on left, navigation menu center/right
- Hamburger menu for mobile (Font Awesome icon)
- Height: h-16 md:h-20
- Smooth scroll behavior to sections

### Hero Section with Video Background
- Full viewport height (min-h-screen)
- Looping background video with dark overlay (40-60% opacity)
- Centered content with z-index layering
- Animated headline with fade-in effect
- Dual CTA buttons (primary copper, secondary outline)
- Buttons with backdrop-blur-md for readability over video

### Products Showcase Grid
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Product cards with image, title, key specs (3-4 bullet points), price, and CTA
- Hover effects: subtle scale transform (scale-105) and shadow enhancement
- Images: aspect-square or aspect-4/3 ratio
- Card spacing: gap-8

### Services Section
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Each service card: Font Awesome icon at top, title, description
- Icon size: text-4xl with copper accent
- Cards with subtle background contrast and rounded corners (rounded-xl)
- Hover: translate-y lift effect (-translate-y-2)

### About Us Section
- Two-column layout on desktop (lg:grid-cols-2)
- Company story/text on left, highlights/features on right
- Feature highlights with checkmark icons
- Generous padding for readability

### Contact Form
- Single column form with full-width inputs
- Input fields: Name, Email, Phone, Service Type (dropdown), Message (textarea)
- Field styling: rounded-lg with consistent padding (p-3 md:p-4)
- Submit button: Full-width on mobile, auto width on desktop
- Form validation states with inline error messages
- Spacing between fields: space-y-4 md:space-y-6

### Footer
- Three-column layout on desktop (company info, quick links, contact details)
- Social media icons with Font Awesome (horizontal row, text-xl)
- Copyright bar at bottom
- Padding: py-12 md:py-16

## Interaction Patterns
- Smooth scroll navigation with offset for fixed navbar
- Button hover states: brightness adjustment and subtle scale
- Card hover effects: shadow enhancement and slight lift
- Form focus states: outline with copper accent
- Mobile menu: slide-in animation from right/top
- Minimal, purposeful animations (fade-in on scroll for sections)

## Images
**Hero Section**: Background looping video (water purification process, clean water flowing, or product in use)
**Product Showcase**: High-quality product images for each RO purifier model (3-4 products minimum)
**About Section**: Optional company/team photo or facility image

## Responsive Breakpoints
- Mobile-first approach
- Key breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation: Full menu on md+, hamburger on mobile
- Grid systems: Single column mobile → multi-column desktop
- Typography scales up from mobile to desktop
- Button sizing and spacing adjusts per breakpoint

## Accessibility
- Proper heading hierarchy (H1 → H2 → H3)
- Form labels and ARIA attributes
- Sufficient color contrast on dark backgrounds
- Focus visible states on all interactive elements
- Alt text for all product and informational images