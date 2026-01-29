import { EventFormData } from './types';

// defined in types.ts to avoid circular dependencies
// export const SERVICE_KEYS = ['audio', 'security', 'cleaning', 'catering'] as const;

export const STEPS = ['Identity', 'Location', 'Team', 'Review'] as const;

export const SERVICE_KEYS = ['audio', 'security', 'cleaning', 'catering'] as const;

export const EXISTING_LOCATIONS = [
  "Central Neighborhood Club",
  "St. Andrews Community Hall",
  "Westside Social Center",
  "City Hall Annex"
] as const;

export const AVAILABLE_USERS = [
  { id: 201, name: "James Wilson" },
  { id: 202, name: "Emily Carter" },
  { id: 203, name: "Michael Thompson" },
  { id: 204, name: "Sarah Collins" },
  { id: 205, name: "David Anderson" },
  { id: 206, name: "Olivia Parker" },
  { id: 207, name: "Daniel Brooks" },
  { id: 208, name: "Laura Mitchell" }
] as const;

export const INITIAL_STATE: EventFormData = {
  title: '',
  description: '', 
  date: '',
  locationType: 'existing',
  locationName: '',
  coordinators: [{ id: 1, name: 'You (Creator)', role: 'admin' }],
  accessLevel: 'internal',
  services: { audio: false, security: false, cleaning: false, catering: false },
};