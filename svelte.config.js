import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;