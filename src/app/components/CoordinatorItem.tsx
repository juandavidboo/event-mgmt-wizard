import { 
  Box, 
  Typography, 
  TextField, 
  MenuItem, 
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Chip
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Coordinator, ROLES } from '../types';


export const CoordinatorItem = ({ 
  coord, 
  onRoleChange, 
  onRemove, 
  canDelete 
}: {
  coord: Coordinator;
  onRoleChange: (id: number, role: Coordinator['role']) => void;
  onRemove: (id: number) => void;
  canDelete: boolean;
}) => (
  <ListItem
    key={coord.id}
    sx={{
      borderBottom: '1px solid #e0e0e0',
      '&:last-child': {
        borderBottom: 'none', // last item no border
      },
    }}
    secondaryAction={
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Role selector */}
        <TextField
          select
          size="small"
          value={coord.role}
          sx={{ width: 110 }}
          onChange={(e) => onRoleChange(coord.id, e.target.value as Coordinator['role'])}
        >
          {ROLES.map((role) => (
            <MenuItem key={role} value={role}>
              {/* Capitalize the first letter for the UI */}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        {/* delete with validation */}
        <IconButton 
          edge="end" 
          color="error"
          // RULE: keep at least one admin
          disabled={!canDelete}
          onClick={() => {
            onRemove(coord.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    }
  >
    <Avatar sx={{ mr: 2, bgcolor: coord.role === 'admin' ? 'primary.main' : 'grey.500' }}>
      {coord.name[0]}
    </Avatar>

    <ListItemText>
      <Typography variant="body1">
        {coord.name}
      </Typography>
      <Box component="div" sx={{ mt: 0.5 }}>
        <Chip 
          label={coord.role.toUpperCase()} 
          size="small" 
          variant="outlined"
          color={coord.role === 'admin' ? 'primary' : 'default'}
          sx={{ mt: 0.5, fontSize: '0.65rem', height: '20px' }}
        />
      </Box>
    </ListItemText>
  </ListItem>
);