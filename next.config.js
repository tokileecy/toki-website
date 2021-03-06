require('dotenv').config()

const basePath = process.env.BASE_PATH ?? ''

module.exports = {
  basePath,
  requireConfigFile: false,
  future: {
    webpack5: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        'glslify-loader'
      ]
    })

    return config
  },
  publicRuntimeConfig: {
    basePath,
  },
}
