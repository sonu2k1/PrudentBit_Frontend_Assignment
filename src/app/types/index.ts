// types/index.ts

export interface Contact {
  address: string;
  number: string;
  email: string;
}

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string;
  contact: Contact[];
  medical_issue: string;
}

export interface PatientStats {
  total_patients: number;
  average_age: number;
  medical_issues_breakdown: {
    [issue: string]: number;
  };
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: any;
}

export interface PaginationResponse<T> extends ApiResponse<T> {
  pagination: PaginationMeta;
}
