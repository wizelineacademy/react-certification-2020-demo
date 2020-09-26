import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useUserPreferences } from '../../providers/UserPreferences';

function ThemeSwitch() {
  const { isLightTheme, setInverseTheme } = useUserPreferences();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={!isLightTheme}
          onChange={setInverseTheme}
          name="darkMode"
          inputProps={{ 'aria-label': 'theme switch' }}
        />
      }
      label="Dark mode"
    />
  );
}

export default ThemeSwitch;
