import { z } from 'zod';

export const userSchema = z.object({
	name: z.string(),
});

export type UserResponse = {
	name: string;
};

export type RegisterVariables = {
	name: string;
	password: string;
};