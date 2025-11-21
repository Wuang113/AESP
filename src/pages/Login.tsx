import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { User, UserRole, UserStatus } from "@/schemas/User";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

interface JwtPayload {
  sub: string; // Email
  role: UserRole;
  name?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginResponse = await apiClient.post("/auth/login", {
        email: email,
        password: password,
      });

      const { accessToken } = loginResponse.data;

      if (!accessToken) {
        throw new Error("Login failed: No access token returned.");
      }

      const decodedToken = jwtDecode<JwtPayload>(accessToken);

      const userToLogin: User = {
        id: Date.now(), //
        email: decodedToken.sub,
        name: decodedToken.name || decodedToken.sub.split("@")[0],
        role: decodedToken.role,
        status: UserStatus.ACTIVE,
      };

      console.log("Logged in user (from token):", userToLogin);

      auth.login(userToLogin, accessToken);
      console.log("Auth after login:", auth.isAuthenticated, auth.user?.role);

      // dieu huong theo role
      setTimeout(() => {
        if (userToLogin.role === UserRole.ADMIN) {
          console.log("Navigating to /admin");
          navigate("/admin");
        } else if (userToLogin.role === UserRole.MENTOR) {
          console.log("Navigating to /mentor");
          navigate("/mentor");
        } else {
          console.log("Navigating to /learner");
          navigate("/learner");
        }
      }, 100);
    } catch (err) {
      // sua loi chi tiet hon
      console.error("Login failed", err);
      setLoading(false);

      // xu ly loi chi tiet
      let errorMessage = "An unexpected error occurred.";

      if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
          errorMessage = `Login Failed: ${err.response.data.message}`;
        } else if (err.code === "ERR_NETWORK") {
          errorMessage =
            "Network Error: Cannot connect to API. Is backend running?";
        } else {
          errorMessage = `Login Failed: ${err.message}`;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 to-indigo-900 font-[Poppins]">
      <div className="w-[420px] bg-white rounded-2xl shadow-2xl p-10 text-center animate-fade-in">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          Account Log In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Email"
            required
            className="w-full border border-pink-200 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-pink-400 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Password"
            required
            className="w-full border border-pink-200 rounded-lg px-5 py-3 text-lg focus:outline-none focus:border-pink-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-pink-400 hover:bg-pink-500 disabled:opacity-60 text-white font-semibold rounded-lg py-3 text-lg transition"
          >
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-between text-base mt-6">
          <a href="#" className="text-pink-500 hover:underline">
            Having problems?
          </a>
          <Link
            to="/register"
            className="text-pink-500 font-medium hover:underline"
          >
            Register now
          </Link>
        </div>

        {/* Social section */}
        <p className="text-gray-500 mt-8 text-sm sm:text-base">
          More Login Methods
        </p>

        <div className="flex justify-center gap-6 mt-4 text-2xl text-gray-600">
          <FaGoogle className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaApple className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaFacebookF className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
          <FaTwitter className="hover:text-pink-400 hover:scale-110 transition-transform cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Login;
