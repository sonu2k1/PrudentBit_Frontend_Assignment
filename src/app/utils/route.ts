// utils/route.ts

const BASE_URL = "https://assign.immunefile.com";

export const API_ROUTES = {
  patients: `${BASE_URL}/api/patients`,
  patientById: (id: number | string) => `${BASE_URL}/api/patients/${id}`,
  stats: `${BASE_URL}/api/patients/stats`,
  health: `${BASE_URL}/health`,
};
