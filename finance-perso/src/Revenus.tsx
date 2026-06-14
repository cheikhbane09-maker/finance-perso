import { useState } from "react";
import { useApp } from "./AppContext";

function Revenus() {
  const { revenus, ajouterRevenu, supprimerRevenu } = useApp();
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");

  const handleAjouter = () => {
    if (!nom || !montant) return;
    ajouterRevenu(nom, Number(montant));
    setNom("");
    setMontant("");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Revenus</h1>

      {/* Formulaire */}
      <div className="bg-green-50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Ajouter un revenu</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom du revenu"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-400"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-400"
          />
          <button
            onClick={handleAjouter}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste */}
      <h2 className="text-lg font-semibold mb-4">Mes revenus</h2>
      {revenus.length === 0 ? (
        <p className="text-gray-400">Aucun revenu ajouté</p>
      ) : (
        revenus.map((r) => (
          <div key={r.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 mb-2">
            <span className="font-medium">{r.nom}</span>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-bold">+{r.montant} FCFA</span>
              <button
                onClick={() => supprimerRevenu(r.id)}
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

export default Revenus;