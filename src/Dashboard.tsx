import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight } from "./Icons";
import { useApp } from "./AppContext";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

function Dashboard() {
  const { revenus, depenses, epargnes } = useApp();

  const totalRevenus = revenus.reduce((acc, r) => acc + r.montant, 0);
  const totalDepenses = depenses.reduce((acc, d) => acc + d.montant, 0);
  const totalEpargnes = epargnes.reduce((acc, e) => acc + e.montant, 0);
  const solde = totalRevenus - totalDepenses;

  const cartes = [
    { label: "Solde", valeur: solde, icon: Wallet, color: "from-emerald-500 to-green-700", shadow: "shadow-emerald-500/40" },
    { label: "Revenus", valeur: totalRevenus, icon: TrendingUp, color: "from-green-400 to-emerald-600", shadow: "shadow-green-500/40" },
    { label: "Dépenses", valeur: totalDepenses, icon: TrendingDown, color: "from-teal-500 to-emerald-800", shadow: "shadow-teal-500/40" },
    { label: "Épargne", valeur: totalEpargnes, icon: PiggyBank, color: "from-lime-400 to-green-700", shadow: "shadow-lime-500/40" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-emerald-100/40 text-sm mt-1">Vue d'ensemble de vos finances</p>
        </div>
        <Link
          to="/stats"
          className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 bg-white/5 border border-emerald-500/20 px-4 py-2 rounded-full transition-colors"
        >
          Voir les statistiques <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cartes.map((c, i) => (
          <motion.div
            key={c.label}
            custom={i}
            initial="hidden"
            animate="show"
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-center shadow-lg ${c.shadow} hover:shadow-xl transition-shadow`}
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-black/20 flex items-center justify-center text-white">
              <c.icon size={18} />
            </div>
            <p className="text-white/80 text-sm mb-1">{c.label}</p>
            <p className="text-xl font-bold text-white">{c.valeur.toLocaleString()} FCFA</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-md border border-emerald-500/15 rounded-2xl shadow-lg p-5">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
            <TrendingUp size={18} className="text-emerald-400" /> Derniers revenus
          </h2>
          {revenus.length === 0 ? (
            <p className="text-emerald-100/30 text-sm">Aucun revenu ajouté</p>
          ) : (
            revenus.slice(0, 3).map((r) => (
              <div key={r.id} className="flex justify-between bg-emerald-500/10 rounded-xl px-4 py-2.5 mb-2">
                <span className="text-sm font-medium text-emerald-50/80">{r.nom}</span>
                <span className="text-emerald-400 font-bold text-sm">+{r.montant.toLocaleString()} FCFA</span>
              </div>
            ))
          )}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 backdrop-blur-md border border-emerald-500/15 rounded-2xl shadow-lg p-5">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
            <TrendingDown size={18} className="text-teal-400" /> Dernières dépenses
          </h2>
          {depenses.length === 0 ? (
            <p className="text-emerald-100/30 text-sm">Aucune dépense ajoutée</p>
          ) : (
            depenses.slice(0, 3).map((d) => (
              <div key={d.id} className="flex justify-between bg-teal-500/10 rounded-xl px-4 py-2.5 mb-2">
                <span className="text-sm font-medium text-emerald-50/80">{d.nom}</span>
                <span className="text-teal-400 font-bold text-sm">-{d.montant.toLocaleString()} FCFA</span>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
