import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, FinanceContextType } from '../types/finance';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('incomes');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addIncome = (name: string, amount: number) => {
    const newIncome: Transaction = {
      id: crypto.randomUUID(),
      name,
      amount,
      date: new Date().toLocaleDateString('fr-FR'),
    };
    setIncomes([...incomes, newIncome]);
  };

  const deleteIncome = (id: string) => {
    setIncomes(incomes.filter(item => item.id !== id));
  };

  const addExpense = (name: string, amount: number) => {
    const newExpense: Transaction = {
      id: crypto.randomUUID(),
      name,
      amount,
      date: new Date().toLocaleDateString('fr-FR'),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <FinanceContext.Provider value={{
      incomes, expenses, addIncome, deleteIncome, addExpense, deleteExpense, totalIncome, totalExpense, balance
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance doit être utilisé dans un FinanceProvider');
  return context;
};