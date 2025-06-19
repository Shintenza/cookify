import AppDataSource from "../config/data-source";
import { RecipeFormData, SearchFilters } from "../controllers/types";
import { Recipe } from "../models/Recipe";
import { RecipeCreationError } from "./errors";
import { User } from "../models/User";
import { getImagePath } from "../utils/image";
import { RecipeComment } from "../models/Comment";
import { ILike } from "typeorm";
var os = require("os");

const PAGE_LIMIT = 6;

const recipeRepository = AppDataSource.getRepository(Recipe);
const userRepositoru = AppDataSource.getRepository(User);
const commentRepository = AppDataSource.getRepository(RecipeComment);

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

export const getPaginatedRecipes = async (page?: number) => {
  const pageNumber = page ?? 1;
  const skip = (pageNumber - 1) * PAGE_LIMIT;

  const [data, total] = await recipeRepository.findAndCount({
    skip,
    take: PAGE_LIMIT,
    relations: ["author"],
  });

  return {
    recipes: data.map((recipe) => ({
      ...recipe,
      image: getImagePath(recipe.image),
    })),
    count: total,
  };
};

export const getRecipeDetails = async (id: number) => {
  const recipe = await recipeRepository.findOneBy({ id });
  const comments = await commentRepository.find({
    relations: ["author"],
    where: {
      recipe: {
        id,
      },
    },
  });
  if (recipe) {
    return {
      comments,
      recipe: {
        ...recipe,
        image: getImagePath(recipe?.image),
      },
    };
  } else return null;
};

export const saveComment = async (
  comment: string,
  recipeId: number,
  userEmail: string
) => {
  const user = await userRepositoru.findOneBy({ email: userEmail });
  const recipe = await recipeRepository.findOneBy({ id: recipeId });

  if (!user || !recipe) {
    throw new Error();
  }

  const newComment = new RecipeComment();
  newComment.author = user;
  newComment.recipe = recipe;
  newComment.text = comment;

  await commentRepository.save(newComment);
};

export const searchRecipes = async (filters: SearchFilters) => {
  const matchingRecipes = await recipeRepository.find({
    relations: ["author"],
    where: {
      ...(filters.mealType ? { mealType: filters.mealType } : {}),
      ...(filters.level ? { level: filters.level } : {}),
      ...(filters.name ? { name: ILike(`%${filters.name}%`) } : {}),
    },
  });

  return matchingRecipes.map((recipe) => ({
    ...recipe,
    image: getImagePath(recipe.image),
  }));
};
