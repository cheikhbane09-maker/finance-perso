
  import { Link } from "react-router-dom";
  import { useApp } from "./AppContext";

function Dashboard() {
  const { revenus, depenses, epargnes } = useApp();

  const totalRevenus = revenus.reduce((acc, r) => acc + r.montant, 0);
  const totalDepenses = depenses.reduce((acc, d) => acc + d.montant, 0);
  const totalEpargnes = epargnes.reduce((acc, e) => acc + e.montant, 0);
  const solde = totalRevenus - totalDepenses;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/stats"
          className="text-sm font-semibold text-violet-600 hover:underline"
        >
          Voir les statistiques →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Solde</p>
          <p className="text-2xl font-bold text-blue-600">{solde} FCFA</p>
        </div>
        <div className="bg-green-100 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Revenus</p>
          <p className="text-2xl font-bold text-green-600">{totalRevenus} FCFA</p>
        </div>
        <div className="bg-red-100 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Dépenses</p>
          <p className="text-2xl font-bold text-red-600">{totalDepenses} FCFA</p>
        </div>
        <div className="bg-indigo-100 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Épargne</p>
          <p className="text-2xl font-bold text-indigo-600">{totalEpargnes} FCFA</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Derniers revenus</h2>
          {revenus.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun revenu ajouté</p>
          ) : (
            revenus.slice(0, 3).map((r) => (
              <div key={r.id} className="flex justify-between bg-gray-50 rounded-lg px-4 py-2 mb-2">
                <span>{r.nom}</span>
                <span className="text-green-600 font-semibold">+{r.montant} FCFA</span>
              </div>
            ))
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Dernières dépenses</h2>
          {depenses.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune dépense ajoutée</p>
          ) : (
            depenses.slice(0, 3).map((d) => (
              <div key={d.id} className="flex justify-between bg-gray-50 rounded-lg px-4 py-2 mb-2">
                <span>{d.nom}</span>
                <span className="text-red-600 font-semibold">-{d.montant} FCFA</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;