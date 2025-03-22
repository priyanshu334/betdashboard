"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const BetHistory = () => {
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(2);

  const data = [
    { id: "Abc102", sport: "Cricket", event: "Ipl 2025", option: "123 back", amount: "1,000", status: "Current" }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const filteredData = data.filter((item) => item.id.includes(searchId));

  return (
    <div className="p-6 w-full min-h-screen mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bet History</h1>
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search ID" value={searchId} onChange={handleSearchChange} className="w-full max-w-sm" />
      </div>
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">ID</TableHead>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">Sports</TableHead>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">Event Name</TableHead>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">User Option</TableHead>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">Amount</TableHead>
              <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.id}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.sport}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.event}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.option}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.amount}</TableCell>
                <TableCell className="px-4 py-2 text-sm text-gray-700">{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-[600px]">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Previous</Button>
        <span className="text-sm text-gray-600">Page {currentPage} of 5</span>
        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))} className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Next</Button>
      </div>
    </div>
  );
}

export default BetHistory;