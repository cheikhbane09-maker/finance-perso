import { createContext, useContext, useEffect, useState } from "react";

export type Transaction = {
  id: number;
  nom: string;
  montant: number;
  date: string; // ISO string, ex: 2026-07-22
};

export type Epargne = {
  id: number;
  nom: string;
  montant: number;
  dateCreation: string; // ISO string
  dateDeblocage: string; // ISO string - date à partir de laquelle le retrait est possible
};

type ContextType = {
  revenus: Transaction[];
  depenses: Transaction[];
  epargnes: Epargne[];
  ajouterRevenu: (nom: string, montant: number) => void;
  ajouterDepense: (nom: string, montant: number) => void;
  supprimerRevenu: (id: number) => void;
  supprimerDepense: (id: number) => void;
  ajouterEpargne: (nom: string, montant: number, dateDeblocage: string) => void;
  retirerEpargne: (id: number) => { ok: boolean; message: string };
  estDebloquee: (epargne: Epargne) => boolean;
};

const AppContext = createContext<ContextType | null>(null);

function chargerDepuisStorage<T>(cle: string, valeurParDefaut: T): T {
  try {
    const saved = localStorage.getItem(cle);
    return saved ? (JSON.parse(saved) as T) : valeurParDefaut;
  } catch {
    return valeurParDefaut;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [revenus, setRevenus] = useState<Transaction[]>(() =>
    chargerDepuisStorage("app_revenus", [])
  );
  const [depenses, setDepenses] = useState<Transaction[]>(() =>
    chargerDepuisStorage("app_depenses", [])
  );
  const [epargnes, setEpargnes] = useState<Epargne[]>(() =>
    chargerDepuisStorage("app_epargnes", [])
  );

  useEffect(() => {
    localStorage.setItem("app_revenus", JSON.stringify(revenus));
  }, [revenus]);

  useEffect(() => {
    localStorage.setItem("app_depenses", JSON.stringify(depenses));
  }, [depenses]);

  useEffect(() => {
    localStorage.setItem("app_epargnes", JSON.stringify(epargnes));
  }, [epargnes]);

  const ajouterRevenu = (nom: string, montant: number) => {
    setRevenus([...revenus, { id: Date.now(), nom, montant, date: new Date().toISOString() }]);
  };

  const ajouterDepense = (nom: string, montant: number) => {
    setDepenses([...depenses, { id: Date.now(), nom, montant, date: new Date().toISOString() }]);
  };

  const supprimerRevenu = (id: number) => {
    setRevenus(revenus.filter((r) => r.id !== id));
  };

  const supprimerDepense = (id: number) => {
    setDepenses(depenses.filter((d) => d.id !== id));
  };

  const estDebloquee = (epargne: Epargne) => {
    return new Date(epargne.dateDeblocage).getTime() <= Date.now();
  };

  const ajouterEpargne = (nom: string, montant: number, dateDeblocage: string) => {
    setEpargnes([
      ...epargnes,
      {
        id: Date.now(),
        nom,
        montant,
        dateCreation: new Date().toISOString(),
        dateDeblocage,
      },
    ]);
  };

  const retirerEpargne = (id: number) => {
    const epargne = epargnes.find((e) => e.id === id);
    if (!epargne) return { ok: false, message: "Compte introuvable." };

    if (!estDebloquee(epargne)) {
      const dateFr = new Date(epargne.dateDeblocage).toLocaleDateString("fr-FR");
      return {
        ok: false,
        message: `Ce compte est bloqué jusqu'au ${dateFr}. Retrait impossible avant cette date.`,
      };
    }

    setEpargnes(epargnes.filter((e) => e.id !== id));
    return { ok: true, message: "Retrait effectué avec succès." };
  };

  return (
    <AppContext.Provider
      value={{
        revenus,
        depenses,
        epargnes,
        ajouterRevenu,
        ajouterDepense,
        supprimerRevenu,
        supprimerDepense,
        ajouterEpargne,
        retirerEpargne,
        estDebloquee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext)!;
}