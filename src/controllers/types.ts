import { MealType, SkillLevel, StoreAvailability } from "../types/recipe";

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RecipeFormData = {
  name: string;
  description: string;
  image: File;
  mealType: MealType;
  level: SkillLevel;
  storeAvailability: StoreAvailability;
  ingredients: string;
  steps: string;
  time: number;
};

export type HomeCardDetails = Pick<RecipeFormData, "name" | "time" | "level">;

export type CommentFormData = {
  text: string;
};

export type SearchFilters = {
  name?: string;
  mealType?: MealType;
  level?: SkillLevel;
};
