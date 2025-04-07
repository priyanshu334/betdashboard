import React, { useEffect, useState } from "react";
import axios from "axios";

interface AdminData {
  adminId: string;
  fullName: string;
  phone: string;
  money: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const AdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<AdminData>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = () => {
    setLoading(true);
    axios
      .get("/api/admin/profile")
      .then((res) => {
        setAdmin(res.data);
        setEditedData({
          fullName: res.data.fullName,
          phone: res.data.phone,
        });
      })
      .catch((err) => {
        console.error("Error fetching admin data:", err);
        setError("Failed to load profile data");
      })
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setError(null);
    
    axios
      .put("/api/admin/profile", editedData)
      .then((res) => {
        setAdmin({
          ...admin!,
          ...editedData,
          updatedAt: new Date().toISOString(),
        });
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Failed to update profile");
      })
      .finally(() => setIsSaving(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg border border-red-200">
        <p className="text-lg text-red-600">Failed to load profile data</p>
        <button 
          onClick={fetchAdminData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedData({
                  fullName: admin.fullName,
                  phone: admin.phone,
                });
              }}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <ProfileRow 
          label="Admin ID" 
          value={admin.adminId} 
          isReadOnly={true}
        />
        <ProfileRow 
          label="Full Name" 
          value={isEditing ? editedData.fullName || "" : admin.fullName} 
          name="fullName"
          isEditing={isEditing} 
          onChange={handleInputChange}
        />
        <ProfileRow 
          label="Phone Number" 
          value={isEditing ? editedData.phone || "" : admin.phone} 
          name="phone"
          isEditing={isEditing} 
          onChange={handleInputChange}
        />
        <ProfileRow 
          label="Balance" 
          value={`₹${admin.money.toFixed(2)}`} 
          isReadOnly={true}
        />
        <ProfileRow 
          label="Role" 
          value={admin.role} 
          isReadOnly={true}
        />
        <ProfileRow 
          label="Created At" 
          value={new Date(admin.createdAt).toLocaleString()} 
          isReadOnly={true}
        />
        <ProfileRow 
          label="Last Updated" 
          value={new Date(admin.updatedAt).toLocaleString()} 
          isReadOnly={true}
        />
      </div>
    </div>
  );
};

interface ProfileRowProps {
  label: string;
  value: string;
  name?: string;
  isEditing?: boolean;
  isReadOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ 
  label, 
  value, 
  name, 
  isEditing = false, 
  isReadOnly = false,
  onChange 
}) => (
  <div className="flex justify-between items-center border-b border-gray-200 py-3">
    <span className="font-medium text-gray-700">{label}:</span>
    {isEditing && !isReadOnly ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="ml-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    ) : (
      <span className={`text-gray-900 ${isReadOnly ? 'text-gray-500' : ''}`}>{value}</span>
    )}
  </div>
);

export default AdminProfile;