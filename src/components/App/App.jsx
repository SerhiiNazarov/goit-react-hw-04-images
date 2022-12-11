import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from '../GlobalStyle';
import { AppStyled } from './App.styled';
import fetchImages from '../../services/images-api';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';

class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          this.setState({ status: 'pending' });
          if (hits.length === 0) {
            toast.error(`No results for search ${query}`);
            this.setState({ status: 'idle' });
          }

          this.setState(state => ({
            images: [...state.images, ...hits],
            imagesOnPage: state.imagesOnPage + hits.length,
            totalImages: totalHits,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      imagesOnPage: 0,
      totalImages: 0,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { query, images, imagesOnPage, totalImages, status } = this.state;

    const getSearchRequest = this.handleSearchbarSubmit;
    const onNextFetch = this.onLoadMore;

    return (
      <AppStyled>
        <Searchbar onSubmit={getSearchRequest} />
        {status === 'pending' && <Loader />}
        {status === 'rejected' &&
          toast.error(`Sum problems with search ${query}`)}
        {status === 'resolved' && <ImageGallery images={images} />}
        {imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch}>Load More</Button>
        )}
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </AppStyled>
    );
  }
}

export default App;
