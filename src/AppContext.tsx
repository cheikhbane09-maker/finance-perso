import { createContext, useContext, useEffect, useState } from "react";
import {
  estConnecte,
  listerTransactions,
  creerTransaction,
  supprimerTransactionAPI,
  listerEpargnes,
  creerEpargne,
  supprimerEpargneAPI,
} from "./api";

export type Transaction = {
  id: number;
  nom: string;
  montant: number;
  date: string; // ISO string
};

export type Epargne = {
  id: number;
  nom: string;
  montant: number;
  dateCreation: string;
  dateDeblocage: string;
};

type ContextType = {
  revenus: Transaction[];
  depenses: Transaction[];
  epargnes: Epargne[];
  chargement: boolean;
  ajouterRevenu: (nom: string, montant: number) => Promise<void>;
  ajouterDepense: (nom: string, montant: number) => Promise<void>;
  supprimerRevenu: (id: number) => Promise<void>;
  supprimerDepense: (id: number) => Promise<void>;
  ajouterEpargne: (nom: string, montant: number, dateDeblocage: string) => Promise<void>;
  retirerEpargne: (id: number) => Promise<{ ok: boolean; message: string }>;
  estDebloquee: (epargne: Epargne) => boolean;
};

const AppContext = createContext<ContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [revenus, setRevenus] = useState<Transaction[]>([]);
  const [depenses, setDepenses] = useState<Transaction[]>([]);
  const [epargnes, setEpargnes] = useState<Epargne[]>([]);
  const [chargement, setChargement] = useState(true);

  // Au montage (si connecté), on récupère les données depuis le backend NestJS
  // au lieu du localStorage — le backend est maintenant la source de vérité.
  useEffect(() => {
    if (!estConnecte()) {
      setChargement(false);
      return;
    }

    Promise.all([listerTransactions(), listerEpargnes()])
      .then(([transactions, ep]) => {
        setRevenus(
          transactions
            .filter((t) => t.type === "revenu")
            .map((t) => ({ id: t.id, nom: t.nom, montant: t.montant, date: t.date }))
        );
        setDepenses(
          transactions
            .filter((t) => t.type === "depense")
            .map((t) => ({ id: t.id, nom: t.nom, montant: t.montant, date: t.date }))
        );
        setEpargnes(
          ep.map((e) => ({
            id: e.id,
            nom: e.nom,
            montant: e.montant,
            dateCreation: e.dateCreation,
            dateDeblocage: e.dateDeblocage,
          }))
        );
      })
      .catch((err) => console.error("Erreur de chargement des données :", err))
      .finally(() => setChargement(false));
  }, []);

  const ajouterRevenu = async (nom: string, montant: number) => {
    const t = await creerTransaction("revenu", nom, montant);
    setRevenus((prev) => [...prev, { id: t.id, nom: t.nom, montant: t.montant, date: t.date }]);
  };

  const ajouterDepense = async (nom: string, montant: number) => {
    const t = await creerTransaction("depense", nom, montant);
    setDepenses((prev) => [...prev, { id: t.id, nom: t.nom, montant: t.montant, date: t.date }]);
  };

  const supprimerRevenu = async (id: number) => {
    await supprimerTransactionAPI(id);
    setRevenus((prev) => prev.filter((r) => r.id !== id));
  };

  const supprimerDepense = async (id: number) => {
    await supprimerTransactionAPI(id);
    setDepenses((prev) => prev.filter((d) => d.id !== id));
  };

  const estDebloquee = (epargne: Epargne) => {
    return new Date(epargne.dateDeblocage).getTime() <= Date.now();
  };

  const ajouterEpargne = async (nom: string, montant: number, dateDeblocage: string) => {
    const e = await creerEpargne(nom, montant, dateDeblocage);
    setEpargnes((prev) => [
      ...prev,
      { id: e.id, nom: e.nom, montant: e.montant, dateCreation: e.dateCreation, dateDeblocage: e.dateDeblocage },
    ]);
  };

  const retirerEpargne = async (id: number) => {
    try {
      const resultat = await supprimerEpargneAPI(id);
      setEpargnes((prev) => prev.filter((e) => e.id !== id));
      return { ok: true, message: resultat.message };
    } catch (err) {
      return { ok: false, message: (err as Error).message };
    }
  };

  return (
    <AppContext.Provider
      value={{
        revenus,
        depenses,
        epargnes,
        chargement,
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
