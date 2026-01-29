import { 
  Box, 
  Typography, 
  TextField, 
  Divider, 
  MenuItem, 
} from '@mui/material';
import { StepProps } from '../types';
import { EXISTING_LOCATIONS } from '../constants';

export const StepLocation = ({ formData, setFormData }: StepProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Date & Location</Typography>

      {/* Native input */}
      <TextField
        label="Event Date"
        type="date"
        sx={{ width: "18ch" }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />

      <Divider />

      {/* Location select */}
      <TextField
        select
        label="Where will it take place?"
        fullWidth
        value={formData.locationType}
        onChange={(e) => setFormData({ 
          ...formData, 
          locationType: e.target.value as 'existing' | 'new',
          locationName: ''
        })}
      >
        <MenuItem value="existing">Select an existing Community Center</MenuItem>
        <MenuItem value="new">Register a new location</MenuItem>
      </TextField>

      {/* existing OR unregistered location */}
      {formData.locationType === 'existing' ? (
        <TextField
          select
          label="Community Center"
          fullWidth
          value={formData.locationName}
          onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
        >
          {EXISTING_LOCATIONS.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          label="Full Address / Venue Name"
          fullWidth
          required
          value={formData.locationName}
          onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
          helperText="Please be as specific as possible"
        />
      )}
    </Box>
  );
};