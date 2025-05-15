export type Invoice = {
  id: number;
  amount: number;
  status: "pending" | "paid";
  description: string;
  from: string;
  date: Date;
}