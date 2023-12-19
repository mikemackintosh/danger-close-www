import { parse as parseFeed } from 'rss-to-json';
import { array, number, object, parse, string } from 'valibot';

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  audio: {
    src: string
    type: string
  }
}

export async function getAllEpisodes(feedUrl: string) {
  let FeedSchema = object({
    items: array(
      object({
        id: number(),
        title: string(),
        published: number(),
        description: string(),
        content: string(),
        enclosures: array(
          object({
            url: string(),
            type: string(),
          }),
        ),
      }),
    ),
  })

  let feed = (await parseFeed(
    feedUrl,
  )) as any;

  console.log("feed", feed.items);
  
  let episodes: Array<Episode> = feed.items.map(
    ({ id, title, description, content, enclosures, published }) => ({
      id,
      title: `${title}`,
      published: new Date(published),
      description,
      content,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return episodes
}
