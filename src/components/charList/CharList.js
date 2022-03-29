import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [error, setError] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [charsEnded, setCharsEnded] = useState(false);
    const [activeChar, setActiveChar] = useState(null);


    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharsLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharsLoading = () => {
        setNewItemsLoading(true);
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharsEnded(charsEnded => ended);
    }

    const activeOnClick = (id) => {
        setActiveChar(id);
    }

    function loadItems(arr) {
        const items = arr.map((item) => {
            const imageClass = item.thumbnail.includes('image_not_available') ? 'unavailable' : null;
            let active;
            if (activeChar === item.id) {
                active = true;
            }
            const charClass = active ? 'char__item char__item_selected' : "char__item";
            return (
                <li
                    className={charClass}
                    tabIndex={0}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        activeOnClick(item.id);
                    }}>
                    <img src={item.thumbnail} alt="char_image" className={imageClass} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? loadItems(charList) : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button
                style={{ "display": charsEnded ? "none" : 'block' }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;