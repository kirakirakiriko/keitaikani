const baseUrl = 'http://localhost:1337/api.wanikani.com/v2';

export const fetchAPI = (path, options) => apiKey => fetch(`${baseUrl}/${path}`, {
  ...options,
  headers: {
    ...(options ? options.headers : {}),
    Authorization: `Bearer ${apiKey}`,
    'Wanikani-Revision': '20170710',
  }
})
  .then(res => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return res.json();
  })
  .catch(err => {
    console.error(`Error fetching WaniKani API: ${err}`);
    console.error(err);
    throw err;
  });

