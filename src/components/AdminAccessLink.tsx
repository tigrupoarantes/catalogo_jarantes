import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

/**
 * Entrada discreta para a área administrativa: um cadeado cor chumbo fixo no
 * canto inferior direito, acima da barra de paginação (z-[80] > z-[70]).
 */
const AdminAccessLink = () => {
  return (
    <Link
      to="/login"
      title="Área administrativa"
      aria-label="Área administrativa"
      className="fixed bottom-3 right-4 z-[80] flex h-9 w-9 items-center justify-center rounded-full bg-[#52525b] text-white shadow-md transition-colors hover:bg-[#3f3f46]"
    >
      <Lock className="h-4 w-4" />
    </Link>
  );
};

export default AdminAccessLink;
