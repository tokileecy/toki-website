module.exports = {
  babel: async (options) => ({
    ...options,
    // presets: [ [ "@babel/preset-env", { "targets": { "node": true } } ] ],
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
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ]
  }),
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../packages/next-app/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
}