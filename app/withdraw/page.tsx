"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function WithdrawTransaction() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full p-4">
      <div className="mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Withdraw</h1>

        <div className="flex space-x-4 mb-4">
          <Button variant="outline" onClick={() => router.push('/money')}>Add Money</Button>
          <Button className="bg-orange-500 hover:bg-orange-600">Withdraw</Button>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Enter Id</label>
          <div className="flex space-x-2">
            <Input placeholder="Abc123" className="flex-1" />
            <Button className="bg-blue-500 hover:bg-blue-600">Check Id</Button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2">Enter Amount</label>
          <Input placeholder="1,000" />
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600">Withdraw Money</Button>
      </div>
    </div>
  );
}
