import { Navigate } from "react-router-dom";
import { estConnecte } from "./api";

// Empêche l'accès aux pages internes si l'utilisateur n'est pas connecté au backend.
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!estConnecte()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
