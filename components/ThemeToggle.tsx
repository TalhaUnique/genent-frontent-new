import { useContext } from 'react';
import { IconButton, Switch, FormControlLabel } from '@mui/material';
import { ThemeContext } from '../theme/muiTheme';

const ThemeToggle = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    color="primary"
                />
            }
            label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
        />
    );
};

export default ThemeToggle;