import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }
    onCharsLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        });
    }
    onCharClicked = () => {
        
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
        const {charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading||error) ? this.loadItems(charList) : null;
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;