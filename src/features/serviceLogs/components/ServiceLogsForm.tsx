import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceLogShema } from '../validationShema';
import type { ServiceLogFormValues } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../app/store';
import { createDraft, clearAllDrafts } from '../store/draftSlice';
import { addServiceLog } from '../store/serviceLogsSlice';

const getToday = () => new Date().toISOString().split('T')[0];

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export const ServiceLogForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const lastDraft = useSelector((state: RootState) => {
    const drafts = state.drafts.drafts;
    return drafts.length > 0 ? drafts[drafts.length - 1] : null;
  });

  const initialValues: ServiceLogFormValues = lastDraft
    ? {
        providerId: lastDraft.providerId,
        serviceOrder: lastDraft.serviceOrder,
        carId: lastDraft.carId,
        odometr: lastDraft.odometr,
        engineHours: lastDraft.engineHours,
        startDate: lastDraft.startDate,
        endDate: lastDraft.endDate,
        type: lastDraft.type,
        serviceDescription: lastDraft.serviceDescription,
      }
    : {
        providerId: '',
        serviceOrder: '',
        carId: '',
        odometr: 0,
        engineHours: 0,
        startDate: getToday(),
        endDate: getTomorrow(),
        type: 'planned',
        serviceDescription: '',
      };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ServiceLogFormValues>({
    resolver: yupResolver(serviceLogShema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      if (!values) return;

      dispatch(clearAllDrafts());
      dispatch(createDraft(values as ServiceLogFormValues));
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const startDate = watch('startDate');
  useEffect(() => {
    if (startDate) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + 1);
      setValue('endDate', date.toISOString().split('T')[0]);
    }
  }, [startDate, setValue]);

  const onSubmit = (data: ServiceLogFormValues) => {
    dispatch(addServiceLog(data));

    dispatch(clearAllDrafts());

    reset({
      providerId: '',
      serviceOrder: '',
      carId: '',
      odometr: 0,
      engineHours: 0,
      startDate: getToday(),
      endDate: getTomorrow(),
      type: 'planned',
      serviceDescription: '',
    });

    alert('Service Log created!');
  };

  return (
    <div className='form-container'>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <Typography variant="h5" mb={4} sx={{ color: '#1976d2' }}>
        Create Service Log
      </Typography>

      <Grid container spacing={2}>
        {[
          { name: 'providerId', label: 'Provider ID' },
          { name: 'serviceOrder', label: 'Service Order' },
          { name: 'carId', label: 'Car ID' },
        ].map((field) => (
          <Grid size={{ xs:12, md:6 }} key={field.name}>
            <Controller
              name={field.name as keyof ServiceLogFormValues}
              control={control}
              render={({ field: controllerField }) => (
                <TextField
                  {...controllerField}
                  fullWidth
                  label={field.label}
                  error={!!errors[field.name as keyof ServiceLogFormValues]}
                  helperText={
                    errors[field.name as keyof ServiceLogFormValues]?.message
                  }
                />
              )}
            />
          </Grid>
        ))}

        <Grid size={{ xs:12, md:6 }}>
          <Controller
            name="odometr"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Odometer (mi)"
                error={!!errors.odometr}
                helperText={errors.odometr?.message}
                sx={{
                  '& input[type=number]::-webkit-inner-spin-button': {
                    filter: 'invert(2)',
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs:12, md:6 }}>
          <Controller
            name="engineHours"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                fullWidth
                label="Engine Hours"
                error={!!errors.engineHours}
                helperText={errors.engineHours?.message}
                sx={{
                  '& input[type=number]::-webkit-inner-spin-button': {
                    filter: 'invert(2)',
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs:12, md:6 }}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label="Start Date"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs:12, md:6 }}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                label="End Date"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} select fullWidth label="Service Type">
                <MenuItem value="planned">Planned</MenuItem>
                <MenuItem value="unplanned">Unplanned</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <Controller
            name="serviceDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                label="Service Description"
                error={!!errors.serviceDescription}
                helperText={errors.serviceDescription?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <Button variant="contained" type="submit" color="primary">
            Create Service Log
          </Button>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};