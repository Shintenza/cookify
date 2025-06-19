import { Response, Request } from "express";
import { getPaginatedRecipes, PAGE_LIMIT } from "../services/recipe";

export const renderHome = async (req: Request, res: Response) => {
  const pageParam = req.query.page as string;
  const parsedPageParam = parseInt(pageParam);

  const { recipes, count } = await getPaginatedRecipes(
    !isNaN(parsedPageParam) ? parsedPageParam : undefined
  );

  res.render("home/index", {
    recipes,
    pagination: {
      currentPage: pageParam ?? 1,
      total: count,
      limit: PAGE_LIMIT,
    },
  });
};
