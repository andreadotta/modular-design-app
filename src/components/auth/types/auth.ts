// src/components/auth/types/auth.ts

import { z } from 'zod';

export const AuthUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
});

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  user: AuthUserSchema.optional(),
  error: z.string().optional(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
