import {z} from "zod";

const petTreatFrequencySchema = z.object({
  frequency: z.enum(["none", "a few", "sometimes", "often"]),
  preferences: z.array(z.string()).default([]),
})

const petPreferenceSchema = z.object({
  true: z.boolean(),
  preferences: z.array(z.string()).default([]),
})

const petAllergiesSchema = z.object({
  true: z.boolean(),
  allergies: z.array(z.string()).default([]),
})

export const petDetailsSchema = z.object({
  name: z.string().nonempty(),
  breed: z.string().nonempty(),
  gender: z.enum(["Boy", "Girl"]),
  birthdayYear: z.number().int().min(1).max(2025),
  birthdayMonth: z.number().int().min(1).max(12),
  size: z.enum(["skinny", "just right", "chubby"]),
  allergies: petAllergiesSchema,
  preferences: petPreferenceSchema,
  treatFrequency: petTreatFrequencySchema,
})

export const subscriptionFormSchema = z.object({
  petType: z.enum(["dog", "cat", "both"]),
  catCount: z.number().int().min(0).max(4),
  dogCount: z.number().int().min(0).max(4),
  petDetails: z.array(petDetailsSchema),
  boxSize: z.enum(["small", "large"]),
  duration: z.enum(["trial", "3", "6", "12"]),
})

export type SubscriptionFormType = z.infer<typeof subscriptionFormSchema>;