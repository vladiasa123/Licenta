export interface Patient {
    id?: number;
    name ?: string;
    email: string;
    gender: string;
    date: string;
    notes: string;
    diagnosis: string;
    allergies: string;
    medication: string;
    procedures?: string;
}
