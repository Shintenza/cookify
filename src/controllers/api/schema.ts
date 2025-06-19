import { z } from "zod";
import { MealType, SkillLevel, StoreAvailability } from "../../types/recipe";

export const recipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  mealType: z.nativeEnum(MealType),
  level: z.nativeEnum(SkillLevel),
  storeAvailability: z.nativeEnum(StoreAvailability),
  time: z.number().int().positive(),
  ingredeints: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
});
