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

    return {loading, error, getAllCharacters, getCharacter};
}

export default useMarvelService;