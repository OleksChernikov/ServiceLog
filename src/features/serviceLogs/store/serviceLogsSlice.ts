import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServiceLogFormValues } from '../types';
import { v4 as uuidv4 } from 'uuid';

export interface ServiceLog extends ServiceLogFormValues {
  id: string;
  createdAt: string;
}

interface ServiceLogsState {
  logs: ServiceLog[];
}

const initialState: ServiceLogsState = {
  logs: [],
};

export const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    addServiceLog: (state, action: PayloadAction<ServiceLogFormValues>) => {
      const newLog: ServiceLog = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.logs.push(newLog);
    },
    deleteServiceLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload);
    },
    updateServiceLog: (state, action: PayloadAction<{ id: string; data: Partial<ServiceLogFormValues> }>) => {
      const log = state.logs.find((l) => l.id === action.payload.id);
      if (log) Object.assign(log, action.payload.data);
    },
  },
});

export const { addServiceLog, deleteServiceLog, updateServiceLog } = serviceLogsSlice.actions;
export default serviceLogsSlice.reducer;