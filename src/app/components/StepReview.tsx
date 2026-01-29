import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Avatar
} from '@mui/material';
import { StepProps, SERVICE_KEYS } from '../types';
import {  } from '../constants';

export const StepReview = ({ formData }: StepProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" color="primary">Review Event Details</Typography>
      
      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9' }}>
        <Typography variant="subtitle2" color="textSecondary">General Information</Typography>
        <Typography variant="h5">{formData.title || 'No Title'}</Typography>
        <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>{formData.description}</Typography>
        
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {SERVICE_KEYS.map(key => formData.services[key] && (
            <Chip key={key} label={key} size="small" color="secondary" variant="outlined" />
          ))}
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">When & Where</Typography>
          <Typography variant="body1"><strong>Date:</strong> {formData.date || 'Not set'}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {formData.locationName || 'Not set'}</Typography>
          <Typography variant="caption">({formData.locationType})</Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">Privacy</Typography>
          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
            <strong>Level:</strong> {formData.accessLevel}
          </Typography>
        </Paper>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>Team Members</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {formData.coordinators.map(coord => (
            <Chip 
              key={coord.id}
              avatar={<Avatar>{coord.name[0]}</Avatar>}
              label={`${coord.name} (${coord.role})`}
              variant="outlined"
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};