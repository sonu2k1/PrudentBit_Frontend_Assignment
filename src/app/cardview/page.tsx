"use client";

import React, { useEffect, useState } from "react";
import { fetchPatients } from "../utils/api";
import { Patient } from "../types";
import { MapPin, Phone, Mail } from "lucide-react";

// ===================
// PatientCard Component
// ===================
const PatientCard = ({ patient }: { patient: Patient }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "fever":
        return "bg-red-100 text-red-800 border-red-200";
      case "headache":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "sore throat":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "sprained ankle":
        return "bg-green-100 text-green-800 border-green-200";
      case "rash":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAgeColor = (age: number) => {
    if (age <= 30) return "bg-blue-500";
    if (age <= 50) return "bg-blue-600";
    return "bg-blue-700";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {patient.patient_name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{patient.patient_name}</h3>
            <p className="text-sm text-gray-500">ID-{String(patient.patient_id).padStart(4, "0")}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getAgeColor(patient.age)}`}>
          Age {patient.age}
        </div>
      </div>

      <div className="mb-3">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(patient.medical_issue)}`}>
          {patient.medical_issue}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600">{patient.contact?.[0]?.address || "N/A"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600">{patient.contact?.[0]?.number || "N/A"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
            {patient.contact?.[0]?.email || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ===================
// Main Page Component
// ===================
export default function Page() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchPatients({ page, limit: 8 });
        setPatients(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [page]);

  return (
    <div className="bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patient Directory</h1>
        <p className="text-gray-600 text-sm">Manage patient contacts and medical status</p>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {patients.map(patient => (
            <PatientCard key={patient.patient_id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
}
