import React, {
    createContext, useContext, useState
} from 'react';

type Episode = {
    Title: string;
    PublishDate: Date;
    Description: string;
    AudioLink: string;
    Season?: number | null;
    Number?: number | null;
    Duration: string;
}

type Podcast = {
    Name: string;
    Description: string;
    Episodes: Episode[];
}

const defaultPodcastMeta = {
    Name: "",
    Description: "",
    Episodes: [],
}
const PodcastContext = createContext<Podcast>(defaultPodcastMeta);

const PodcastProvider = ({children}) => {
    const [isFetched, setIsFetched] = useState(false);
    const [data, setData] = useState<Podcast>(defaultPodcastMeta);
  
    if (!isFetched) {
        setIsFetched(true);
        fetch("https://anchor.fm/s/e741494c/podcast/rss")
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
            .then(data => {            
                const channel = data.querySelector('channel')!;
                const feedEpisodeList = data.querySelectorAll('item');

                let podcastPayload: Podcast = {
                    Name: channel.querySelector('title')?.textContent || '',
                    Description: channel.querySelector('description')?.textContent || '',
                    Episodes: [],
                }
                let episodes : Episode[] = [];

                feedEpisodeList.forEach(el => {
                    episodes.push({
                    PublishDate: new Date(el.querySelector('pubDate')!.textContent!),
                    Title: el.querySelector('title')?.textContent || '',
                    Description: el.querySelector('description')?.textContent || '',
                    AudioLink: el.querySelector('enclosure')?.getAttribute('url') || '',
                    Season: parseInt(el.getElementsByTagName('itunes:season')?.item.toString() || ''),
                    Number: parseInt(el.getElementsByTagName('itunes:episode')?.item.toString() || ''),
                    Duration: el.getElementsByTagName('itunes:duration')?.item.toString() || '00:00',
                });
            });
            
            podcastPayload.Episodes = episodes;
            setData(podcastPayload)
        });
    }

    return (
        <PodcastContext.Provider value={data}>
            {children}
        </PodcastContext.Provider>
    )
};

export {
    Podcast,
    defaultPodcastMeta,
    Episode,
};
export const usePodcast = () => useContext(PodcastContext);
export default PodcastProvider;
