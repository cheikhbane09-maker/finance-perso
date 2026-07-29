import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, Lock, LockOpen } from "./Icons";
import { useApp } from "./AppContext";

function Epargne() {
  const { epargnes, ajouterEpargne, retirerEpargne, estDebloquee } = useApp();
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const [dateDeblocage, setDateDeblocage] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);

  const dateMin = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const handleAjouter = async () => {
    if (!nom || !montant || !dateDeblocage) return;
    try {
      await ajouterEpargne(nom, Number(montant), new Date(dateDeblocage).toISOString());
      setNom("");
      setMontant("");
      setDateDeblocage("");
    } catch (err) {
      setMessage({ ok: false, texte: (err as Error).message });
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleRetrait = async (id: number) => {
    const resultat = await retirerEpargne(id);
    setMessage({ ok: resultat.ok, texte: resultat.message });
    setTimeout(() => setMessage(null), 4000);
  };

  const totalEpargne = epargnes.reduce((acc, e) => acc + e.montant, 0);

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-gradient-to-br from-lime-400 to-green-700 text-black p-2.5 rounded-xl shadow-lg shadow-lime-500/40">
          <PiggyBank size={22} />
        </span>
        <h1 className="text-3xl font-black bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent">Épargne</h1>
      </div>
      <p className="text-emerald-100/40 mb-8 ml-1">
        Mettez de l'argent de côté sur un compte bloqué jusqu'à une date de déblocage. Impossible de retirer avant cette date.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-600 to-lime-700 rounded-2xl p-6 text-center mb-8 shadow-lg shadow-lime-500/30"
      >
        <p className="text-white/70 text-sm mb-1">Total épargné</p>
        <p className="text-3xl font-black text-white">{totalEpargne.toLocaleString()} FCFA</p>
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium border ${
              message.ok ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" : "bg-red-500/10 text-red-300 border-red-500/30"
            }`}
          >
            {message.texte}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulaire */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-emerald-500/15">
        <h2 className="text-lg font-semibold mb-4 text-white">Créer un compte bloqué</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nom de l'épargne (ex: Voyage, Urgence...)"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="border border-emerald-500/20 bg-black/40 text-white placeholder-emerald-100/20 rounded-xl px-4 py-2.5 outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-500/20 transition text-sm"
          />
          <input
            type="number"
            placeholder="Montant (FCFA)"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            className="border border-emerald-500/20 bg-black/40 text-white placeholder-emerald-100/20 rounded-xl px-4 py-2.5 outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-500/20 transition text-sm"
          />
          <div>
            <label className="block text-sm text-emerald-100/40 mb-1">Date de déblocage</label>
            <input
              type="date"
              min={dateMin}
              value={dateDeblocage}
              onChange={(e) => setDateDeblocage(e.target.value)}
              className="border border-emerald-500/20 bg-black/40 text-white rounded-xl px-4 py-2.5 outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-500/20 transition w-full text-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAjouter}
            className="bg-gradient-to-r from-lime-500 to-green-700 text-black font-bold py-2.5 rounded-xl shadow-lg shadow-lime-500/40"
          >
            Bloquer ce montant
          </motion.button>
        </div>
      </div>

      {/* Liste */}
      <h2 className="text-lg font-semibold mb-4 text-white">Mes comptes bloqués</h2>
      {epargnes.length === 0 ? (
        <p className="text-emerald-100/30">Aucune épargne créée</p>
      ) : (
        epargnes.map((e) => {
          const debloquee = estDebloquee(e);
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center bg-white/5 hover:bg-white/10 border border-emerald-500/10 rounded-xl px-4 py-3 mb-2 transition-colors"
            >
              <div>
                <span className="font-medium block text-emerald-50/80">{e.nom}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                    debloquee ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {debloquee ? <LockOpen size={11} /> : <Lock size={11} />}
                  {debloquee
                    ? "Débloqué"
                    : `Bloqué jusqu'au ${new Date(e.dateDeblocage).toLocaleDateString("fr-FR")}`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lime-400 font-bold">{e.montant.toLocaleString()} FCFA</span>
                <button
                  onClick={() => handleRetrait(e.id)}
                  className={`text-sm transition-colors ${
                    debloquee ? "text-emerald-100/50 hover:text-red-400" : "text-emerald-100/15 cursor-not-allowed"
                  }`}
                >
                  Retirer
                </button>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
}

export default Epargne;
