import AppDataSource from "../config/data-source";
import { RecipeFormData } from "../controllers/types";
import { Recipe } from "../models/Recipe";
import { RecipeCreationError } from "./errors";
import { User } from "../models/User";
var os = require("os");

const recipeRepository = AppDataSource.getRepository(Recipe);
const userRepositoru = AppDataSource.getRepository(User);

const processDashData = (data: string) => {
  return data
    .split(os.EOL)
    .map((item) => item.replace("-", ""))
    .map((item) => item.trim())
    .filter((item) => !!item);
};

export const createRecipe = async (
  recipe: RecipeFormData,
  email: string,
  image?: Express.Multer.File
) => {
  const errors: Partial<Record<keyof RecipeFormData, string>> = {};

  if (!image) {
    errors.image = "Image of the dish is required";
  }

  const processedSteps = processDashData(recipe.steps);
  if (processedSteps.length === 0) {
    errors.steps = "At least one step is required";
  }

  const processedIngredients = processDashData(recipe.ingredients);
  if (processedIngredients.length === 0) {
    errors.ingredients = "At least one ingredient is required";
  }

  if (recipe.name.length < 3) {
    errors.name = "A valid recipe name should contain at least 3 characters";
  }

  if (recipe.time < 5 || recipe.time > 1440) {
    errors.time =
      "Preparation time should not be smaller than 5 min and bigger than 24h";
  }

  if (Object.keys(errors).length > 0) {
    throw new RecipeCreationError(errors);
  }

  const matchingUser = await userRepositoru.findOneBy({ email });

  if (!matchingUser) {
    throw new Error();
  }

  console.log("RECIPE OBJ", recipe);
  const dbRecipe = new Recipe();
  dbRecipe.name = recipe.name;
  dbRecipe.image = image!.filename;
  dbRecipe.description = recipe.description;
  dbRecipe.description = recipe.description;
  dbRecipe.mealType = recipe.mealType;
  dbRecipe.level = recipe.level;
  dbRecipe.storeAvailability = recipe.storeAvailability;
  dbRecipe.time = recipe.time;
  dbRecipe.ingredeints = processedIngredients;
  dbRecipe.steps = processedSteps;

  dbRecipe.author = matchingUser;

  const savedRecipe = await recipeRepository.save(dbRecipe);
  return savedRecipe;
};
