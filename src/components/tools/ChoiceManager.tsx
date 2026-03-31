import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { NestButton } from '@/components/common/NestButton.tsx';
import { useWheelStore } from '@/store/tools/useWheelStore.ts';
import { useTranslation } from 'react-i18next';

/**
 * @file ChoiceManager.tsx
 * @description A component for managing the list of choices for the Wheel of Destiny tool.
 */

/**
 * A component that allows users to add, remove, update, and toggle choices
 * for the Wheel of Destiny.
 *
 * This component provides an interface for:
 * - Adding a new choice via a text input and an "Add" button.
 * - Viewing the list of existing choices.
 * - Toggling a choice's active state using a checkbox.
 * - Editing the text of a choice directly in a text field.
 * - Changing the color associated with a choice using a color picker.
 * - Deleting a choice.
 *
 * It interacts with a global state managed by `useWheelStore`.
 *
 * @component
 * @returns {React.ReactElement} The rendered choice management panel.
 */
const ChoiceManager: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { choices, addChoice, removeChoice, toggleChoice, updateChoice } = useWheelStore();
  const [inputValue, setInputValue] = useState('');

  /**
   * Handles adding a new choice to the list.
   * It takes the current value from the input field, trims it, and if not empty,
   * adds it to the store via `addChoice` and clears the input field.
   */
  const handleAdd = () => {
    if (inputValue.trim()) {
      addChoice(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label={t('tools.wheel.new_choice')}
          size="small"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <NestButton nestColor="primary" onClick={handleAdd} sx={{ minWidth: '40px' }}>
          <AddIcon />
        </NestButton>
      </Box>

      <Stack spacing={1} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {choices.map((choice) => (
          <Box key={choice.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={choice.isActive}
              onChange={() => toggleChoice(choice.id)}
              color="primary"
            />
            <TextField
              size="small"
              fullWidth
              value={choice.text}
              onChange={(e) => updateChoice(choice.id, { text: e.target.value })}
            />
            <input
              type="color"
              value={choice.color}
              onChange={(e) => updateChoice(choice.id, { color: e.target.value })}
              style={{
                width: '30px',
                height: '30px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            />
            <IconButton onClick={() => removeChoice(choice.id)} color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <Typography variant="caption" color="text.secondary">
        {t('tools.wheel.choices', { count: choices.length })}
      </Typography>
    </Stack>
  );
};

export default ChoiceManager;
