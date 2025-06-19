import { RecipeFormData } from "../controllers/types";

type RecipeErrors = Partial<Record<keyof RecipeFormData, string>>;

export class UserExists extends Error {}

export class RecipeCreationError extends Error {
  errors: RecipeErrors;

  constructor(errors: RecipeErrors) {
    super();
    this.errors = errors;
  }
}
