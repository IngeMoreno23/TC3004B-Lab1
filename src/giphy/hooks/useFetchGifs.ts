import { useEffect, useState } from 'react';
import { getGifs } from '../helpers/getGifs';
import type { Gif } from '../helpers/getGifs';

interface UseFetchGifsReturn {
    images: Gif[];
    isLoading: boolean;
}

export const useFetchGifs = (category: string): UseFetchGifsReturn => {
    const [images, setImages] = useState<Gif[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const getImages = async () => {
        const newImages = await getGifs(category);
        setImages(newImages);
        setIsLoading(false);
    }
    
    useEffect(() => {
        getImages();
    }, [category]);
    
    return {
        images,
        isLoading
    }
}