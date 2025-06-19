import { Request, Response } from "express";
import { RecipeFormData } from "./types";
import { createRecipe, getRecipeDetails } from "../services/recipe";
import { RecipeCreationError } from "../services/errors";
import { strToNum } from "../utils/path";

export const renderRecipeForm = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("recipe/create/index");
};

export const renderRecipe = async (req: Request, res: Response) => {
  const recipeId = strToNum(req.params.id);

  if (!recipeId) {
    return res.redirect("/");
  }

  const recipe = await getRecipeDetails(recipeId);

  // TODO make 404 screen
  if (!recipe) {
    return res.redirect("/");
  }

  return res.render("recipe/index", { recipe });
};

export const handleRecipeCreation = async (req: Request, res: Response) => {
  const recipeDetails = req.body as RecipeFormData;
  const image = req.file;

  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    const userEmail = req.session.user.email;
    const savedRecipe = await createRecipe(recipeDetails, userEmail, image);
    res.redirect(`/recipe/${savedRecipe.id}`);
  } catch (e) {
    if (e instanceof RecipeCreationError) {
      return res.render("recipe/create/index", { errors: e.errors });
    } else {
      // TODO add better error handling here
      return res.redirect("/");
    }
  }
};
