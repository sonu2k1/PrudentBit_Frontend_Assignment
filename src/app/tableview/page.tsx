"use client";

import React, { useEffect, useState } from "react";
import { fetchPatients } from "../utils/api";
import { Patient } from "../types";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "fever":
      return "bg-red-100 text-red-800";
    case "headache":
      return "bg-yellow-100 text-yellow-800";
    case "sore throat":
      return "bg-orange-100 text-orange-800";
    case "sprained ankle":
      return "bg-green-100 text-green-800";
    case "rash":
      return "bg-purple-100 text-purple-800";
    case "ear infection":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const PatientTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetchPatients({ page, limit: 10 });
        setPatients(res.data);
        setHasNext(res.pagination?.has_next);
        setHasPrevious(res.pagination?.has_previous);
      } catch (err: any) {
        setError(err.message || "Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [page]);

  return (
    <div className="bg-gray-50 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Management System
          </h1>
          <p className="text-gray-600">
            Complete patient information and medical records
          </p>
        </div>

        {loading ? (
          <p className="text-center text-blue-500 py-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Age</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Medical Issue</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Address</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Phone Number</th>
                      <th className="text-left py-3 px-4 font-medium text-blue-600 text-sm">Email ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patients.map((patient) => (
                      <tr key={patient.patient_id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                          ID-{String(patient.patient_id).padStart(4, "0")}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-medium text-xs">
                                {patient.patient_name.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-sm text-gray-900 font-medium">{patient.patient_name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{patient.age}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(patient.medical_issue)}`}>
                            {patient.medical_issue}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {patient.contact?.[0]?.address || <span className="text-red-500 font-medium">N/A</span>}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {patient.contact?.[0]?.number === "N/A" || !patient.contact?.[0]?.number ? (
                            <span className="text-red-500 font-medium">N/A</span>
                          ) : (
                            <span className="text-gray-900">{patient.contact[0].number}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {patient.contact?.[0]?.email === "N/A" || !patient.contact?.[0]?.email ? (
                            <span className="text-red-500 font-medium">N/A</span>
                          ) : (
                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                              {patient.contact[0].email}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing {patients.length} patients</p>
              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={!hasPrevious}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded">{page}</span>
                <button
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={!hasNext}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return <PatientTable />;
}
