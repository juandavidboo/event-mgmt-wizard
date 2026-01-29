import { 
  Box, 
  Typography, 
  TextField, 
  Divider, 
  MenuItem, 
  Button,
  List,
} from '@mui/material';
import { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { StepProps, Coordinator, ACCESS_LEVEL_OPTIONS, AccessLevel } from '../types';
import { AVAILABLE_USERS } from '../constants';
import { CoordinatorItem } from './CoordinatorItem';

export const StepTeam = ({ formData, setFormData }: StepProps) => {

  const [selectedUserId, setSelectedUserId] = useState<number | string>('');
  const adminCount = formData.coordinators.filter(c => c.role === 'admin').length;
  const handleRoleChange = (id: number, newRole: Coordinator['role']) => {
  const newCoords = formData.coordinators.map(c => 
    c.id === id ? { ...c, role: newRole } : c
  );
  setFormData({ ...formData, coordinators: newCoords });
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6">Team & Access</Typography>

      {/* Team members list */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          select
          label="Select Staff Member"
          fullWidth
          size="small"
          defaultValue=""
          value={selectedUserId} 
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {AVAILABLE_USERS.map((user) => (
            <MenuItem 
              key={user.id} 
              value={user.id}
              // disable to avoid duplicates
              disabled={formData.coordinators.some(c => c.id === user.id)}
            >
              {user.name}
            </MenuItem>
          ))}
        </TextField>

        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => {
            // search user by id
            const userToAdd = AVAILABLE_USERS.find(u => u.id === Number(selectedUserId));

            if (userToAdd) {
              const newCoord: Coordinator = {
                id: userToAdd.id,
                name: userToAdd.name,
                role: 'viewer'
              };
              setFormData({ ...formData, coordinators: [...formData.coordinators, newCoord] });
              setSelectedUserId('');
            }
          }}
        >
          Add
        </Button>
      </Box>

      <Divider />

      {/* Team members added to event */}
      <Typography variant="subtitle2">Current Coordinators:</Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #e0e0e0' }}>
        {formData.coordinators.map((coord) => (
          <CoordinatorItem 
            key={coord.id}
            coord={coord}
            onRoleChange={handleRoleChange}
            onRemove={(id) => setFormData({ ...formData, coordinators: formData.coordinators.filter(c => c.id !== id) })}
            canDelete={!(coord.role === 'admin' && adminCount === 1)}
          />
        ))}
      </List>

      <Divider />

      <TextField
        select
        label="General Access Level"
        fullWidth
        value={formData.accessLevel}
        onChange={(e) => setFormData({ 
          ...formData, 
          accessLevel: e.target.value as AccessLevel
        })}
        helperText="Who can see this event in the community calendar?"
      >
        {ACCESS_LEVEL_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label} ({option.description})
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};