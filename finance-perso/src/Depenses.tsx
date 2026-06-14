import { useState } from "react";
import { useApp } from "./AppContext";

function Depenses() {
  const { depenses, ajouterDepense, supprimerDepense } = useApp();
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");

  const handleAjouter = () => {
    if (!nom || !montant) return;
    ajouterDepense(nom, Number(montant));
    setNom("");
    setMontant("");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Dépenses</h1>

      {/* Formulaire */}
      <div className="bg-red-50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Ajouter une dépense</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom de la dépense"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-red-400"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-red-400"
          />
          <button
            onClick={handleAjouter}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste */}
      <h2 className="text-lg font-semibold mb-4">Mes dépenses</h2>
      {depenses.length === 0 ? (
        <p className="text-gray-400">Aucune dépense ajoutée</p>
      ) : (
        depenses.map((d) => (
          <div key={d.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 mb-2">
            <span className="font-medium">{d.nom}</span>
            <div className="flex items-center gap-4">
              <span className="text-red-500 font-bold">-{d.montant} FCFA</span>
              <button
                onClick={() => supprimerDepense(d.id)}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Depenses;