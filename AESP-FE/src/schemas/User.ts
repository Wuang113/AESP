
import { z } from "zod";

export enum UserRole {
  ADMIN = "ADMIN",
  MENTOR = "MENTOR",
  LEARNER = "LEARNER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

// Schema Zod để validate object User
export const UserSchema = z.object({
  id: z.number().optional(), 
  email: z.string().email().max(100),
  password: z.string().max(255),  
  name: z.string().optional(),
  role: z.nativeEnum(UserRole).default(UserRole.LEARNER),
  avatarUrl: z.string().url().optional(),
  status: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
  deletedAt: z.string().datetime().nullable().optional(), 
});

export type User = z.infer<typeof UserSchema>;
