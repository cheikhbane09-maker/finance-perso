import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-5 shadow-sm">
        <h1 className="text-2xl font-black text-violet-600">FinancePerso</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="border border-violet-600 text-violet-600 font-semibold px-5 py-2 rounded-lg hover:bg-violet-50 transition"
          >
            Connexion
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-violet-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-violet-700 transition"
          >
            S'inscrire
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-20 bg-violet-50">
        <h2 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
          Gérez vos finances<br />
          <span className="text-violet-600">en toute simplicité</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mb-8">
          Suivez vos revenus et dépenses, visualisez votre solde en temps réel et prenez le contrôle de votre argent.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-violet-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-violet-700 transition"
        >
          Commencer gratuitement
        </button>
      </section>

      {/* FONCTIONNALITÉS */}
      <section className="py-20 px-10">
        <h3 className="text-3xl font-black text-center text-gray-900 mb-12">Nos fonctionnalités</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-violet-50 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Suivi des revenus</h4>
            <p className="text-gray-500 text-sm">Ajoutez et suivez toutes vos sources de revenus facilement.</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">💸</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Suivi des dépenses</h4>
            <p className="text-gray-500 text-sm">Gardez un œil sur vos dépenses et évitez les mauvaises surprises.</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Dashboard clair</h4>
            <p className="text-gray-500 text-sm">Visualisez votre solde et vos statistiques en un coup d'œil.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-violet-600 py-16 px-6 text-center">
        <h3 className="text-3xl font-black text-white mb-4">Prêt à gérer votre argent ?</h3>
        <p className="text-violet-100 mb-8">Rejoignez FinancePerso et prenez le contrôle de vos finances dès aujourd'hui.</p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-violet-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-violet-50 transition"
        >
          Créer mon compte
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © 2026 FinancePerso · 
      </footer>

    </div>
  );
}

export default LandingPage;