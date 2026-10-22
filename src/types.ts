export interface LandRecord {
  id: string;
  surveyNo: string;
  plotIdentifier: string;
  districtCity: string;
  village: string;
  length: number;
  width: number;
  totalAreaSqFt: number;
  totalAreaAcres: number;
  estimatedValue: string; // e.g. "37,50,000" or "$45,000"
  estimatedValueRaw: number;
  valueUsd?: string;
  zoning: string;
  photoUrl: string;
  fileName: string;
  registrationDate: string;
  mutationStatus: string;
  natureOfHolding: string;
  encumbrance: string;
  certificateNo: string;
  blockchainHash: string;
  geoCenter: string;
  boundaryStatus?: string;
  roadFrontage?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  uidai: string;
  role: string;
  studentRegNo: string;
  password?: string;
}

export type NavigationTab = 'auth' | 'dashboard' | 'registration' | 'java';
