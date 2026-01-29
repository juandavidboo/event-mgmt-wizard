// Interfaces and types for the wizard steps and form data
export interface StepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

export const ACCESS_LEVEL_OPTIONS = [
  { value: 'private', label: 'Private', description: 'Only Team' },
  { value: 'internal', label: 'Internal', description: 'All Staff' },
  { value: 'public', label: 'Public', description: 'Everyone' },
] as const;

export type AccessLevel = typeof ACCESS_LEVEL_OPTIONS[number]['value'];

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  locationType: 'existing' | 'new';
  locationName: string;
  coordinators: Coordinator[];
  accessLevel: AccessLevel;
  services: Record<ServiceKey, boolean>;
}

export const ROLES = ['admin', 'editor', 'viewer'] as const;
export type Role = typeof ROLES[number];

export interface Coordinator {
  id: number;
  name: string;
  role: Role;
}

export const SERVICE_KEYS = ['audio', 'security', 'cleaning', 'catering'] as const;
export type ServiceKey = typeof SERVICE_KEYS[number];
