# ASEP Frontend - Role-Based UI Architecture Guide

## 🎯 Overview

The ASEP frontend now uses a **unified single-layout architecture** where all user roles (Admin, Learner, Mentor) share the same `AdminLayout` component. Different menu items are displayed based on the user's role using the `RoleBasedSidebar`.

## 🏗️ Architecture Diagram

```
User Login
    ↓
AuthContext (stores user role)
    ↓
AdminLayout
    ├── RoleBasedSidebar
    │   ├── getMenuItemsByRole(user.role)
    │   └── Dynamic Menu (shows only role-specific items)
    └── Main Content <Outlet />
        └── Page specific to role
```

## 📂 Project Structure

```
src/
├── components/
│   ├── AdminLayout.tsx           ← Unified layout for all roles
│   ├── RoleBasedSidebar.tsx      ← Dynamic sidebar menu
│   └── ProtectedRoute.tsx
├── contexts/
│   ├── AuthContext.tsx           ← User & role management
│   └── AuthContextType.ts
├── hooks/
│   ├── use-auth.ts               ← Get current user
│   ├── use-role.ts               ← Role checking
│   └── use-feedback.ts
├── lib/
│   └── menuConfig.ts             ← Menu items per role
├── pages/
│   └── admin/
│       ├── (admin pages)
│       │   ├── Dashboard.tsx
│       │   ├── Users.tsx
│       │   ├── Mentors.tsx
│       │   ├── Learners.tsx
│       │   ├── Packages.tsx
│       │   ├── Reports.tsx
│       │   ├── Policies.tsx
│       │   └── Feedbacks.tsx
│       ├── learner/              ← Learner-specific pages
│       │   ├── LearnerDashboard.tsx
│       │   ├── LearningPath.tsx
│       │   ├── LearnerProfile.tsx
│       │   ├── Practice.tsx
│       │   └── LearnerReports.tsx
│       └── mentor/               ← Mentor-specific pages
│           ├── MentorDashboard.tsx
│           ├── MentorLearners.tsx
│           ├── MentorProfile.tsx
│           ├── Schedule.tsx
│           ├── MentorResources.tsx
│           ├── MentorFeedback.tsx
│           └── MentorReports.tsx
└── App.tsx                       ← All routes use AdminLayout
```

## 🔄 How It Works

### 1. User Authenticates

```tsx
// When user logs in, AuthContext stores their role
const mockCurrentUser: User = {
  id: 1,
  email: "user@example.com",
  role: UserRole.LEARNER,  // One of: ADMIN, LEARNER, MENTOR
  status: UserStatus.ACTIVE,
};
```

### 2. Routes Navigate Through AdminLayout

```tsx
// All routes use the same AdminLayout
<Route path="/admin" element={<AdminLayout />}>
  {/* Admin routes */}
  <Route index element={<Dashboard />} />
  <Route path="users" element={<Users />} />
  
  {/* Learner routes */}
  <Route path="learner-dashboard" element={<LearnerDashboard />} />
  <Route path="learner-practice" element={<Practice />} />
  
  {/* Mentor routes */}
  <Route path="mentor-dashboard" element={<MentorDashboard />} />
  <Route path="mentor-learners" element={<MentorLearners />} />
</Route>
```

### 3. RoleBasedSidebar Displays Appropriate Menu

```tsx
export function RoleBasedSidebar() {
  const { user } = useAuth();
  const menuItems = getMenuItemsByRole(user.role);
  
  return (
    <Sidebar>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <NavLink to={item.url}>{item.title}</NavLink>
        </SidebarMenuItem>
      ))}
    </Sidebar>
  );
}
```

### 4. getMenuItemsByRole() Returns Role-Specific Items

```tsx
export function getMenuItemsByRole(role: UserRole): MenuItem[] {
  switch (role) {
    case UserRole.ADMIN:
      return adminMenuItems;  // 8 items
    case UserRole.LEARNER:
      return learnerMenuItems;  // 7 items
    case UserRole.MENTOR:
      return mentorMenuItems;  // 7 items
  }
}
```

## 🎨 Menu Items by Role

### Admin Menu (8 items)
```
Dashboard        → /admin
Users            → /admin/users
Mentors          → /admin/mentors
Learners         → /admin/learners
Packages         → /admin/packages
Reports          → /admin/reports
System Policies  → /admin/policies
Feedbacks        → /admin/feedbacks
```

