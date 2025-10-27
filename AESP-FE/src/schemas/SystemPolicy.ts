import { z } from "zod";

export const SystemPolicySchema = z.object({
  id: z.number().optional(), 

  title: z
    .string()
    .min(1, "Tiêu đề chính sách không được để trống"),

  content: z
    .string()
    .min(1, "Nội dung chính sách không được để trống"),
});


export type SystemPolicy = z.infer<typeof SystemPolicySchema>;
