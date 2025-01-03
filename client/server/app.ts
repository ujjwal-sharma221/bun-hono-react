import { Hono } from "hono";
import { logger } from "hono/logger";

import expensesRouter from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => c.text("Hello Bun!"));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoutes = app.basePath("/api").route("/expenses", expensesRouter);

export default app;
export type ApiRoutes = typeof apiRoutes;
