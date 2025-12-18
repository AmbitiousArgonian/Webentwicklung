# AI Coding Agent Instructions for Angular Holiday Flat Website

## Project Overview
This is an Angular 16 application for a holiday flat advertisement website. It uses standalone components architecture with modern Angular practices focused on signals, reactive forms, and accessibility.

## Architecture
- **Standalone Components**: All components are standalone (explicitly set in Angular 16)
- **State Management**: Use signals for local state, computed() for derived state
- **Forms**: Prefer reactive forms over template-driven
- **Change Detection**: Set `ChangeDetectionStrategy.OnPush` on components
- **Templates**: Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives

## Key Patterns
- **Inputs/Outputs**: Use `input()` and `output()` functions instead of decorators
- **Host Bindings**: Place host bindings in the `host` object of `@Component` decorator, not `@HostBinding`
- **Styling**: Avoid `ngClass`/`ngStyle`; use `class`/`style` bindings
- **Images**: Use `NgOptimizedImage` for static images (not base64)
- **Services**: Use `inject()` function for dependency injection, `providedIn: 'root'` for singletons

## Accessibility
- Ensure WCAG AA compliance, including focus management and ARIA attributes
- Pass all AXE checks

## Developer Workflows
- **Serve**: `npm start` or `ng serve`
- **Build**: `npm run build` or `ng build`
- **Test**: `npm test` or `ng test`
- **E2E**: `npm run e2e` or `ng e2e`

## File Structure
- Components in `src/app/` with inline templates for small components
- External templates/styles relative to component TS file
- Assets in `src/assets/`
- E2E tests in `e2e/`

## TypeScript
- Strict type checking enabled
- Prefer type inference
- Use `unknown` over `any`

## Examples
- Component: See `src/app/app.component.ts` for basic standalone setup
- Avoid: No `@HostBinding` in codebase; use `host` object instead