import './comicsList.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(100);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

    useEffect(()=>{
        comicsRequest(true, offset);
    },[])

    const comicsRequest = (initial, offset) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 9) {
            ended = true
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemsLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    function loadItems(arr) {
        const items = arr.map(item=>{
            return(
                <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </a>
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

    return (
        <div className="comics__list">
                {content}
            <button className="button button__main button__long" onClick={()=>comicsRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;