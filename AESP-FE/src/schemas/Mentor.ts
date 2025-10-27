import { z } from "zod";

export const MentorSchema = z.object({
  id: z.number().int().optional(), 

  user_id: z
    .number()
    .int()
    .refine((val) => !isNaN(val), { message: "user_id phải là số hợp lệ" }),

  bio: z.string().nullable().optional(), 
  skills: z.string().nullable().optional(),

  rating: z
    .number()
    .min(0, { message: "rating phải >= 0" })
    .max(5, { message: "rating tối đa là 5" })
    .nullable()
    .optional(),

  experience_years: z
    .number()
    .int()
    .nonnegative({ message: "experience_years phải >= 0" })
    .nullable()
    .optional(),

  total_students: z
    .number()
    .int()
    .nonnegative({ message: "total_students phải >= 0" })
    .nullable()
    .optional(),

  availability_status: z
    .enum(["AVAILABLE", "BUSY", "INACTIVE"], {
      message: "availability_status phải là: AVAILABLE | BUSY | INACTIVE",
    })
    .default("AVAILABLE"),

  created_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "created_at phải là ISO datetime hợp lệ",
    })
    .optional(),

  updated_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "updated_at phải là ISO datetime hợp lệ",
    })
    .optional(),
});

export type Mentor = z.infer<typeof MentorSchema>;
