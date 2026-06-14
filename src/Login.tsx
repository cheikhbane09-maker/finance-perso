import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        
        {/* Logo */}
        <h1 className="text-3xl font-black text-violet-600 text-center mb-2">FinancePerso</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Connectez-vous à votre compte</p>

        {/* Formulaire */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 transition text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/reset-password")}
              className="text-violet    -600 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-violet-600 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition"
          >
            Se connecter
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Pas encore de compte ?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-violet-600 font-semibold hover:underline"
          >
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;