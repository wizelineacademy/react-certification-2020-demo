const part = ['id', 'snippet'];
const maxResults = 25;

export default async function videosApi(searchTerm) {
  const { result } = await window.gapi.client.youtube.search.list({
    maxResults,
    part,
    q: searchTerm,
  });

  return result.items;
}
