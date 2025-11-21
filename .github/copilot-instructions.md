# ASEP Frontend - Copilot Instructions

## Architecture Overview

ASEP is a role-based learning platform with three main user types: **Admin**, **Learner**, and **Mentor**. The frontend follows a clear separation of concerns:

- **Contexts** (`/src/contexts/`) - Global state management per domain (Auth, User, Learner, Mentor, Package, etc.)
- **Hooks** (`/src/hooks/`) - Reusable logic including auth, role checks, and UI utilities
- **Schemas** (`/src/schemas/`) - Zod validation schemas matching the backend database schema
- **Components** (`/src/components/`) - UI components (shadcn/ui based) + layout components
- **Pages** (`/src/pages/`) - Route-specific page components organized by role (admin/, learner/, mentor/)

## Database Schema Key Relationships

The core entities and relationships:

- **Users** → one-to-one → **LearnerProfile** OR **Mentor**
- **LearnerPackage** → links → **Learner** + **Package**
- **AiPracticeSession** → belongs to → **Learner**
- **MentorFeedback** → links → **Mentor** + **Learner** + **AiPracticeSession**
- **ProgressReport** → belongs to → **Learner**
- **FeedbackComment** → belongs to → **User**
- **Report** → belongs to → **Admin** (admin_id)

## Key Patterns & Conventions

### 1. Role-Based Access Control
```tsx
// Check user role with hooks
const { useIsAdmin, useIsMentor, useIsLearner } = useRole();

// Or use canAccess for multiple roles
const { canAccess } = useAuth();
if (canAccess([UserRole.ADMIN, UserRole.MENTOR])) { ... }

// Protect routes
<ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
  <AdminPage />
</ProtectedRoute>
```

### 2. Context Pattern
Each domain has a context following this pattern:
- Provider component wraps child components
- Hook exports with error checking
- Mock data for development (in providers)
- CRUD operations exposed via context

Example: `LearnerContext` → `useLearners()` hook → `learners`, `addLearner()`, `updateLearner()`, `removeLearner()`

### 3. Schema Validation
All data is validated with Zod schemas before API calls:

```tsx
import { UserSchema, User } from "@/schemas/User";

const validUser = UserSchema.parse(userData); // throws ZodError if invalid
```

Enums for constants (UserRole, UserStatus, PaymentStatus, etc.):
```tsx
export enum UserRole {
  ADMIN = "ADMIN",
  MENTOR = "MENTOR",
  LEARNER = "LEARNER",
}
```

### 4. Sidebar Navigation
- `RoleBasedSidebar` component auto-updates menu based on `user.role`
- Menu items defined in `/src/lib/menuConfig.ts` per role
- Uses shadcn/ui Sidebar components with icons from lucide-react

### 5. UI Component Library
- Built on **shadcn/ui** + **Radix UI** primitives
- Tailwind CSS for styling
- Icons from **lucide-react**
- Form validation with **react-hook-form** + **Zod**
- React Query for server state (setup ready in App.tsx)

## File Structure Guide

```
src/
  contexts/        # Global state by domain
    AuthContext.tsx          # User auth & role checks
    LearnerContext.tsx       # Learner list & CRUD
    MentorContext.tsx        # Mentor list & CRUD
    UserContext.tsx          # User admin operations
    PackageContext.tsx       # Package management
    DashboardContext.tsx     # Dashboard metrics
    FeedbackContext.tsx      # Feedback operations
    PolicyContext.tsx        # System policies
  
  hooks/           # Custom React hooks
    use-auth.ts              # Access AuthContext
    use-role.ts              # useIsAdmin(), useIsMentor(), etc.
    use-mobile.tsx           # Mobile responsive detection
    use-toast.ts             # Toast notifications
  
  schemas/         # Zod validation + TypeScript types
    User.ts                  # User schema + enums
    LearnerProfile.ts
    Mentor.ts
    Package.ts
    AiPracticeSession.ts     # Practice session data
    MentorFeedback.ts
    ProgressReport.ts
    FeedbackComment.ts
    SystemPolicy.ts
    Report.ts
  
  components/
    RoleBasedSidebar.tsx     # Main sidebar with role-based menu
    ProtectedRoute.tsx       # Route protection wrapper
    AdminLayout.tsx          # Admin layout wrapper
    ui/                      # shadcn/ui pre-built components
  
  pages/
    Index.tsx                # Home/landing
    Login.tsx                # Authentication
    Register.tsx
    admin/
      Dashboard.tsx
      Users.tsx
      Mentors.tsx, Learners.tsx, Packages.tsx
      Reports.tsx, Policies.tsx, Feedbacks.tsx
    learner/
      LearnerDashboard.tsx
      Practice.tsx           # AI practice sessions
      LearningPath.tsx
      Profile.tsx
      Reports.tsx
    mentor/
      MentorDashboard.tsx
      Learners.tsx           # Assigned learners
      Schedule.tsx
      Resources.tsx
      MentorProfile.tsx
  
  lib/
    menuConfig.ts            # Role-based menu definitions
    utils.ts                 # Utility functions
```

## Development Workflows

### Adding a New Feature

1. **Define Schema** (`/src/schemas/NewFeature.ts`)
   ```tsx
   export const NewFeatureSchema = z.object({ ... });
   export type NewFeature = z.infer<typeof NewFeatureSchema>;
   ```

2. **Create Context** (`/src/contexts/NewFeatureContext.tsx`)
   - Add provider with mock data
   - Export hook (e.g., `useNewFeature()`)

3. **Create Page/Component**
   - Wrap with `<ProtectedRoute>` if role-restricted
   - Use context hook to access data
   - Validate form data with schema before submission

4. **Add to Menu** (`/src/lib/menuConfig.ts`)
   - Add MenuItem to appropriate role's menu array

5. **Wire in Routes** (`/src/App.tsx`)
   - Add Route with path + component
   - Use AdminLayout, etc. as wrapper if needed

### Common Patterns

**Getting current user:**
```tsx
const { user, isAuthenticated } = useAuth();
```

**Checking permissions:**
```tsx
const isAdmin = useIsAdmin();
if (!isAdmin) return <Navigate to="/unauthorized" />;
```

**Form validation:**
```tsx
import { UserSchema } from "@/schemas/User";
const form = useForm({ resolver: zodResolver(UserSchema) });
```

**Toast notifications:**
```tsx
import { useToast } from "@/hooks/use-toast";
const { toast } = useToast();
toast({ title: "Success", description: "User created" });
```

## Tech Stack

- **React 18** with TypeScript
- **React Router v6** for navigation
- **Zod** for runtime validation
- **React Hook Form** for form state
- **TanStack React Query** for server state (ready to use)
- **shadcn/ui** + **Radix UI** for components
- **Tailwind CSS** for styling
- **Vite** for build tool
- **Sonner** for toast notifications

## Important Notes

- Mock data is used in all contexts - replace with actual API calls when backend ready
- All enum values use UPPERCASE (e.g., UserRole.ADMIN, not "admin")
- Timestamps should be ISO 8601 format (validate with Zod)
- User deletion uses soft delete (deleted_at field) per schema
- Mentor feedback links both mentor and learner to support bi-directional lookups
