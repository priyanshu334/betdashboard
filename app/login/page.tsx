'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation"; // or 'next/router' if not using app dir

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store token (can also use cookies if preferred)
      localStorage.setItem('admin_token', data.token);

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-orange-600 to-orange-800">
      <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
          <h1 className="text-2xl font-bold text-orange-700">Saffron Exch</h1>
        </div>

        <h2 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2">
          Login <span className="text-xl">🔑</span>
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="px-3 text-gray-600">📞</span>
            <Input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-2 px-3 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="px-3 text-gray-600">🔒</span>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 focus:outline-none"
              required
            />
            <Button type="button" variant="ghost" size="icon" className="px-3 text-gray-600">👁️</Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <Checkbox className="mr-2" checked={remember} onCheckedChange={() => setRemember(!remember)} />
              Remember me
            </label>
            <a href="#" className="text-orange-700 hover:underline">Forgot Password?</a>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full bg-orange-700 text-white py-2 rounded-lg font-bold">
            LOGIN
          </Button>
        </form>

        <div className="my-6 text-center">OR</div>

        <div className="flex items-center justify-center border border-gray-300 rounded-lg p-2">
          <span className="text-gray-600 mr-2">📞</span>
          <span className="text-gray-800">+91-1234589623</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
