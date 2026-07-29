import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, User, Mail, Lock } from "./Icons";
import { inscription } from "./api";

function Register() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  const handleInscription = async () => {
    if (!nom || !email || !password || !confirmation) {
      setErreur("Remplis tous les champs.");
      return;
    }
    if (password !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }
    setEnCours(true);
    setErreur("");
    try {
      await inscription(email, password, nom);
      navigate("/dashboard");
    } catch (err) {
      setErreur((err as Error).message);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-500/10 p-8 w-full max-w-md border border-emerald-500/20"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <span className="bg-gradient-to-br from-emerald-400 to-green-600 text-black p-3 rounded-2xl shadow-lg shadow-emerald-500/50 mb-3">
            <Wallet size={26} />
          </span>
          <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">FinancePerso</h1>
          <p className="text-emerald-100/40 text-sm mt-1">Créez votre compte gratuitement</p>
        </div>

        {erreur && (
          <p className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-2.5 mb-4">
            {erreur}
          </p>
        )}

        {/* Formulaire */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-emerald-200/70 mb-1">Nom complet</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" />
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-black/40 border border-emerald-500/20 text-white placeholder-emerald-100/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-emerald-200/70 mb-1">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-black/40 border border-emerald-500/20 text-white placeholder-emerald-100/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-emerald-200/70 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-emerald-500/20 text-white placeholder-emerald-100/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-emerald-200/70 mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" />
              <input
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleInscription()}
                className="w-full bg-black/40 border border-emerald-500/20 text-white placeholder-emerald-100/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 transition text-sm"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleInscription}
            disabled={enCours}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/40 disabled:opacity-60"
          >
            {enCours ? "Création..." : "Créer mon compte"}
          </motion.button>
        </div>

        <p className="text-center text-sm text-emerald-100/30 mt-6">
          Déjà un compte ?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-emerald-400 font-semibold hover:underline"
          >
            Se connecter
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
