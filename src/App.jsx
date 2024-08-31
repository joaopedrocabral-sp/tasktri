import { StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import useToggleMode from './hooks/darkMode';
import AppRoutes from './routes';
import MyGlobalStyles from './styles/globalStyles';

const App = () => {
  const [theme, themeToggler] = useToggleMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <StrictMode>
      <ThemeProvider theme={themeMode}>
        <MyGlobalStyles />
        <AppRoutes theme={theme} themeToggler={themeToggler} />
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;