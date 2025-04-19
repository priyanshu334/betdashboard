"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowRight, Wallet, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface WithdrawResponse {
  message: string;
  userBalance?: number;
  error?: string;
}

export default function WithdrawTransaction(): React.ReactElement {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleWithdraw = async (): Promise<void> => {
    setIsProcessing(true);

    // Validate inputs
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      toast.error("Invalid Phone Number", {
        description: "Please enter a valid 10-digit phone number"
      });
      setIsProcessing(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Invalid Amount", {
        description: "Please enter a positive amount"
      });
      setIsProcessing(false);
      return;
    }

    try {
      toast.promise(
        fetch("https://backend.nurdcells.com/api/user/withdraw-money", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include authorization token if needed
            // "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            phone: phoneNumber,
            amount: numericAmount
          })
        }).then(async (response) => {
          const data: WithdrawResponse = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to withdraw money");
          }
          return data;
        }),
        {
          loading: 'Processing withdrawal...',
          success: (data) => {
            setAmount("");
            return `${data.message}. New balance: ₹${data.userBalance}`;
          },
          error: (error) => error.message || "Withdrawal failed",
        }
      );
    } catch (error) {
      console.error("Withdraw Error:", error);
      toast.error("Withdrawal Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsProcessing(false);
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
          <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter 10-digit phone number"
            className="bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            pattern="\d{10}"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">Amount (₹)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">₹</span>
            </div>
            <Input
              type="number"
              placeholder="Enter amount"
              min="1"
              className="pl-8 bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleWithdraw}
          disabled={isProcessing || !phoneNumber || !amount}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Withdraw Money
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="w-full text-gray-300 hover:text-white border-gray-600 hover:bg-gray-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}