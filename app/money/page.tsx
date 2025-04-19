"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowRight, CreditCard, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface TransactionResponse {
  message: string;
  newBalance?: number;
  error?: string;
}

export default function MoneyTransaction(): React.ReactElement {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAddMoney = async (): Promise<void> => {
    setIsProcessing(true);
    
    // Validate inputs
    if (!phone || !/^\d{10}$/.test(phone)) {
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
        fetch("https://backend.nurdcells.com/api/user/add-money", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            amount: numericAmount
          })
        }).then(async (response) => {
          const data: TransactionResponse = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to add money");
          }
          return data;
        }),
        {
          loading: 'Processing transaction...',
          success: (data) => {
            setPhone("");
            setAmount("");
            return `${data.message}. New balance: ₹${data.newBalance}`;
          },
          error: (error) => error.message || "Transaction failed",
        }
      );
    } catch (error) {
      console.error("Add Money Error:", error);
      toast.error("Transaction Failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white w-full p-4">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Add Money
          </h1>
          <CreditCard className="text-purple-400 h-8 w-8" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter 10-digit phone number"
            className="bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            pattern="\d{10}"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">Amount (₹)</label>
          <Input
            type="number"
            placeholder="Enter amount"
            min="1"
            className="bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleAddMoney}
          disabled={isProcessing || !phone || !amount}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Add Money
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full text-gray-300 hover:text-white border-gray-600 hover:bg-gray-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}