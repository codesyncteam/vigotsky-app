
const primaryColorLight = '#E7013D';
const primaryColorDark = '#E7013D';
const secondaryColorLight = '#29348E';
const secondaryColorDark = '#29348E';

const headerbackgroundColorLight = '#29348E';
const headerbackgroundColorDark = '#000';

export const Colors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    placeholderText: '#888888',
    inputBorder: '#cccccc',
    inputBackground: '#f9f9f9',
    buttonBackground: secondaryColorLight,
    buttonText: '#ffffff',
    tint: primaryColorLight,  // Color principal para light mode
    backgroundColor: headerbackgroundColorLight, // Color de fondo para light mode
    headerTintColor: '#ffffff',  // Color del texto en el header
    primary: primaryColorLight,  // Color primario
    secondary: secondaryColorLight,  // Color secundario
  },
  dark: {
    background: '#000000',
    text: '#ffffff',
    placeholderText: '#888888',
    inputBorder: '#333333',
    inputBackground: '#222222',
    buttonBackground: secondaryColorDark,
    buttonText: '#ffffff',
    tint: primaryColorDark,  // Color principal para dark mode
    backgroundColor: headerbackgroundColorDark,
    headerTintColor: '#ffffff',
    primary: primaryColorDark,  // Color primario
    secondary: secondaryColorDark,  // Color secundario
  },
};
