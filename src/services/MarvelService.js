import {useHttp} from '../hooks/http.hook';


const useMarvelService = () => {

    const {loading, request, error} = useHttp();

    const _apiUrl = 'https://gateway.marvel.com/v1/public/';
    const _apiKey = 'apikey=c4a996c4ed01a6fdda90484c52f3425f';
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const serviceLink = `characters?limit=9&offset=${offset}`;
        const res = await request(`${_apiUrl}${serviceLink}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const serviceLink = `characters/${id}?`;
        const res = await request(`${_apiUrl}${serviceLink}${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset) => {
        const serviceLink = `comics?limit=8&offset=${offset}&`;
        const res = await request(`${_apiUrl}${serviceLink}${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            id:char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id:comics.id,
            title: comics.title,
            description: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            // homepage: comics.urls[0].url,
            // wiki: comics.urls[1].url,
            price: comics.prices[0].price
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;