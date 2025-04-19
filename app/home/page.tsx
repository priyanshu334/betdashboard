"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function AddPlayerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    referralCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    console.log("🟡 Submitting form with data:", formData);
  
    try {
      const response = await fetch("https://backend.nurdcells.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("🔵 Raw response:", response);
  
      const data = await response.json();
  
      console.log("🟢 Parsed response JSON:", data);
  
      if (!response.ok) {
        console.error("🔴 Server returned an error:", data.message);
        throw new Error(data.message || "Something went wrong");
      }
  
      setSuccess("Player added successfully!");
      setFormData({ fullName: "", phone: "", password: "", referralCode: "" });
    } catch (err: any) {
      console.error("❌ Error during signup:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Add Player</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gray-50 border-b pb-4">
            <CardTitle className="text-base sm:text-lg text-blue-700">Player Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a secure password"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Referral Code (Optional)</label>
                <Input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  placeholder="Enter referral code if any"
                  className="w-full"
                />
              </div>

              {/* Error and success messages */}
              {error && (
                <div className="flex items-center text-red-600 text-sm p-2 bg-red-50 rounded">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="flex items-center text-green-600 text-sm p-2 bg-green-50 rounded">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <p>{success}</p>
                </div>
              )}

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium w-full sm:w-auto order-1 sm:order-2" 
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Player"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}