import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-violet-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Finance Personelle</h1>

      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link to="/revenus" className="hover:underline">
          Revenus
        </Link>

        <Link to="/depenses" className="hover:underline">
          Dépenses
        </Link>

        <Link to="/apropos" className="hover:underline">
          À propos
        </Link>
      </div>
    </nav>
  );
}