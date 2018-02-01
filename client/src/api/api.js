export const fetchUrl = url => fetch(url).then(response => {
  if (response.status === 404) {
    return {notFound: true};
  }
  return response.json();
}).catch(error => {
  return error;
});
