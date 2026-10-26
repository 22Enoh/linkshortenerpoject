---
description: Read this before creating or modifying UI components in the project.
---

# UI Components

## Core Rule

**ALL UI elements use shadcn/ui. Do NOT create custom components. ALWAYS use shadcn/ui components.**

## Requirements

- Build every UI (forms, buttons, dialogs, tables, cards, inputs, menus, etc.) from shadcn/ui components only.
- Do not hand-write new reusable components, and do not wrap or re-implement shadcn/ui primitives.
- Compose pages directly from shadcn/ui components inside route files in `src/app/`.
- If a needed component is not in `src/components/ui/`, install it with the CLI: `npx shadcn@latest add <component>`. Do not write it manually.
- Check the shadcn/ui docs (https://ui.shadcn.com/docs/components) for the right component before building anything.
- Do not edit generated files in `src/components/ui/` except through the shadcn CLI.

## Configuration

Defined in [components.json](../components.json): style `base-nova`, RSC enabled, Tailwind v4 CSS variables, `lucide` icons.

| Alias | Path |
| --- | --- |
| `@/components/ui` | `src/components/ui` |
| `@/lib/utils` | `src/lib/utils.ts` |

## Styling

- Use Tailwind utility classes for layout and spacing only; style components via their variants and props.
- Merge classes with `cn()` from `@/lib/utils`.
- Use theme tokens (`bg-background`, `text-foreground`, `bg-primary`, etc.). Never hard-code colors.
- Use `lucide-react` for icons.

## Accessibility

- Keep the accessibility features built into shadcn/ui components (labels, focus states, ARIA).
- Pair every input with a `Label`; provide accessible names for icon-only buttons.

## Exceptions

- Clerk components (`SignInButton`, `SignUpButton`, `UserButton`, etc.) are used per [authentication.md](authentication.md); render them with shadcn/ui `Button` as the trigger where applicable.
