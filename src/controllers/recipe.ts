import { Request, Response } from "express";
import { CommentFormData, RecipeFormData, SearchFilters } from "./types";
import {
  createRecipe,
  getRecipeDetails,
  saveComment,
  searchRecipes,
} from "../services/recipe";
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

  const { recipe, comments } = (await getRecipeDetails(recipeId)) ?? {};

  // TODO make 404 screen
  if (!recipe) {
    return res.redirect("/");
  }

  return res.render("recipe/index", { recipe, comments });
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

export const handlePostComment = async (req: Request, res: Response) => {
  const recipeId = strToNum(req.params.id);

  if (!recipeId) {
    return res.redirect("/");
  }

  if (!req.session.user) {
    return res.redirect("/login");
  }

  const { text } = req.body as CommentFormData;
  const userEmail = req.session.user.email;

  try {
    await saveComment(text, recipeId, userEmail);
  } catch {}

  return res.redirect(`/recipe/${recipeId}`);
};

export const renderSearch = async (req: Request, res: Response) => {
  const filters = req.query as SearchFilters;
  const matchingRecipes = await searchRecipes(filters);

  res.render("recipe/search/index", { recipes: matchingRecipes });
};
