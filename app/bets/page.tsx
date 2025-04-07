"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const BetHistory = () => {
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(2);
  
  const data = [
    { id: "Abc102", sport: "Cricket", event: "IPL 2025", option: "123 back", amount: "1,000", status: "Current" },
    { id: "Def456", sport: "Football", event: "Premier League", option: "Chelsea win", amount: "500", status: "Won" },
    { id: "Ghi789", sport: "Tennis", event: "Australian Open", option: "Set Winner", amount: "300", status: "Lost" },
    { id: "Jkl012", sport: "Basketball", event: "NBA Finals", option: "Total Points", amount: "750", status: "Refunded" }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const filteredData = data.filter((item) => 
    item.id.toLowerCase().includes(searchId.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'won': return "bg-green-100 text-green-800 border-green-200";
      case 'lost': return "bg-red-100 text-red-800 border-red-200";
      case 'refunded': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'current': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 w-full min-h-screen max-w-full lg:max-w-7xl mx-auto bg-gray-50">
      <Card className="shadow-lg border-gray-200">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-t-lg p-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">Bet History</CardTitle>
          <p className="text-gray-200 text-xs sm:text-sm">View and track all your betting activities</p>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by ID..." 
              value={searchId} 
              onChange={handleSearchChange} 
              className="w-full max-w-md pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <Table className="w-full">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">ID</TableHead>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">Sports</TableHead>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 hidden sm:table-cell">Event</TableHead>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 hidden md:table-cell">Option</TableHead>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200 bg-white">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-gray-800">{item.id}</TableCell>
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700">{item.sport}</TableCell>
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{item.event}</TableCell>
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{item.option}</TableCell>
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">${item.amount}</TableCell>
                      <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(item.status)}`}>
                          {item.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No records found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 sm:mt-6 px-2">
            <Button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    currentPage === page 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))} 
              disabled={currentPage === 5}
              className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BetHistory;