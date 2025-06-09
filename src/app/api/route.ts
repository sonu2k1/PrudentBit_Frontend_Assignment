// // routes.ts - Patient API Routes Configuration

// // Base API configuration
// export const API_BASE_URL = 'https://assign.immunefile.com';

// // API Endpoints
// export const API_ENDPOINTS = {
//   // Patient endpoints
//   PATIENTS: '/api/patients',
//   PATIENT_BY_ID: (id: number | string) => `/api/patients/${id}`,
//   PATIENT_STATS: '/api/patients/stats',
  
//   // Health check
//   HEALTH: '/health'
// } as const;

// // Route configuration for frontend routing (React Router, Next.js, etc.)
// export const APP_ROUTES = {
//   HOME: '/',
//   PATIENTS: '/patients',
//   PATIENT_DETAIL: (id: number | string) => `/patients/${id}`,
//   PATIENT_SEARCH: '/patients/search',
//   DASHBOARD: '/dashboard',
//   STATS: '/stats'
// } as const;

// // Query parameter types
// export interface PatientsQuery {
//   page?: number;
//   limit?: number;
//   search?: string;
// }

// // Full URL builder functions
// export const buildApiUrl = (endpoint: string, params?: Record<string, any>) => {
//   const url = new URL(endpoint, API_BASE_URL);
  
//   if (params) {
//     Object.entries(params).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         url.searchParams.append(key, String(value));
//       }
//     });
//   }
  
//   return url.toString();
// };

// // Specific API URL builders
// export const PatientRoutes = {
//   // Get patients list with optional pagination and search
//   getPatients: (query?: PatientsQuery) => 
//     buildApiUrl(API_ENDPOINTS.PATIENTS, query),
  
//   // Get single patient by ID
//   getPatient: (id: number | string) => 
//     buildApiUrl(API_ENDPOINTS.PATIENT_BY_ID(id)),
  
//   // Get patient statistics
//   getStats: () => 
//     buildApiUrl(API_ENDPOINTS.PATIENT_STATS),
  
//   // Health check
//   healthCheck: () => 
//     buildApiUrl(API_ENDPOINTS.HEALTH)
// };

// // Example usage:
// // PatientRoutes.getPatients({ page: 1, limit: 10 })
// // PatientRoutes.getPatients({ search: 'fever', page: 2 })
// // PatientRoutes.getPatient(123)

// // For React Router or similar routing libraries
// export const routeConfig = [
//   {
//     path: APP_ROUTES.HOME,
//     name: 'Home',
//     component: 'HomePage'
//   },
//   {
//     path: APP_ROUTES.PATIENTS,
//     name: 'Patients',
//     component: 'PatientsPage'
//   },
//   {
//     path: '/patients/:id',
//     name: 'Patient Detail',
//     component: 'PatientDetailPage'
//   },
//   {
//     path: APP_ROUTES.PATIENT_SEARCH,
//     name: 'Search Patients',
//     component: 'SearchPage'
//   },
//   {
//     path: APP_ROUTES.DASHBOARD,
//     name: 'Dashboard',
//     component: 'DashboardPage'
//   },
//   {
//     path: APP_ROUTES.STATS,
//     name: 'Statistics',
//     component: 'StatsPage'
//   }
// ];

// // Type definitions for API responses
// export interface Patient {
//   patient_id: number;
//   patient_name: string;
//   age: number;
//   photo_url: string;
//   contact: {
//     address: string;
//     number: string;
//     email: string;
//   }[];
//   medical_issue: string;
// }

// export interface PaginationInfo {
//   current_page: number;
//   per_page: number;
//   total_records: number;
//   total_pages: number;
//   has_next: boolean;
//   has_previous: boolean;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   pagination?: PaginationInfo;
//   message?: string;
//   error?: string;
// }

// export interface PatientStats {
//   total_patients: number;
//   average_age: number;
//   medical_issues_breakdown: Record<string, number>;
// }

// // HTTP methods enum
// export enum HttpMethod {
//   GET = 'GET',
//   POST = 'POST',
//   PUT = 'PUT',
//   DELETE = 'DELETE',
//   PATCH = 'PATCH'
// }

// // Request configuration
// export interface RequestConfig {
//   method: HttpMethod;
//   headers?: Record<string, string>;
//   body?: any;
// }

// // Default request headers
// export const DEFAULT_HEADERS = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json'
// };

// // API client configuration
// export const apiConfig = {
//   baseUrl: API_BASE_URL,
//   timeout: 10000, // 10 seconds
//   retries: 3,
//   headers: DEFAULT_HEADERS
// };