import { Box, TextField, MenuItem, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../../../app/store';
import { deleteServiceLog } from '../store/serviceLogsSlice';

export const ServiceLogsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector((state: RootState) => state.serviceLogs.logs);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'planned' | 'unplanned' | 'emergency'>('all');
  const [filterStartDate, setFilterStartDate] = useState('');

  const filteredLogs = useMemo(() => {
    return logs.filter((d) => {
      const matchesSearch =
        d.providerId?.toLowerCase().includes(search.toLowerCase()) ||
        d.serviceOrder?.toLowerCase().includes(search.toLowerCase()) ||
        d.carId?.toLowerCase().includes(search.toLowerCase());

      const matchesType = filterType === 'all' || d.type === filterType;
      const matchesStartDate = !filterStartDate || d.startDate >= filterStartDate;

      return matchesSearch && matchesType && matchesStartDate;
    });
  }, [logs, search, filterType, filterStartDate]);

  const columns: GridColDef[] = [
    { field: 'providerId', headerName: 'Provider ID', flex: 1 },
    { field: 'serviceOrder', headerName: 'Service Order', flex: 1 },
    { field: 'carId', headerName: 'Car ID', flex: 1 },
    { field: 'odometr', headerName: 'Odometer', type: 'number', flex: 1 },
    { field: 'engineHours', headerName: 'Engine Hours', type: 'number', flex: 1 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'serviceDescription', headerName: 'Description', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="error" onClick={() => dispatch(deleteServiceLog(params.row.id))}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className='table-container'>
      <Box sx={{ height: 600, width: '100%', mt: 5 }}>
        <div className='table-search'>
          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs:12, md:4 }}>
              <TextField
                fullWidth
                label="Search by Provider/Order/Car"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs:12, md:4 }}>
              <TextField
                select
                fullWidth
                label="Filter by Type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="planned">Planned</MenuItem>
                <MenuItem value="unplanned">Unplanned</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs:12, md:4 }}>
              <TextField
                fullWidth
                type="date"
                label="Filter Start Date"
                placeholder=''
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  lang: 'en',
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className='table-actions'>
          <DataGrid
            rows={filteredLogs.map((d) => ({ ...d, id: d.id }))}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            sx={{
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          />
        </div>
      </Box>
    </div>
  );
};