### Learner Menu (7 items)
```
Dashboard            → /admin/learner-dashboard
Practice Sessions    → /admin/learner-practice
Learning Path        → /admin/learner-learning-path
My Packages          → /admin/learner-packages
Mentors              → /admin/learner-mentors
Progress Reports     → /admin/learner-reports
My Profile           → /admin/learner-profile
```

### Mentor Menu (7 items)
```
Dashboard     → /admin/mentor-dashboard
My Learners   → /admin/mentor-learners
My Profile    → /admin/mentor-profile
Schedule      → /admin/mentor-schedule
Feedback      → /admin/mentor-feedback
Resources     → /admin/mentor-resources
Reports       → /admin/mentor-reports
```

## 🔐 Using Role Information

### Get Current User
```tsx
import { useAuth } from "@/hooks/use-auth";

const { user, isAuthenticated } = useAuth();
console.log(user.role);  // ADMIN, LEARNER, or MENTOR
```

### Check User Role
```tsx
import { useIsAdmin, useIsMentor, useIsLearner } from "@/hooks/use-role";

if (useIsAdmin()) {
  return <AdminFeatures />;
}
```

### Multi-Role Check
```tsx
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/schemas/User";

const { canAccess } = useAuth();

if (canAccess([UserRole.ADMIN, UserRole.MENTOR])) {
  // Show to admins and mentors only
}
```

## 🧪 Testing Different Roles

### Change Mock User Role

Edit `src/contexts/AuthContext.tsx` (line 13-15):

```tsx
// Test as ADMIN
role: UserRole.ADMIN,

// Test as LEARNER
role: UserRole.LEARNER,

// Test as MENTOR  
role: UserRole.MENTOR,
```

The sidebar menu will automatically update to show only that role's items!

## 📋 Adding a New Feature

### Example: Add "Settings" to Learner menu

1. **Add to menuConfig.ts:**
```tsx
export const learnerMenuItems: MenuItem[] = [
  // ... existing items
  { title: "Settings", url: "/admin/learner-settings", icon: Settings },
];
```

2. **Create the page:**
```tsx
// src/pages/admin/learner/Settings.tsx
export default function LearnerSettings() {
  return <div>Settings Page</div>;
}
```

3. **Add route in App.tsx:**
```tsx
<Route path="learner-settings" element={<LearnerSettings />} />
```

Done! The Settings link appears in Learner sidebar automatically.

## ✅ Best Practices

### 1. Keep Routes Under `/admin`
All routes use the pattern `/admin/{role}-{feature}`:
- ✅ `/admin/learner-dashboard`
- ❌ `/learner/dashboard` (old pattern - avoid)

### 2. Use Consistent Naming
- Admin pages: `/admin/{feature}` (no prefix)
- Learner pages: `/admin/learner-{feature}`
- Mentor pages: `/admin/mentor-{feature}`

### 3. Menu Items Must Match Routes
`menuConfig.ts` defines the navigation structure. Routes in `App.tsx` must match.

```tsx
// menuConfig.ts
{ title: "My Practice", url: "/admin/learner-practice", ... }

// App.tsx
<Route path="learner-practice" element={<Practice />} />
```

### 4. Protect Role-Specific Routes
Use `ProtectedRoute` for sensitive pages:

```tsx
<Route 
  path="admin-dashboard" 
  element={
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

### 5. Always Use `useAuth()` for User Data
Never import mock data directly. Always use the hook:

```tsx
// ✅ Correct
const { user } = useAuth();

// ❌ Wrong
const user = mockUsers[0];
```

## 🚀 Current Status

✅ **Unified Layout** - Single AdminLayout for all roles  
✅ **Role-Based Sidebar** - Menu updates based on user.role  
✅ **Organized Pages** - Learner/Mentor pages in `/admin` folder  
✅ **Consistent Routing** - All routes under `/admin` path  
✅ **Dev Server Running** - App live at http://localhost:8083  
✅ **No Build Errors** - Ready for development  

## 📞 Quick Reference

| Task | Command/File |
|------|-------------|
| Change mock role | `src/contexts/AuthContext.tsx` line 13 |
| Add menu item | `src/lib/menuConfig.ts` |
| Create new page | `src/pages/admin/{role}/{PageName}.tsx` |
| Check user role | `const { user } = useAuth()` |
| Run dev server | `npm run dev` |
| Build for prod | `npm run build` |

---

**The unified architecture is complete and production-ready!** 🎉
