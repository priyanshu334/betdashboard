"use client";

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
  const [page, setPage] = useState(1);

  const filteredData = data.filter(
    (row) =>
      row.status === "Loss" &&
      row.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, 5));
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-4 md:p-6 w-full mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Loss Data</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Link href="/Data"><Button variant="outline">All Id</Button></Link>
        <Link href="/Data/Profit"><Button variant="outline">Profit</Button></Link>
        <Link href="/Data/Loss"><Button variant="outline">Loss</Button></Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[700px] w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-700 text-white text-sm md:text-base">
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
              <tr key={index} className="bg-orange-200 text-center text-sm md:text-base">
                <td className="p-2">{row.id}</td>
                <td className="p-2">{row.deposit}</td>
                <td className="p-2">{row.bet}</td>
                <td className="p-2">{row.withdraw}</td>
                <td className="p-2">{row.holding}</td>
                <td className="p-2 text-red-600 font-semibold">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <Button
          onClick={handlePrevPage}
          className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600">Page {page} of 5</span>

        <Button
          onClick={handleNextPage}
          className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
