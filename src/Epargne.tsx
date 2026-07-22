import { useState } from "react";
import { useApp } from "./AppContext";

function Epargne() {
  const { epargnes, ajouterEpargne, retirerEpargne, estDebloquee } = useApp();
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const [dateDeblocage, setDateDeblocage] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);

  const dateMin = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const handleAjouter = () => {
    if (!nom || !montant || !dateDeblocage) return;
    ajouterEpargne(nom, Number(montant), new Date(dateDeblocage).toISOString());
    setNom("");
    setMontant("");
    setDateDeblocage("");
  };

  const handleRetrait = (id: number) => {
    const resultat = retirerEpargne(id);
    setMessage({ ok: resultat.ok, texte: resultat.message });
    setTimeout(() => setMessage(null), 4000);
  };

  const totalEpargne = epargnes.reduce((acc, e) => acc + e.montant, 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Épargne (comptes bloqués)</h1>
      <p className="text-gray-500 mb-8">
        Mettez de l'argent de côté sur un compte bloqué jusqu'à une date de déblocage. Impossible de retirer avant cette date.
      </p>

      <div className="bg-blue-100 rounded-xl p-5 text-center mb-8">
        <p className="text-gray-500 text-sm mb-1">Total épargné</p>
        <p className="text-2xl font-bold text-blue-600">{totalEpargne.toLocaleString()} FCFA</p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            message.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.texte}
        </div>
      )}

      {/* Formulaire */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Créer un compte bloqué</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom de l'épargne (ex: Voyage, Urgence...)"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-400"
          />
          <div>
            <label className="block text-sm text-gray-500 mb-1">Date de déblocage</label>
            <input
              type="date"
              min={dateMin}
              value={dateDeblocage}
              onChange={(e) => setDateDeblocage(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-400 w-full"
            />
          </div>
          <button
            onClick={handleAjouter}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Bloquer ce montant
          </button>
        </div>
      </div>

      {/* Liste */}
      <h2 className="text-lg font-semibold mb-4">Mes comptes bloqués</h2>
      {epargnes.length === 0 ? (
        <p className="text-gray-400">Aucune épargne créée</p>
      ) : (
        epargnes.map((e) => {
          const debloquee = estDebloquee(e);
          return (
            <div key={e.id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 mb-2">
              <div>
                <span className="font-medium block">{e.nom}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    debloquee ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {debloquee
                    ? "Débloqué"
                    : `Bloqué jusqu'au ${new Date(e.dateDeblocage).toLocaleDateString("fr-FR")}`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-500 font-bold">{e.montant.toLocaleString()} FCFA</span>
                <button
                  onClick={() => handleRetrait(e.id)}
                  className={`text-sm transition-colors ${
                    debloquee ? "text-gray-500 hover:text-red-500" : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Retirer
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Epargne;
