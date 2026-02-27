interface GiphyImage {
    id: string;
    title: string;
    images: {
        downsized_medium: {
            url: string;
        };
    };
}

interface GiphyResponse {
    data: GiphyImage[];
}

export interface Gif {
    id: string;
    title: string;
    url: string;
}

export const getGifs = async (category: string): Promise<Gif[]> => {
    const api_key = import.meta.env.VITE_GIPHY_API_KEY;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${category}&limit=10`;
    const resp = await fetch(url);
    const { data } = await resp.json() as GiphyResponse;
    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }));
    return gifs;
}