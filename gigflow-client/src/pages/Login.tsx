import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[350px]">

        <h1 className="text-2xl font-bold text-center mb-6">
          GigFlow Login
        </h1>

        <input
          className="w-full p-2 border rounded mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={async () => {
            try {
              const res = await loginUser({
                email,
                password,
              });

              console.log("LOGIN SUCCESS:", res.data);

              alert(res.data.message || "Login Success");

              localStorage.setItem("token", res.data.token);

              window.location.href = "/dashboard";
            } catch (err: any) {
              console.log(
                "LOGIN ERROR:",
                err?.response?.data || err.message
              );

              alert(
                err?.response?.data?.message ||
                  "Login Failed (Check console)"
              );
            }
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}