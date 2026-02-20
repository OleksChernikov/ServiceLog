import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DraftsState, ServiceLogDraft, ServiceLogFormValues } from '../types';
import { v4 as uuidv4 } from 'uuid';

const initialState: DraftsState = {
  drafts: [],
  savingStatus: 'idle',
};

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    createDraft: (state, action: PayloadAction<Partial<ServiceLogFormValues>>) => {
      const newDraft: ServiceLogDraft = {
        id: uuidv4(),
        providerId: action.payload.providerId || '',
        serviceOrder: action.payload.serviceOrder || '',
        carId: action.payload.carId || '',
        odometr: action.payload.odometr || 0,
        engineHours: action.payload.engineHours || 0,
        startDate: action.payload.startDate || new Date().toISOString().split('T')[0],
        endDate: action.payload.endDate || new Date(new Date().setDate(new Date().getDate() + 1))
          .toISOString()
          .split('T')[0],
        type: action.payload.type || 'planned',
        serviceDescription: action.payload.serviceDescription || '',
        isSaved: true,
        updatedAt: new Date().toISOString(),
      };
      state.drafts.push(newDraft);
      state.savingStatus = 'saved';
    },
    updateDraft: (state, action: PayloadAction<{ id: string; data: Partial<ServiceLogFormValues> }>) => {
      const draft = state.drafts.find((d) => d.id === action.payload.id);
      if (draft) {
        Object.assign(draft, action.payload.data);
        draft.isSaved = false;
        draft.updatedAt = new Date().toISOString();
        state.savingStatus = 'saving';
      }
    },
    markDraftSaved: (state, action: PayloadAction<string>) => {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (draft) {
        draft.isSaved = true;
        state.savingStatus = 'saved';
      }
    },
    deleteDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter((d) => d.id !== action.payload);
    },
    clearAllDrafts: (state) => {
      state.drafts = [];
    },
  },
});

export const { createDraft, updateDraft, markDraftSaved, deleteDraft, clearAllDrafts } =
  draftsSlice.actions;

export default draftsSlice.reducer;