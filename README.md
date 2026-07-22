# Finance Perso — Frontend

Application web de gestion de finances personnelles : suivi des revenus, des dépenses, de l'épargne (comptes bloqués) et statistiques.

## Fonctionnalités

- Ajouter des revenus (salaire, argent de poche...)
- Ajouter des dépenses (nourriture, transport...)
- Épargne : bloquer un montant jusqu'à une date de déblocage (retrait impossible avant)
- Statistiques : camembert revenus/dépenses + évolution mensuelle en barres
- Voir son solde en temps réel
- Supprimer des transactions

## Stack

React + TypeScript + Tailwind CSS + React Router.

## Lancer le projet

```bash
npm install
npm run dev
```

## Structure

```
src/
  App.tsx               # Routes de l'application
  AppContext.tsx         # Contexte global (revenus, dépenses, épargne)
  Navbar.tsx / Footer.tsx
  Dashboard.tsx          # Vue d'ensemble + solde
  Revenus.tsx / Depenses.tsx
  Epargne.tsx            # Comptes bloqués
  Stats.tsx              # Graphiques (camembert + barres, en SVG natif)
  Apropos.tsx
```

## Backend

Le backend (NestJS + TypeORM + JWT/RBAC) se trouve dans le dossier [`backend/`](./backend) à la racine du dépôt. Il possède son propre `README.md`, son propre `package.json` et son propre historique Git (voir `backend/README.md` pour le détail).

## Répartition du travail (frontend)

| Membre | Tâches |
|---|---|
| Cheikh Ahmed Tidiane BANE (chef) | Dashboard, page Statistiques, contexte global (données), navigation, déploiement |
| Maguette THIAW | Pages Revenus, Dépenses, Épargne |
| Ndeye Khady SECK | Navbar, Footer, page À propos |

## Git flow

- `main` : version stable
- `dev` : intégration des fonctionnalités
- `feature/*` : une branche par fonctionnalité/membre (ex: `feature/epargne-maguette`, `feature/statistiques-cheikh`, `feature/navigation-cheikh`, `feature/apropos-ndeyekhady`)

Chaque fonctionnalité est développée sur sa branche `feature/*`, puis fusionnée dans `dev`, puis dans `main` une fois validée.

## Pousser votre branche sur GitHub (après réception du zip)

Le dépôt distant existe déjà (`origin` = `https://github.com/cheikhbane09-maker/finance-perso.git`). Après avoir dézippé le projet, chaque membre lance :

```bash
git checkout feature/epargne-maguette   # ou votre branche : feature/statistiques-cheikh / feature/navigation-cheikh / feature/apropos-ndeyekhady
git push -u origin feature/epargne-maguette
```

(Vérifiez d'avoir bien un accès en écriture au dépôt `finance-perso` ; sinon demandez au chef de vous ajouter comme collaborateur.)
