import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, TrendingDown, PiggyBank, BarChart3, Wallet, LogOut } from "./Icons";
import { deconnexion } from "./api";

const liens = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/revenus", label: "Revenus", icon: TrendingUp },
  { to: "/depenses", label: "Dépenses", icon: TrendingDown },
  { to: "/epargne", label: "Épargne", icon: PiggyBank },
  { to: "/stats", label: "Statistiques", icon: BarChart3 },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    deconnexion();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/60 border-b border-emerald-500/20 shadow-lg shadow-emerald-900/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-black text-xl">
          <span className="bg-gradient-to-br from-emerald-400 to-green-600 text-black p-1.5 rounded-xl shadow-lg shadow-emerald-500/50">
            <Wallet size={20} />
          </span>
          <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
            FinancePerso
          </span>
        </Link>

        <div className="flex gap-1 bg-white/5 border border-emerald-500/10 rounded-full p-1">
          {liens.map(({ to, label, icon: Icon }) => {
            const actif = location.pathname === to;
            return (
              <Link key={to} to={to} className="relative px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5">
                {actif && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-1.5 transition-colors ${actif ? "text-black" : "text-emerald-100/60 hover:text-emerald-300"}`}>
                  <Icon size={16} />
                  <span className="hidden md:inline">{label}</span>
                </span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={handleDeconnexion}
          className="flex items-center gap-1.5 text-sm font-semibold text-emerald-100/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
