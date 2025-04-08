"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function WithdrawTransaction() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [amount, setAmount] = useState("");
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [transactionResult, setTransactionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleCheckUserId = async () => {
    setLoading(true);
    setCheckResult(null);
    setTransactionResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/user/check-id/${userId}`);
      const data = await res.json();

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

  const handleWithdraw = async () => {
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

      const data = await res.json();

      if (!res.ok) {
        setTransactionResult(data.message || "Failed to withdraw money");
      } else {
        setTransactionResult(`✅ ${data.message}. New user balance: ₹${data.userBalance}`);
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
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Withdraw</h1>

        <div className="flex space-x-4 mb-4">
          <Button variant="outline" onClick={() => router.push("/money")}>
            Add Money
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">Withdraw</Button>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Enter User ID</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Abc123"
              className="flex-1"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleCheckUserId}
              disabled={loading || !userId}
            >
              {loading ? "Checking..." : "Check Id"}
            </Button>
          </div>
          {checkResult && (
            <p className={`mt-2 text-sm ${checkResult.includes("does not") ? "text-red-600" : "text-green-600"}`}>
              {checkResult}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Enter Admin ID</label>
          <Input
            placeholder="admin123"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Enter Amount</label>
          <Input
            placeholder="1,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={handleWithdraw}
          disabled={processing || !userId || !adminId || !amount}
        >
          {processing ? "Processing..." : "Withdraw Money"}
        </Button>

        {transactionResult && (
          <p className="mt-4 text-sm text-center text-blue-700">{transactionResult}</p>
        )}
      </div>
    </div>
  );
}
