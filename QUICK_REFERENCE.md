# ASEP Frontend - Quick Reference

## 🚀 Start Development
```bash
npm run dev
# Visit: http://localhost:8082
```

## 🔐 Authentication

### Get Current User
```tsx
import { useAuth } from "@/hooks/use-auth";

const { user, isAuthenticated, logout } = useAuth();
```

### Check User Role
```tsx
import { useIsAdmin, useIsMentor, useIsLearner } from "@/hooks/use-role";

if (useIsAdmin()) { /* admin only */ }
```

### Multi-Role Check
```tsx
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/schemas/User";

const { canAccess } = useAuth();
if (canAccess([UserRole.ADMIN, UserRole.MENTOR])) { /* ... */ }
```

## 🛡️ Route Protection

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserRole } from "@/schemas/User";

<ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
  <AdminDashboard />
</ProtectedRoute>
```

## 📊 Using Contexts

### Learners
```tsx
import { useLearners } from "@/contexts/LearnerContext";

const { learners, addLearner, updateLearner, removeLearner } = useLearners();
```

### Mentors
```tsx
import { useMentor } from "@/contexts/MentorContext";

const { mentors, addMentor, updateMentor, deleteMentor } = useMentor();
```

### Users (Admin)
```tsx
import { useUsers } from "@/contexts/UserContext";

const { users, deleteUser } = useUsers();
```

### Feedback
```tsx
import { useFeedbackContext } from "@/hooks/use-feedback";

const { feedbacks, approveFeedback, rejectFeedback } = useFeedbackContext();
```

## 🎨 UI Components

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
```

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Form
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas/User";

const form = useForm({
  resolver: zodResolver(UserSchema),
  defaultValues: { email: "", name: "" }
});

<form onSubmit={form.handleSubmit(onSubmit)}>
  {/* form fields */}
</form>
```

### Toast
```tsx
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
  variant: "default" // or "destructive"
});
```

## 📝 Schema Validation

### Using Schemas
```tsx
import { UserSchema, User, UserRole, UserStatus } from "@/schemas/User";

// Validate data
try {
  const user: User = UserSchema.parse(userData);
} catch (error) {
  console.error("Validation failed:", error);
}

// Use enums
if (user.role === UserRole.ADMIN) { /* */ }
if (user.status === UserStatus.ACTIVE) { /* */ }
```

### All Available Schemas
- `UserSchema` - User with role/status enums
- `LearnerProfileSchema` - Learner data
- `MentorSchema` - Mentor data
- `PackageSchema` - Course packages
- `LearnerPackageSchema` - Purchase records
- `AiPracticeSessionSchema` - Practice sessions
- `MentorFeedbackSchema` - Feedback
- `ProgressReportSchema` - Reports
- `FeedbackCommentSchema` - Comments
- `SystemPolicySchema` - Policies
- `ReportSchema` - Admin reports

## 🎯 Common Tasks

### Display User Info
```tsx
const { user } = useAuth();

<div>
  <p>{user?.name}</p>
  <p>{user?.email}</p>
  <Badge>{user?.role}</Badge>
</div>
```

### List Items with Actions
```tsx
<div className="space-y-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardContent className="flex justify-between items-center pt-6">
        <div>{item.name}</div>
        <div className="space-x-2">
          <Button size="sm" onClick={() => edit(item)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => delete(item.id)}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

### Conditional Rendering by Role
```tsx
const { user } = useAuth();

{user?.role === UserRole.ADMIN && <AdminPanel />}
{user?.role === UserRole.LEARNER && <LearnerPanel />}
{user?.role === UserRole.MENTOR && <MentorPanel />}
```

## 🌐 API Integration

Replace mock data with API calls:

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";

// Fetch data
const { data: users, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await fetch("/api/users");
    return res.json();
  }
});

// Mutate data
const createUser = useMutation({
  mutationFn: async (userData) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData)
    });
    return res.json();
  }
});

// Use in component
<Button onClick={() => createUser.mutate(newUser)}>
  Create User
</Button>
```

## 📚 File Locations

| Feature | File |
|---------|------|
| Auth | `src/contexts/AuthContext.tsx` |
| Roles | `src/hooks/use-role.ts` |
| Sidebar | `src/components/RoleBasedSidebar.tsx` |
| Menu Config | `src/lib/menuConfig.ts` |
| Schemas | `src/schemas/*.ts` |
| Contexts | `src/contexts/*.tsx` |
| Hooks | `src/hooks/*.ts` |
| Pages | `src/pages/{admin,learner,mentor}/*.tsx` |
| Components | `src/components/ui/*.tsx` |

## 🧪 Testing Different Roles

Edit `src/contexts/AuthContext.tsx` line 12:

```tsx
// Test Admin
role: UserRole.ADMIN

// Test Learner
role: UserRole.LEARNER

// Test Mentor
role: UserRole.MENTOR
```

## 🔄 Development Flow

1. Create/update schema in `src/schemas/`
2. Create context in `src/contexts/`
3. Add menu items to `src/lib/menuConfig.ts`
4. Create pages in `src/pages/{role}/`
5. Add routes in `src/App.tsx`
6. Use `<ProtectedRoute>` if role-restricted

## 📖 Documentation

- **IMPLEMENTATION_GUIDE.md** - Full development guide
- **CHANGES_SUMMARY.md** - What was changed
- **.github/copilot-instructions.md** - AI agent guide
- **This file** - Quick reference

---

**Happy coding! Questions? Check the full IMPLEMENTATION_GUIDE.md**
