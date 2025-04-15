"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowRight, Wallet, CheckCircle, XCircle, RefreshCw, ArrowLeft } from "lucide-react";

interface WithdrawResponse {
  message: string;
  userBalance?: number;
}

export default function WithdrawTransaction(): React.ReactElement {
  const router = useRouter();

  const [userId, setUserId] = useState<string>("");
  const [adminId, setAdminId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [transactionResult, setTransactionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleCheckUserId = async (): Promise<void> => {
    setLoading(true);
    setCheckResult(null);
    setTransactionResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/user/check-id/${userId}`);
      const data: { message: string } = await res.json();

      if (!res.ok) {
        setCheckResult(data.message || "User not found");
      } else {
        setCheckResult(data.message);
      }
    } catch (error) {
      console.error("Error checking user ID:", error);
      setCheckResult("Failed to check user ID");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (): Promise<void> => {
    setProcessing(true);
    setTransactionResult(null);

    const numericAmount = parseFloat(amount);

    if (!userId || !adminId || isNaN(numericAmount) || numericAmount <= 0) {
      setTransactionResult("Please enter valid User ID, Admin ID, and amount.");
      setProcessing(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}/withdraw-money`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: numericAmount, adminId }),
      });

      const data: WithdrawResponse = await res.json();

      if (!res.ok) {
        setTransactionResult(data.message || "Failed to withdraw money");
      } else {
        setTransactionResult(`${data.message}. New user balance: ₹${data.userBalance}`);
        setAmount("");
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      setTransactionResult("Error processing withdrawal");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white w-full p-4">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Withdraw Funds
          </h1>
          <Wallet className="text-blue-400 h-8 w-8" />
        </div>

        <div className="flex space-x-2 mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push("/money")}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-medium py-2 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Add Money
          </Button>
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            Withdraw
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">User ID</label>
          <div className="flex bg-gray-700 rounded-lg overflow-hidden shadow-inner">
            <Input
              placeholder="Enter user ID"
              className="flex-1 bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0"
              value={userId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 rounded-none transition-colors"
              onClick={handleCheckUserId}
              disabled={loading || !userId}
            >
              {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : "Verify"}
            </Button>
          </div>
          {checkResult && (
            <div className={`mt-2 flex items-center ${checkResult.includes("does not") ? "text-red-400" : "text-green-400"}`}>
              {checkResult.includes("does not") ? (
                <XCircle className="h-4 w-4 mr-1" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-1" />
              )}
              <p className="text-sm">{checkResult}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">Admin ID</label>
          <div className="bg-gray-700 rounded-lg overflow-hidden shadow-inner">
            <Input
              placeholder="Enter admin ID"
              className="bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0"
              value={adminId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdminId(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">₹</span>
            </div>
            <Input
              placeholder="1,000"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              className="pl-8 bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleWithdraw}
          disabled={processing || !userId || !adminId || !amount}
        >
          {processing ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Withdraw Money</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        {transactionResult && (
          <div className={`mt-6 p-4 rounded-lg ${transactionResult.includes("Failed") || transactionResult.includes("Error") || transactionResult.includes("Please enter") 
            ? "bg-red-900/30 text-red-300 border border-red-700" 
            : "bg-green-900/30 text-green-300 border border-green-700"}`}>
            <p className="text-sm flex items-start">
              {transactionResult.includes("Failed") || transactionResult.includes("Error") || transactionResult.includes("Please enter") 
                ? <XCircle className="h-5 w-5 mr-2 shrink-0" /> 
                : <CheckCircle className="h-5 w-5 mr-2 shrink-0" />}
              {transactionResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}