# AGENTS.md — Maqra Development Workflow

## Core Principle

This project operates on a Jira-integrated development workflow. When the user references a task, manage the full lifecycle:

- Read Jira task first
- Create/update Git branch
- Update Jira statuses
- Implement only the assigned work
- Complete task and report changes

---

## Project Architecture Protection Rules (Highest Priority)

These rules override all implementation decisions.

### Existing Project Is Already Setup

The project architecture is complete. Work strictly inside the existing structure.

**DO NOT:**

- Create new folders
- Create new architectural layers
- Move files
- Rename folders
- Refactor project structure
- Introduce new patterns
- Introduce new state management solutions
- Introduce new styling frameworks

### Approved Folder Structure

Only modify files inside:

```
app/
src/components/
src/screens/
src/store/
src/utils/
```

Never create alternative structures. Forbidden folders include `features/`, `modules/`, `hooks/`, `services/`, `providers/`, `contexts/`, `lib/`, `shared/`, `design-system/` — unless they already exist in the repository.

---

## UI-Only Development Rule

This project is design-first. The primary responsibility is building UI.

### Components (`src/components/`)

Must be pure presentational components — props in, UI out.

Never add: `useState`, `useReducer`, `useEffect`, timers, filtering, calculations, API calls, Zustand access, or business logic.

### Screens (`src/screens/`)

Must remain presentation-focused.

**Allowed:** compose UI, receive props, render layouts.

**Not allowed:** complex logic, business rules, calculations, timers, data transformations.

### Store (`src/store/`)

Only files here may contain Zustand logic, state mutations, actions, or business logic.

### Utils (`src/utils/`)

Only files here may contain theme constants, formatting helpers, or utility functions.

---

## No New Files Rule

Before creating **any** file:

1. Search existing project files.
2. Reuse existing files whenever possible.
3. Modify existing components instead.

Creating new files is forbidden unless the user explicitly requests it, or the existing structure makes it impossible. When unavoidable, create the minimum number of files and place them only in approved folders.

---

## Design Source Rule

Before implementing UI:

1. Read design specifications from Stitch MCP.
2. Read all available design references.
3. Follow the design exactly.

**Never:** invent layouts, redesign screens, simplify visual hierarchy, or replace provided design decisions. Implementation must match Stitch designs as closely as possible.

---

## Styling Rules

Use only **React Native `StyleSheet.create()`**.

**Do not use:** NativeWind, Tailwind, Styled Components, Tamagui, or UI kits — unless already present in the project.

All colors, typography, spacing, shadows, and radii must come from `src/utils/theme.js`.

---

## Expo Router Rules

### `app/_layout.js`

Responsible only for navigation structure, tabs, and stack configuration.

Never place business logic, Zustand orchestration, or calculations here.

### `app/*.js` routes

Responsible only for rendering screens, passing required props, and minimal route handling.

---

## Jira Workflow

### Step 1 — Read Task

When the user references a Jira issue:

1. Read the issue from Jira.
2. Fetch: summary, description, acceptance criteria, issue type, status, and all subtasks.

Never assume task contents.

### Step 2 — Branch Creation

Create a branch using:

```
<type>/<ISSUE-KEY>-<short-kebab-summary>
```

Examples:

```
feature/AMR-142-library-screen
bugfix/AMR-201-progress-ring
```

Branch from the default project branch.

### Step 3 — Read All Subtasks

If subtasks exist, fetch for every subtask: key, summary, description, status, priority, dependencies, and blockers.

Create an execution order before coding and show the ordered list to the user.

**Prioritization rules** (in order):

1. Dependency order
2. Jira priority
3. Already "In Progress"
4. Foundational work first
5. Due dates
6. Jira rank

If ambiguous, stop and ask the user.

### Step 4 — Start Work

Update Jira: `To Do → In Progress`.

Only work on the current subtask, or the parent task if no subtasks exist. Do not implement future subtasks.

### Step 5 — Implementation

Follow: existing architecture, existing folder structure, Stitch design specifications, and UI-only rules.

Never refactor unrelated code. Stay within task scope.

### Step 6 — Commit

Commit format:

```
<type>(<scope>): <description> [ISSUE-KEY]
```

Example:

```
feat(library): build immersive library screen [AMR-142]
```

### Step 7 — Completion

When work is finished:

1. Verify acceptance criteria.
2. Update the Jira item → `Done`.
3. Report: what changed, branch name, commit message, and Jira status.

If all subtasks are `Done`, update the parent issue → `Done`.

---

## Guardrails

- Always read Jira before coding.
- Always read all subtasks before selecting work.
- Never create architecture.
- Never create folders.
- Never refactor structure.
- Never introduce new logic into UI.
- Never ignore Stitch designs.
- Never skip Jira status updates.
- Never close a parent task until all subtasks are `Done`.
- When unsure, ask before acting.