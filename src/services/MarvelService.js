

class MarvelService {
    _apiUrl = 'https://gateway.marvel.com/v1/public/';
    _apiKey = 'apikey=c4a996c4ed01a6fdda90484c52f3425f';


    getResource = async (url) =>  {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();   
    }

    getAllCharacters = async () => {
        const serviceLink = "characters?limit=9&offset=210";
        const res = await this.getResource(`${this._apiUrl}${serviceLink}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const serviceLink = `characters/${id}?`;
        const res = await this.getResource(`${this._apiUrl}${serviceLink}${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService;