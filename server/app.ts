import { Hono } from "hono";
import { logger } from "hono/logger";

import expensesRouter from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => c.text("Hello Bun!"));
app.route("/api/expenses", expensesRouter);

export default app;
