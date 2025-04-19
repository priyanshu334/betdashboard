"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Member = {
  _id: string;
  memberId: string;
  fullName: string;
  phone: string;
  money: number;
  role: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("https://backend.nurdcells.com/api/members");
        setMembers(res.data.members);
      } catch (err) {
        console.error("Failed to fetch members", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">All Members</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member._id} className="shadow-md hover:shadow-xl transition-all border-0">
              <CardHeader className="bg-blue-500 rounded-t-lg p-4">
                <CardTitle className="text-white text-lg">{member.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                <p><span className="font-semibold text-gray-700">ID:</span> {member.memberId}</p>
                <p><span className="font-semibold text-gray-700">Phone:</span> {member.phone}</p>
                <p><span className="font-semibold text-gray-700">Money:</span> ₹{member.money}</p>
                <p><span className="font-semibold text-gray-700">Role:</span> {member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
