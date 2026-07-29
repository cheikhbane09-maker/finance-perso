import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, BarChart3, PiggyBank, ArrowRight, Sparkles } from "./Icons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black overflow-hidden">

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-10 py-5">
        <div className="flex items-center gap-2 text-2xl font-black">
          <span className="bg-gradient-to-br from-emerald-400 to-green-600 text-black p-2 rounded-2xl shadow-lg shadow-emerald-500/50">
            <Wallet size={22} />
          </span>
          <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
            FinancePerso
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="border border-emerald-500/30 bg-white/5 backdrop-blur text-emerald-300 font-semibold px-5 py-2 rounded-full hover:bg-emerald-500/10 transition"
          >
            Connexion
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-black font-semibold px-5 py-2 rounded-full shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/70 hover:-translate-y-0.5 transition-all"
          >
            S'inscrire
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center text-center px-6 py-24">
        {/* halos glow */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-10 -right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 bg-lime-400/15 rounded-full blur-3xl" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="relative z-10 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6"
        >
          <Sparkles size={14} /> Gérez votre argent simplement
        </motion.div>

        <motion.h2
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 text-4xl md:text-6xl font-black mb-5 leading-tight max-w-3xl"
        >
          <span className="text-white">Gérez vos finances</span><br />
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
            en toute simplicité
          </span>
        </motion.h2>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-emerald-100/50 text-lg max-w-xl mb-10"
        >
          Suivez vos revenus et dépenses, épargnez sur des comptes bloqués et visualisez vos statistiques en temps réel.
        </motion.p>

        <motion.button
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/register")}
          className="relative z-10 group bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-emerald-500/50 flex items-center gap-2"
        >
          Commencer gratuitement
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </section>

      {/* FONCTIONNALITÉS */}
      <section className="relative py-20 px-6 md:px-10">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-black text-center text-white mb-14"
        >
          Nos fonctionnalités
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: TrendingUp, color: "from-emerald-400 to-green-600", glow: "shadow-emerald-500/40", title: "Suivi des revenus", text: "Ajoutez et suivez toutes vos sources de revenus facilement." },
            { icon: TrendingDown, color: "from-teal-400 to-emerald-700", glow: "shadow-teal-500/40", title: "Suivi des dépenses", text: "Gardez un œil sur vos dépenses et évitez les mauvaises surprises." },
            { icon: PiggyBank, color: "from-green-400 to-lime-600", glow: "shadow-green-500/40", title: "Épargne bloquée", text: "Mettez de l'argent de côté jusqu'à une date de déblocage." },
            { icon: BarChart3, color: "from-lime-400 to-emerald-600", glow: "shadow-lime-500/40", title: "Statistiques", text: "Visualisez votre solde et l'évolution de vos finances." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white/5 backdrop-blur-md border border-emerald-500/15 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-black shadow-lg ${f.glow}`}>
                <f.icon size={22} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
              <p className="text-emerald-100/40 text-sm">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-4 md:mx-10 mb-10 rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-16 px-6 text-center shadow-2xl shadow-emerald-500/30"
      >
        <h3 className="text-3xl font-black text-black mb-4">Prêt à gérer votre argent ?</h3>
        <p className="text-black/70 mb-8">Rejoignez FinancePerso et prenez le contrôle de vos finances dès aujourd'hui.</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/register")}
          className="bg-black text-emerald-300 font-bold px-8 py-4 rounded-2xl text-lg shadow-lg"
        >
          Créer mon compte
        </motion.button>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative text-center py-6 text-emerald-100/30 text-sm">
        © 2026 FinancePerso
      </footer>

    </div>
  );
}

export default LandingPage;
