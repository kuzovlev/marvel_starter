import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newItemsLoading: false,
        charsEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharsLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharsLoading = () => {
        this.setState({
            newItemsLoading: true,
        });
    }

    onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length<9){
            ended = true
        }
        this.setState(({offset, charList})=>({
            charList: [...charList, ...newCharList],
            loading: false,
            offset: offset+9,
            newItemsLoading: false,
            charsEnded: ended
        }))
    }

    loadItems(arr) {
        const items = arr.map((item) => {
            const imageClass = item.thumbnail.includes('image_not_available')?'unavailable':null;
            return (
                <li onClick={()=>this.props.onCharSelected(item.id)} 
                    className="char__item" 
                    key={item.id}>
                        <img src={item.thumbnail} alt="char_image" className={imageClass}/>
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
    render() {
        const {charList, loading, error, offset, newItemsLoading, charsEnded} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading||error) ? this.loadItems(charList) : null;
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    style={{"display" : charsEnded ? "none" : 'block'}}
                    className="button button__main button__long"
                    onClick={()=>this.onRequest(offset)}
                    disabled={newItemsLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;