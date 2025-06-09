const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ROUTES = {
  patients: `${BASE_URL}/api/patients`,
  patientById: (id: number | string) => `${BASE_URL}/api/patients/${id}`,
  stats: `${BASE_URL}/api/patients/stats`,
  health: `${BASE_URL}/health`,
};
