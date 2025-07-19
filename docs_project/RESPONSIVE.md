# Responsive Design Improvements

This document outlines the responsive design improvements made to the Mantine Form Builder documentation project.

## Changes Made

### 1. App Shell Navigation
- **Mobile Navigation**: Added a hamburger menu for mobile devices
- **Drawer Component**: Implemented a slide-out drawer for mobile navigation
- **Breakpoint**: Changed navbar breakpoint from 'sm' to 'md' for better tablet experience
- **Auto-close**: Navigation drawer automatically closes when a link is clicked

### 2. Layout Improvements
- **Container Padding**: Added responsive padding (`px="xs"`) to all page containers
- **Grid System**: Updated FormBuilder component to use responsive grid spans
  - Sidebar: `span={{ base: 12, md: 3 }}` (full width on mobile, 1/4 on desktop)
  - Main content: `span={{ base: 12, md: 9 }}` (full width on mobile, 3/4 on desktop)

### 3. Typography & Spacing
- **Responsive Titles**: Used CSS clamp for fluid typography scaling
- **Button Groups**: Added `wrap="wrap"` to button groups for better mobile layout
- **Flex Layouts**: Improved flex containers with proper wrapping and gap handling

### 4. Tables & Code Blocks
- **Scrollable Tables**: Wrapped tables in `ScrollArea` components to prevent horizontal overflow
- **Code Blocks**: Added horizontal scrolling for long code snippets
- **Mobile Typography**: Reduced font sizes on mobile for better readability

### 5. Form Builder Component
- **Header Layout**: Made the title input and action buttons responsive
- **Field Cards**: Improved field card layout with proper wrapping
- **Sidebar**: Full-width sidebar on mobile, compact on desktop

### 6. CSS Enhancements
- **Media Queries**: Added comprehensive mobile-first responsive styles
- **Table Improvements**: Better table handling on small screens
- **Button Sizing**: Responsive button sizing and spacing
- **Container Spacing**: Improved padding and margins for mobile devices

## Breakpoints Used

- **xs**: 36em (576px) - Extra small devices
- **sm**: 48em (768px) - Small devices
- **md**: 62em (992px) - Medium devices (tablets)
- **lg**: 75em (1200px) - Large devices
- **xl**: 88em (1408px) - Extra large devices

## Mobile-First Approach

The responsive design follows a mobile-first approach:
1. Base styles are designed for mobile devices
2. Progressive enhancement for larger screens
3. Graceful degradation for smaller screens

## Testing

To test the responsive design:
1. Open the application in a browser
2. Use browser dev tools to simulate different screen sizes
3. Test the hamburger menu on mobile viewports
4. Verify that tables scroll horizontally on small screens
5. Check that the FormBuilder sidebar stacks properly on mobile

## Browser Support

The responsive design works on all modern browsers that support:
- CSS Grid
- Flexbox
- CSS Custom Properties
- Media Queries 