"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = [
  { id: "Abc102", deposit: "1,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Profit" },
  { id: "Abc102", deposit: "5,000", bet: "500", withdraw: "1000", holding: "1,000", status: "Loss" },
];

export default function DataTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(2);

  const filteredData = data.filter((row) =>
    row.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-4 w-full mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Data</h1>
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
              <td
                className={`p-2 ${row.status === "Profit" ? "text-green-600" : "text-red-600"}`}
              >
                {row.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     <div className="flex justify-between items-center mt-[600px]">
             <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Previous</Button>
             <span className="text-sm text-gray-600">Page {currentPage} of 5</span>
             <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Next</Button>
           </div>
    </div>
  );
}