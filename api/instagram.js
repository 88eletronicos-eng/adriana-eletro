const FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

export default async function handler(request, response) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  response.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');

  if (!token) {
    return response.status(200).json({ posts: [] });
  }

  const baseUrl = userId
    ? `https://graph.facebook.com/v23.0/${userId}/media`
    : 'https://graph.instagram.com/v23.0/me/media';
  const url = new URL(baseUrl);
  url.searchParams.set('fields', FIELDS);
  url.searchParams.set('limit', '5');
  url.searchParams.set('access_token', token);

  try {
    const instagramResponse = await fetch(url);
    const payload = await instagramResponse.json();

    if (!instagramResponse.ok) {
      return response.status(200).json({ posts: [] });
    }

    const posts = (payload.data || [])
      .filter(post => post.media_url || post.thumbnail_url)
      .slice(0, 5);

    return response.status(200).json({ posts });
  } catch (error) {
    return response.status(200).json({ posts: [] });
  }
}
