import { z } from "zod";

export class UserSchemas {
  public static readonly emailSchema = z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters");

  public static readonly nameSchema = z
    .string()
    .min(2, "Name must have at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");

  public static readonly userIdSchema = z
    .string()
    .uuid("User ID must be a valid UUID");

  public static readonly passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters");

  public static readonly createUserSchema = z.object({
    name: this.nameSchema,
    email: this.emailSchema,
    passwordHash: z.string().min(8, "Password hash is required"),
  });

  public static readonly userEntitySchema = z.object({
    id: this.userIdSchema,
    name: this.nameSchema,
    email: this.emailSchema,
    createdAt: z.date(),
    passwordHash: z.string().min(8, "Password hash is required"),
  });
}