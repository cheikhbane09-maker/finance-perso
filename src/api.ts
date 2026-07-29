// Petite couche d'accès à l'API backend NestJS.
// En développement, le backend tourne sur http://localhost:3000 (npm run start:dev dans /backend).
// Pour un déploiement (ex: Render), définir VITE_API_URL dans un fichier .env à la racine du frontend.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const TOKEN_KEY = "fp_token";
const USER_KEY = "fp_user";

export type Utilisateur = { id: number; email: string; role: string };

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUtilisateur(): Utilisateur | null {
  const brut = localStorage.getItem(USER_KEY);
  return brut ? JSON.parse(brut) : null;
}

export function estConnecte(): boolean {
  return !!getToken();
}

function sauvegarderSession(access_token: string, user: Utilisateur) {
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function deconnexion() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Extrait le message d'erreur renvoyé par le ValidationPipe / les exceptions NestJS
// (soit une chaîne, soit un tableau de messages de validation).
async function extraireErreur(reponse: Response): Promise<string> {
  try {
    const corps = await reponse.json();
    if (Array.isArray(corps.message)) return corps.message.join(" ");
    return corps.message || "Une erreur est survenue.";
  } catch {
    return "Une erreur est survenue.";
  }
}

async function appel<T>(chemin: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const reponse = await fetch(`${API_URL}${chemin}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!reponse.ok) {
    throw new Error(await extraireErreur(reponse));
  }

  if (reponse.status === 204) return undefined as T;
  return reponse.json() as Promise<T>;
}

// --- Auth ---
export async function inscription(email: string, password: string, nom: string) {
  const data = await appel<{ access_token: string; user: Utilisateur }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, nom }),
  });
  sauvegarderSession(data.access_token, data.user);
  return data;
}

export async function connexion(email: string, password: string) {
  const data = await appel<{ access_token: string; user: Utilisateur }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  sauvegarderSession(data.access_token, data.user);
  return data;
}

// --- Transactions ---
export type TransactionAPI = {
  id: number;
  type: "revenu" | "depense";
  nom: string;
  montant: number;
  date: string;
};

export function listerTransactions() {
  return appel<TransactionAPI[]>("/transactions");
}

export function creerTransaction(type: "revenu" | "depense", nom: string, montant: number) {
  return appel<TransactionAPI>("/transactions", {
    method: "POST",
    body: JSON.stringify({ type, nom, montant }),
  });
}

export function supprimerTransactionAPI(id: number) {
  return appel<void>(`/transactions/${id}`, { method: "DELETE" });
}

// --- Épargne ---
export type EpargneAPI = {
  id: number;
  nom: string;
  montant: number;
  dateCreation: string;
  dateDeblocage: string;
  debloque: boolean;
};

export function listerEpargnes() {
  return appel<EpargneAPI[]>("/epargne");
}

export function creerEpargne(nom: string, montant: number, dateDeblocage: string) {
  return appel<EpargneAPI>("/epargne", {
    method: "POST",
    body: JSON.stringify({ nom, montant, dateDeblocage }),
  });
}

export function supprimerEpargneAPI(id: number) {
  return appel<{ message: string }>(`/epargne/${id}`, { method: "DELETE" });
}
