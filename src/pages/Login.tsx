import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (error) {
      const err = error as { code?: string, message?: string };
      console.error("Login failed:", err);
      if (err.code === 'auth/unauthorized-domain') {
        alert("O domínio atual não está autorizado no Firebase. Por favor, adicione os domínios da URL na seção 'Authorized domains' no Firebase Console (Authentication -> Settings).");
      } else {
        alert("Erro no login: " + (err.message || 'Erro desconhecido'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
          <CardDescription>
            Entre com sua conta Google para gerenciar o catálogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={handleLogin} 
            disabled={loading}
          >
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? "Entrando..." : "Entrar com Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
