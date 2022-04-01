import './comicsList.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(120);
    const [newItemsLoading, setnewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function loadItems(arr) {
        const items = arr.map((item, i)=>{
            return(
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const content = loadItems(comicsList);
    const spinner = loading ? <Spinner/> : null;
    const errorContent = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
                {spinner}
                {errorContent}
                {content}
            <button className="button button__main button__long" onClick={()=>onRequest(offset)}>
                <div className="inner">load more {offset}</div>
            </button>
        </div>
    )
}

export default ComicsList;