import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipcode: z.string(),
  country: z.string().optional(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: addressSchema,
  phone: z.string(),
  website: z.string().url(),
});

export type Address = z.infer<typeof addressSchema>;
export type User = z.infer<typeof userSchema>;

export type ValidatedUser = User & { validated: boolean; };