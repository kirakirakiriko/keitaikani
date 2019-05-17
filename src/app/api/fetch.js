const baseUrl = 'https://api.wanikani.com/v2';

export const fetchAPI = (path, options) => apiKey => fetch(`${baseUrl}/${path}`, {
  ...options,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  }
})
  .then(res => res.json());

