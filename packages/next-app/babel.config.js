module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@emotion',
      {
        // sourceMap is on by default but source maps are dead code eliminated in production
        'sourceMap': true,
        'autoLabel': 'dev-only',
        'labelFormat': '[local]',
        'cssPropOptimization': true,
      },
    ],
  ],
}
