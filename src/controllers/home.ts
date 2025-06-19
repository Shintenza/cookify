import { Response, Request } from "express";
import { getPaginatedRecipes } from "../services/recipe";

export const renderHome = async (req: Request, res: Response) => {
  const pageParam = req.query.page as string;
  const parsedPageParam = parseInt(pageParam);
  const { recipes, count } = await getPaginatedRecipes(
    !isNaN(parsedPageParam) ? parsedPageParam : undefined
  );

  res.render("home/index", { recipes, count });
};
