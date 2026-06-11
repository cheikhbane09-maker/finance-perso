export default function Apropos() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold underline text-violet-900 mb-4 ">À propos du projet</h1>

      <p className="mb-4">
        Cette application de finance personnelle a été réalisée dans le cadre d’un projet de développement web.

Elle permet aux utilisateurs de gérer facilement leurs revenus et leurs dépenses, afin de mieux suivre leur budget au quotidien.

Grâce à cette application, il est possible : <p>
- d’ajouter des revenus (salaire, argent de poche, etc.) </p>
<p>
- d’ajouter des dépenses (transport, nourriture, loisirs, etc.) </p>
<p>
- de visualiser le solde en temps réel </p>
<p>
- de supprimer des transactions </p>

Ce projet a été développé avec React, TypeScript et Tailwind CSS.

Il a pour objectif de renforcer nos compétences en développement front-end et en gestion d’état dans une application web.
      </p>

      <h2 className="text-xl font-semibold underline text-violet-900 mb-2">Technologies utilisées</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
      </ul>

      <h2 className="text-xl font-semibold underline text-violet-900 mb-2">Équipe</h2>
      <ul className="list-disc ml-6">
        <li>Cheikh Ahmed Tidiane BANE (chef de projet)</li>
        <li>Ndeye Khady SECK</li>
        <li>Maguette THIAW</li>
      </ul>
    </div>
  );
}