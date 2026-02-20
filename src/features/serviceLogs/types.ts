export type ServiceType = 'planned' | 'unplanned' | 'emergency';

export interface ServiceLogFormValues {
  providerId: string;
  serviceOrder: string;
  carId: string;
  odometr: number;
  engineHours: number;
  startDate: string;
  endDate: string;
  type: ServiceType;
  serviceDescription: string;
  isSaved?: boolean;
}

export interface ServiceLogDraft extends Omit<ServiceLogFormValues, 'odometr' | 'engineHours'> {
  id: string;
  odometr: number;
  engineHours: number;
  isSaved: boolean;
  updatedAt: string;
}

export interface DraftsState {
  drafts: ServiceLogDraft[];
  savingStatus: 'idle' | 'saving' | 'saved';
}