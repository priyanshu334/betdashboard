"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    memberId: "",
    fullName: "",
    phone: "",
    password: "",
    referralCode: "",
    money: "", // New field for money input
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://backend.nurdcells.com/api/members/signup", {
        memberId: formData.memberId,
        fullName: formData.fullName,
        phone: formData.phone,
        password: formData.password,
        referralCode: formData.referralCode,
        money: formData.money || "0", // Use money input or default to 0
      });

      setMessage(res.data.message || "Signup successful");
      setFormData({
        memberId: "",
        fullName: "",
        phone: "",
        password: "",
        referralCode: "",
        money: "",
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full from-orange-500 via-orange-500 to-orange-500 flex items-center justify-center p-6">
      <Card className="sm:max-w-md w-full shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-white">Add Member</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">ID</label>
              <Input name="memberId" placeholder="ABI02" value={formData.memberId} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-red-500">Phone Number <span className="text-xs text-gray-500">(Required)</span></label>
              <Input name="phone" placeholder="123-456-7890" type="tel" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input name="password" placeholder="Enter a secure password" type="password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-red-500">Referral Code <span className="text-xs text-gray-500">(Optional)</span></label>
              <Input name="referralCode" placeholder="Enter referral code" value={formData.referralCode} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-600">Initial Money <span className="text-xs text-gray-500">(Optional)</span></label>
              <Input name="money" placeholder="1000" type="number" value={formData.money} onChange={handleChange} />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2" disabled={loading}>
                {loading ? "Adding..." : "Add Member"}
              </Button>
              {message && (
                <p className="text-sm mt-3 text-center text-gray-700">{message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
