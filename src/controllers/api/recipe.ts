import { Request, Response } from "express";
import {
  createRecipe,
  getPaginatedRecipes,
  getRecipeDetails,
  removeRecipe,
} from "../../services/recipe";
import { strToNum } from "../../utils/path";
import { RecipeFormData } from "../types";

export const getAllRecipes = async (
  req: Request,
  res: Response
): Promise<any> => {
  const page = req.query.page as string | undefined;
  const parsedPage = strToNum(page);

  const recipes = await getPaginatedRecipes(parsedPage);

  return res.json(recipes).status(200);
};

export const getRecipe = async (req: Request, res: Response): Promise<any> => {
  const recipeId = strToNum(req.params.id);

  if (!recipeId) {
    return res.sendStatus(400);
  }

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) {
    return res.sendStatus(404);
  } else {
    return res.json(recipe).status(200);
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response
): Promise<any> => {
  const recipeId = strToNum(req.params.id);

  try {
    await removeRecipe(recipeId);
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
};

// TODO make this endpoint use preuploaded image
export const postRecipe = async (req: Request, res: Response): Promise<any> => {
  const image = req.file;
  const recipe = req.body.data as string;
  const parsedRecipe = JSON.parse(recipe);

  if (!image) {
    return res.status(400).json({ message: "missing image" });
  }

  try {
    await createRecipe(parsedRecipe, req.user!.email, image);
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(500);
  }
};
