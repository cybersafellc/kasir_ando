import { logger } from "../app/logging.js";
import { ApiError, PageError } from "../errors/response.error.js";
import { Response } from "../utils/response.template.js";

async function NotFound(req, res, next) {
  try {
    throw new PageError(404, "Page Not Found");
  } catch (error) {
    next(error);
  }
}

async function ErrorHandler(err, req, res, next) {
  if (!err) {
    next();
    return;
  }
  if (err instanceof PageError) {
    if (err.message.toLowerCase() === "dibutuhkan akses token valid") {
      res.redirect("/login");
      return;
    }
    const response = new Response(err.status, err.message, null, null, true);
    res.status(response.status).render("error", { ...response });
  } else if (err instanceof ApiError) {
    const response = new Response(err.status, err.message, null, null, true);
    res.status(response.status).json(response).end();
  } else {
    const response = new Response(500, err.message, null, false, true);
    logger.error(response.message);
    res.status(response.status).render("error", { ...response });
  }
}

export default { NotFound, ErrorHandler };
