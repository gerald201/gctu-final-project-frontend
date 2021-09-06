const config = {
  host: (process.env.VUE_APP_API_HOST || location.origin).replace(/\/*$/, '')
};

export default config;
