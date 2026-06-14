import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TransactionPageLayout } from '../components/TransactionPageLayout';

export const Incomes: React.FC = () => {
  const { incomes, addIncome, deleteIncome } = useFinance();
  
  return (
    <TransactionPageLayout
      title="Gestion des Revenus"
      transactions={incomes}
      onAdd={addIncome}
      onDelete={deleteIncome}
      themeColor="green"
    />
  );
};