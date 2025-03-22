"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = [
  { id: "Abc102", deposit: "1,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Profit" },
  { id: "Abc102", deposit: "5,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Loss" },
];


export default function LossTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);

  const filteredData = data.filter(
    (row) => row.status === "Loss" && row.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Loss Data</h1>
      <div className="flex gap-2 mb-4">
      <Link href="/Data"><Button variant="outline">All Id</Button></Link>
      <Link href="/Data/Profit"><Button variant="outline">Profit</Button></Link>  
      <Link href="/Data/Loss"><Button variant="outline">Loss</Button></Link>  
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="p-2">Id</th>
            <th className="p-2">Amount Deposit</th>
            <th className="p-2">Amount on Bet</th>
            <th className="p-2">Withdrawl</th>
            <th className="p-2">Amount Holding</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="bg-orange-200 text-center">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.deposit}</td>
              <td className="p-2">{row.bet}</td>
              <td className="p-2">{row.withdraw}</td>
              <td className="p-2">{row.holding}</td>
              <td className="p-2 text-red-600">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-[600px]">
        <p>Page {page} of 5</p>
        <div className="flex justify-center gap-2 mt-2">
          <Button variant="outline" onClick={handlePrevPage}>Previous</Button>
          <Button variant="outline" onClick={handleNextPage}>Next</Button>
        </div>
      </div>
    </div>
  );
}
