module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',  // Aquí estamos configurando el alias '@' para la carpeta src
        },
      },
    ],
  ],
};
 