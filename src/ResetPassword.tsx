import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">

        {/* Logo */}
        <h1 className="text-3xl font-black text-violet-600 text-center mb-2">FinancePerso</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Réinitialisez votre mot de passe</p>

        {/* Formulaire */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-violet-500 mb-1">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition text-sm"
            />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition"
          >
            Envoyer le lien de réinitialisation
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Vous vous souvenez ?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-violet-600 font-semibold hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;