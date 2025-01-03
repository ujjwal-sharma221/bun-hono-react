import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export default function App() {
  const [total, setTotal] = useState(0);
  return (
    <div className="h-screen items-center flex justify-center">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>
            The total amount of money you have spent
          </CardDescription>
        </CardHeader>
        <CardContent>{total}</CardContent>
      </Card>
    </div>
  );
}
