import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number(),
  title: z.string(),
  amount: z.number(),
});

type Expenses = z.infer<typeof expenseSchema>;
const createExpenseSchema = expenseSchema.omit({ id: true });

const expenses: Expenses[] = [
  { id: 1, title: "Groceries", amount: 150 },
  { id: 2, title: "Rent", amount: 1200 },
  { id: 3, title: "Utilities", amount: 200 },
  { id: 4, title: "Transportation", amount: 100 },
  { id: 5, title: "Dining Out", amount: 75 },
  { id: 6, title: "Subscription Services", amount: 50 },
  { id: 7, title: "Gym Membership", amount: 60 },
  { id: 8, title: "Internet Bill", amount: 80 },
  { id: 9, title: "Phone Bill", amount: 90 },
  { id: 10, title: "Entertainment", amount: 120 },
];

const expensesRouter = new Hono()
  .get("/", (c) => {
    return c.json({ expenses });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const sanitisedId = Number.parseInt(id);

    const expense = expenses.find((e) => e.id === sanitisedId);
    if (!expense) return c.notFound();

    return c.json({ expense });
  })
  .get("/total", (c) => {
    const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    return c.json({ total });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json");
    expenses.push({ ...expense, id: expenses.length + 1 });
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");
    const sanitisedId = Number.parseInt(id);

    const index = expenses.findIndex((e) => e.id === sanitisedId);
    if (!index) return c.notFound();

    const deletedExpense = expenses.splice(index, 1);

    return c.json({ deletedExpense });
  });

export default expensesRouter;
