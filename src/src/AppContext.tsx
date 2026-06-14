import { createContext, useContext, useState } from "react";

type Transaction = {
  id: number;
  nom: string;
  montant: number;
};

type ContextType = {
  revenus: Transaction[];
  depenses: Transaction[];
  ajouterRevenu: (nom: string, montant: number) => void;
  ajouterDepense: (nom: string, montant: number) => void;
  supprimerRevenu: (id: number) => void;
  supprimerDepense: (id: number) => void;
};

const AppContext = createContext<ContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [revenus, setRevenus] = useState<Transaction[]>([]);
  const [depenses, setDepenses] = useState<Transaction[]>([]);

  const ajouterRevenu = (nom: string, montant: number) => {
    setRevenus([...revenus, { id: Date.now(), nom, montant }]);
  };

  const ajouterDepense = (nom: string, montant: number) => {
    setDepenses([...depenses, { id: Date.now(), nom, montant }]);
  };

  const supprimerRevenu = (id: number) => {
    setRevenus(revenus.filter((r) => r.id !== id));
  };

  const supprimerDepense = (id: number) => {
    setDepenses(depenses.filter((d) => d.id !== id));
  };

  return (
    <AppContext.Provider value={{ revenus, depenses, ajouterRevenu, ajouterDepense, supprimerRevenu, supprimerDepense }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext)!;
}