import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import './singleComicPage.scss';

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(95852);
    const {loading, error, getSingleComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getSingleComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const loadingContent = loading ? <Spinner/> : null ;
    const errorContent = error ? <ErrorMessage/> : null ;
    const content = !(loading || error || !comicId) ? <View comic={comic}/> : null ; 

    return (
        <div className="single-comic">
            {loadingContent}
            {errorContent}
            {content}
        </div>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, description, price, pages, language} = comic;

    return(
        <>
        <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>    
    )
}

export default SingleComic;