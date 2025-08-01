// src/types.ts

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  hospital: string;
  profileImage: string;
  available: boolean; // ✅ Add this line
}
