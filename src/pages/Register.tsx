// src/pages/Register.tsx
import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebookF, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // luu du lieu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // xu ly thay doi form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.type === "text" && e.target.placeholder === "Full Name"
        ? "name"
        : e.target.type]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);
    try {
      // goi api de dang ky
      await apiClient.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // role mac dinh la learner
      });

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");

      // chuyen huong den trang login sau 1.5s
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={8}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            minLength={8}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="register-footer">
          Already have an account?{" "}
          <span className="login-text" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>

        <p className="more-methods">Or register with</p>

        <div className="social-icons">
          <FaGoogle className="icon" />
          <FaApple className="icon" />
          <FaFacebookF className="icon" />
          <FaTwitter className="icon" />
        </div>

        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { height: 100%; width: 100%; font-family: 'Poppins', sans-serif; background: url('../images/Speaking-Practice.jpg') no-repeat center center; background-size: cover; display: flex; justify-content: center; align-items: center; }
          .register-container { display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh; }
          .register-card { width: 420px; background: #fff; border-radius: 16px; padding: 40px 30px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); text-align: center; animation: fadeIn 0.6s ease; }
          .register-title { font-size: 28px; font-weight: 600; color: #333; margin-bottom: 30px; }
          .register-form { display: flex; flex-direction: column; gap: 20px; }
          .register-form input { width: 100%; padding: 16px 18px; font-size: 18px; border: 1.5px solid #f2d3d3; border-radius: 8px; outline: none; transition: border-color 0.2s; }
          .register-form input:focus { border-color: #e67aa7; }
          .register-btn { margin-top: 10px; padding: 16px; border: none; border-radius: 8px; font-size: 18px; font-weight: 600; color: #fff; background: #e67aa7; cursor: pointer; transition: background 0.2s; }
          .register-btn:hover { background: #d35499; }
          .register-btn:disabled { opacity: 0.7; cursor: not-allowed; }
          .register-footer { margin-top: 25px; font-size: 16px; color: #555; }
          .login-text { color: #e67aa7; font-weight: 500; cursor: pointer; text-decoration: none; margin-left: 6px; transition: color 0.2s; }
          .login-text:hover { color: #d35499; }
          .more-methods { margin-top: 30px; font-size: 16px; color: #777; }
          .social-icons { display: flex; justify-content: center; gap: 20px; margin-top: 15px; }
          .icon { font-size: 28px; color: #444; cursor: pointer; transition: transform 0.2s, color 0.2s; }
          .icon:hover { color: #e67aa7; transform: scale(1.2); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
          @media (max-width: 480px) { .register-card { width: 90%; padding: 30px 20px; } .register-title { font-size: 24px; } .register-form input { font-size: 16px; padding: 14px 16px; } .register-btn { font-size: 16px; padding: 14px; } .register-footer { font-size: 14px; } .more-methods { font-size: 14px; } .icon { font-size: 24px; } }
        `}</style>
      </div>
    </div>
  );
};

export default Register;
