import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, X, Plus } from "./Icons";
import { useApp } from "./AppContext";

function Revenus() {
  const { revenus, ajouterRevenu, supprimerRevenu } = useApp();
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const [erreur, setErreur] = useState("");

  const handleAjouter = async () => {
    if (!nom || !montant) return;
    try {
      await ajouterRevenu(nom, Number(montant));
      setNom("");
      setMontant("");
      setErreur("");
    } catch (err) {
      setErreur((err as Error).message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="bg-gradient-to-br from-green-400 to-emerald-600 text-black p-2.5 rounded-xl shadow-lg shadow-green-500/40">
          <TrendingUp size={22} />
        </span>
        <h1 className="text-3xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Revenus</h1>
      </div>

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-emerald-500/15"
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Ajouter un revenu</h2>
        {erreur && <p className="text-red-400 text-sm mb-3">{erreur}</p>}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom du revenu"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-emerald-500/20 bg-black/40 text-white placeholder-emerald-100/20 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border border-emerald-500/20 bg-black/40 text-white placeholder-emerald-100/20 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAjouter}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/40 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Ajouter
          </motion.button>
        </div>
      </motion.div>

      {/* Liste */}
      <h2 className="text-lg font-semibold mb-4 text-white">Mes revenus</h2>
      {revenus.length === 0 ? (
        <p className="text-emerald-100/30">Aucun revenu ajouté</p>
      ) : (
        <AnimatePresence>
          {revenus.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              className="flex justify-between items-center bg-white/5 hover:bg-white/10 border border-emerald-500/10 rounded-xl px-4 py-3 mb-2 transition-colors"
            >
              <span className="font-medium text-emerald-50/80">{r.nom}</span>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400 font-bold">+{r.montant.toLocaleString()} FCFA</span>
                <button
                  onClick={() => supprimerRevenu(r.id)}
                  className="text-emerald-100/30 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

export default Revenus;
