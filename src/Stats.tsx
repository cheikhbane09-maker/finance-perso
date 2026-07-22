import { useApp } from "./AppContext";
import type { Transaction } from "./AppContext";

// --- Petit camembert (pie chart) en SVG pur, sans librairie externe ---
function PieChart({ revenus, depenses }: { revenus: number; depenses: number }) {
  const total = revenus + depenses;
  const rayon = 70;
  const circonference = 2 * Math.PI * rayon;

  const partRevenus = total > 0 ? revenus / total : 0;
  const partDepenses = total > 0 ? depenses / total : 0;

  const segmentRevenus = partRevenus * circonference;
  const segmentDepenses = partDepenses * circonference;

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <g transform="rotate(-90 90 90)">
          <circle
            cx="90"
            cy="90"
            r={rayon}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="28"
          />
          {total > 0 && (
            <>
              <circle
                cx="90"
                cy="90"
                r={rayon}
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="28"
                strokeDasharray={`${segmentRevenus} ${circonference - segmentRevenus}`}
                strokeDashoffset="0"
              />
              <circle
                cx="90"
                cy="90"
                r={rayon}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="28"
                strokeDasharray={`${segmentDepenses} ${circonference - segmentDepenses}`}
                strokeDashoffset={-segmentRevenus}
              />
            </>
          )}
        </g>
        <text x="90" y="85" textAnchor="middle" className="fill-gray-700" fontSize="14" fontWeight="bold">
          {total > 0 ? `${Math.round(partRevenus * 100)}% / ${Math.round(partDepenses * 100)}%` : "Aucune donnée"}
        </text>
        <text x="90" y="103" textAnchor="middle" className="fill-gray-400" fontSize="11">
          Revenus / Dépenses
        </text>
      </svg>
      <div className="flex gap-6 mt-3 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Revenus
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Dépenses
        </span>
      </div>
    </div>
  );
}

type MoisData = { mois: string; revenus: number; depenses: number };

function grouperParMois(revenus: Transaction[], depenses: Transaction[]): MoisData[] {
  const map = new Map<string, MoisData>();

  const formatMois = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
  };

  const cleTri = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.getFullYear() * 12 + d.getMonth();
  };

  const ajouter = (t: Transaction, type: "revenus" | "depenses") => {
    const cle = formatMois(t.date);
    if (!map.has(cle)) {
      map.set(cle, { mois: cle, revenus: 0, depenses: 0 });
    }
    map.get(cle)![type] += t.montant;
  };

  revenus.forEach((r) => ajouter(r, "revenus"));
  depenses.forEach((d) => ajouter(d, "depenses"));

  return Array.from(map.values())
    .sort((a, b) => cleTri(a.mois) - cleTri(b.mois))
    .slice(-6);
}

// --- Petit graphique en barres, sans librairie externe ---
function BarChart({ data }: { data: MoisData[] }) {
  if (data.length === 0) {
    return <p className="text-gray-400 text-center py-10">Pas encore assez de données pour afficher l'évolution.</p>;
  }

  const max = Math.max(...data.map((d) => Math.max(d.revenus, d.depenses)), 1);

  return (
    <div>
      <div className="flex items-end justify-around gap-4 h-56 border-b border-gray-200 pb-2">
        {data.map((d) => (
          <div key={d.mois} className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-end gap-1 h-48">
              <div
                className="w-5 bg-green-500 rounded-t-md transition-all"
                style={{ height: `${(d.revenus / max) * 100}%` }}
                title={`Revenus: ${d.revenus} FCFA`}
              ></div>
              <div
                className="w-5 bg-red-500 rounded-t-md transition-all"
                style={{ height: `${(d.depenses / max) * 100}%` }}
                title={`Dépenses: ${d.depenses} FCFA`}
              ></div>
            </div>
            <span className="text-xs text-gray-500 capitalize">{d.mois}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-3 text-sm justify-center">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> Revenus
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Dépenses
        </span>
      </div>
    </div>
  );
}

function Stats() {
  const { revenus, depenses, epargnes } = useApp();

  const totalRevenus = revenus.reduce((acc, r) => acc + r.montant, 0);
  const totalDepenses = depenses.reduce((acc, d) => acc + d.montant, 0);
  const totalEpargnes = epargnes.reduce((acc, e) => acc + e.montant, 0);
  const solde = totalRevenus - totalDepenses;

  const dataMensuelle = grouperParMois(revenus, depenses);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">Statistiques</h1>
      <p className="text-gray-500 mb-8">Une vue d'ensemble de vos finances.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-100 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs mb-1">Solde</p>
          <p className="text-xl font-bold text-blue-600">{solde.toLocaleString()} FCFA</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs mb-1">Revenus</p>
          <p className="text-xl font-bold text-green-600">{totalRevenus.toLocaleString()} FCFA</p>
        </div>
        <div className="bg-red-100 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs mb-1">Dépenses</p>
          <p className="text-xl font-bold text-red-600">{totalDepenses.toLocaleString()} FCFA</p>
        </div>
        <div className="bg-indigo-100 rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs mb-1">Épargne</p>
          <p className="text-xl font-bold text-indigo-600">{totalEpargnes.toLocaleString()} FCFA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Répartition revenus / dépenses</h2>
          <PieChart revenus={totalRevenus} depenses={totalDepenses} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Évolution mensuelle</h2>
          <BarChart data={dataMensuelle} />
        </div>
      </div>
    </div>
  );
}

export default Stats;
