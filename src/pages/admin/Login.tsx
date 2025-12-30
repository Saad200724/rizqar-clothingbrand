import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@rizqar.me";
const ADMIN_PASSWORD = "pass-rizqar@#sahol";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("admin_authenticated", "true");
        localStorage.setItem("admin_login_time", new Date().toISOString());
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error("Invalid email or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-white/10 rounded-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-white/10"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-white/10"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent text-background hover:opacity-90 font-bold py-6"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Default credentials: admin@rizqar.me
        </p>
      </div>
    </div>
  );
}
