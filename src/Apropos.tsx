export default function Apropos() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold underline text-violet-900 mb-4 ">À propos du projet</h1>

      <p className="mb-4">
        Cette application de finance personnelle a été réalisée dans le cadre d’un projet de développement web.

Elle permet aux utilisateurs de gérer facilement leurs revenus, leurs dépenses et leur épargne, afin de mieux suivre leur budget au quotidien.

Grâce à cette application, il est possible : <p>
- d’ajouter des revenus (salaire, argent de poche, etc.) </p>
<p>
- d’ajouter des dépenses (transport, nourriture, loisirs, etc.) </p>
<p>
- de mettre de l'argent de côté sur un compte épargne bloqué jusqu'à une date choisie </p>
<p>
- de visualiser le solde en temps réel ainsi que des statistiques (répartition et évolution mensuelle) </p>
<p>
- de supprimer des transactions </p>

Ce projet a été développé avec React, TypeScript et Tailwind CSS pour le frontend.

Il a pour objectif de renforcer nos compétences en développement front-end et back-end et en gestion d’état dans une application web.
      </p>

      <h2 className="text-xl font-semibold underline text-violet-900 mb-2">Technologies utilisées</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Frontend : React, TypeScript, Tailwind CSS</li>
        <li>Backend : NestJS, TypeORM, PostgreSQL/SQLite, JWT, class-validator</li>
        <li>API externe : ExchangeRate (conversion de devises sur l'épargne)</li>
      </ul>

      <h2 className="text-xl font-semibold underline text-violet-900 mb-2">Répartition du travail</h2>
      <p className="mb-2 font-semibold">Frontend</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Cheikh Ahmed Tidiane BANE (chef) : Dashboard, page Statistiques, gestion des données globales (contexte), navigation, déploiement</li>
        <li>Maguette THIAW : pages Revenus, Dépenses et Épargne (ajout, liste, suppression / blocage)</li>
        <li>Ndeye Khady SECK : Navbar, Footer, page À propos</li>
      </ul>
      <p className="mb-2 font-semibold">Backend (NestJS)</p>
      <ul className="list-disc ml-6">
        <li>Cheikh Ahmed Tidiane BANE : module Auth (JWT, RBAC), module Users, configuration du projet</li>
        <li>Maguette THIAW : module Transactions (revenus/dépenses, CRUD, DTO)</li>
        <li>Ndeye Khady SECK : module Épargne (comptes bloqués) et intégration de l'API externe ExchangeRate</li>
      </ul>

      <h2 className="text-xl font-semibold underline text-violet-900 mb-2 mt-4">Équipe</h2>
      <ul className="list-disc ml-6">
        <li>Cheikh Ahmed Tidiane BANE</li>
        <li>Ndeye Khady SECK</li>
        <li>Maguette THIAW</li>
      </ul>
    </div>
  );
}