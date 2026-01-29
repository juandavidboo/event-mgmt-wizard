import { 
  Box, 
  Typography, 
  TextField, 
  Divider, 
  FormGroup, 
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { StepProps, SERVICE_KEYS } from '../types';

export const StepIdentity = ({ formData, setFormData }: StepProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Event Details</Typography>
      
      <TextField
        label="Event Title"
        fullWidth
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g. Neighborhood Clean-up program"
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Tell the community what this event is about..."
      />

      <Divider />

      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Required Services
      </Typography>
      
      <FormGroup row>
        {SERVICE_KEYS.map((service) => (
          <FormControlLabel
            key={service}
            control={
              <Checkbox 
                checked={formData.services[service]} 
                onChange={(e) => setFormData({
                  ...formData, 
                  services: { ...formData.services, [service]: e.target.checked }
                })}
              />
            }
            label={service.charAt(0).toUpperCase() + service.slice(1)} 
          />
        ))}
      </FormGroup>
    </Box>
  );
};