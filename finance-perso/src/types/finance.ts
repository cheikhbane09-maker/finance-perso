export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface FinanceContextType {
  incomes: Transaction[];
  expenses: Transaction[];
  addIncome: (name: string, amount: number) => void;
  deleteIncome: (id: string) => void;
  addExpense: (name: string, amount: number) => void;
  deleteExpense: (id: string) => void;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}