import { Request, Response } from "express";
import { RecipeFormData } from "./types";
import { createRecipe } from "../services/recipe";
import { RecipeCreationError } from "../services/errors";

export const renderRecipeForm = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("recipe/create/index");
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
