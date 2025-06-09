// utils/api.ts

import { ApiResponse, PaginationResponse, Patient, PatientStats } from "../types";
import { API_ROUTES } from "./route";
// import { Patient, PatientStats, PaginationResponse, ApiResponse } from "../types";

export async function fetchPatients({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginationResponse<Patient[]>> {
  const url = new URL(API_ROUTES.patients);
  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));
  if (search) url.searchParams.append("search", search);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch patients");
  }

  const data: PaginationResponse<Patient[]> = await res.json();
  return data;
}

export async function fetchPatientById(id: number): Promise<ApiResponse<Patient>> {
  const res = await fetch(API_ROUTES.patientById(id));

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch patient");
  }

  const data: ApiResponse<Patient> = await res.json();
  return data;
}

export async function fetchPatientStats(): Promise<ApiResponse<PatientStats>> {
  const res = await fetch(API_ROUTES.stats);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch statistics");
  }

  const data: ApiResponse<PatientStats> = await res.json();
  return data;
}

export async function healthCheck(): Promise<{ status: string; message: string }> {
  const res = await fetch(API_ROUTES.health);

  if (!res.ok) {
    throw new Error("Health check failed");
  }

  const data = await res.json();
  return data;
}
