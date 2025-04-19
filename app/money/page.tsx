"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ArrowRight, CreditCard, RefreshCw, CheckCircle, X } from "lucide-react";
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
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    amount: number;
    newBalance: number;
  } | null>(null);

  const handleAddMoney = async (): Promise<void> => {
    setIsProcessing(true);

    if (!phone || !/^\d{10}$/.test(phone)) {
      toast.error("Invalid Phone Number", {
        description: "Please enter a valid 10-digit phone number",
      });
      setIsProcessing(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Invalid Amount", {
        description: "Please enter a positive amount",
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
          body: JSON.stringify({ phone, amount: numericAmount }),
        }).then(async (response) => {
          const data: TransactionResponse = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to add money");
          }

          // Store transaction details for the popup
          setTransactionDetails({
            amount: numericAmount,
            newBalance: data.newBalance || 0,
          });
          
          // Show success popup
          setShowSuccessPopup(true);

          setPhone("");
          setAmount("");
          return data;
        }),
        {
          loading: "Processing transaction...",
          success: () => "Money added successfully!",
          error: (error) => error.message || "Transaction failed",
        }
      );
    } catch (error) {
      console.error("Add Money Error:", error);
      toast.error("Transaction Failed", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white w-full p-4">
      {/* Success Popup */}
      {showSuccessPopup && transactionDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-fade-in relative">
            <button 
              onClick={closeSuccessPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Money Added!</h2>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">Your transaction was successful</p>
              <p className="text-xl font-semibold text-gray-800 mb-1">
                ₹{transactionDetails.amount.toFixed(2)} Added
              </p>
              <p className="text-green-600 font-medium">
                New Balance: ₹{transactionDetails.newBalance.toFixed(2)}
              </p>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              onClick={closeSuccessPopup}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 mt-8">
        {/* Top Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/money")}
            className="text-black border-gray-200 hover:bg-gray-200"
          >
            Add Money
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/withdraw")}
            className="text-black border-gray-200 hover:bg-gray-200"
          >
            Withdraw Money
          </Button>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Add Money
          </h1>
          <CreditCard className="text-purple-400 h-8 w-8" />
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="Enter 10-digit phone number"
            className="bg-gray-700 border-0 text-white placeholder-gray-400 rounded-lg focus:ring-1 focus:ring-purple-500"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            pattern="\d{10}"
            required
          />
        </div>

        {/* Amount */}
        <div className="mb-8">
          <label className="block text-gray-300 font-medium mb-2">
            Amount (₹)
          </label>
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

        {/* Submit Button */}
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

        {/* Back Button */}
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