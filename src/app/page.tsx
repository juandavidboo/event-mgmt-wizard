'use client';

import { useState, useEffect } from 'react';
import { 
  Container,
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  Box
} from '@mui/material';
// Domain Components
import { StepIdentity } from './components/StepIdentity';
import { StepLocation } from './components/StepLocation';
import { StepTeam } from './components/StepTeam';
import { StepReview } from './components/StepReview';
import { SubmissionOverlay } from './components/Overlay';
// Definitions
import { EventFormData } from './types';
import { STEPS, INITIAL_STATE } from './constants';

// WizardPage Orchestrator - This component manages the shared state and navigation logic.
 
export default function WizardPage() {
  // Navigation state
  const [activeStep, setActiveStep] = useState(0);
  // Shared Form state
  const [formData, setFormData] = useState<EventFormData>(INITIAL_STATE);
  // Submission state
  const [isFinished, setIsFinished] = useState(false);

  const isLastStep = activeStep === STEPS.length - 1;

  // Navigation logic handlers
  const handleNext = () => {
    if (isLastStep) {
      console.log("Final Data to Send:", formData);
      
      // 1. Enable the overlay and disable buttons
      setIsFinished(true);

      // 2. We use a small timeout to allow React to render the overlay 
      // before the blocking alert window appears.
      window.setTimeout(() => {
        alert("Event Created Successfully!");
        
        // 3. Reset everything after the user clicks "OK"
        setActiveStep(0);
        setIsFinished(false);
        setFormData(INITIAL_STATE);
      }, 100); // 100ms is enough for a smooth render
      
      return;
    }
    
    if (activeStep < STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: return <StepIdentity formData={formData} setFormData={setFormData} />;
      case 1: return <StepLocation formData={formData} setFormData={setFormData} />;
      case 2: return <StepTeam formData={formData} setFormData={setFormData} />;
      case 3: return <StepReview formData={formData} setFormData={setFormData} />;
      default: return <div>Unknown Step</div>;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {isFinished && <SubmissionOverlay />}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Event Manager
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 4 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '300px', py: 2 }}>
          <Typography color="textSecondary" sx={{ mb: 1}}>
            Current Step: {activeStep + 1} of {STEPS.length}
          </Typography>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={isFinished}
            sx={{
              // color fix for disabled state
              "&.Mui-disabled": {
                backgroundColor: "rgba(0, 0, 0, 0.12)",
                color: "rgba(0, 0, 0, 0.38)",
              }
            }}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

