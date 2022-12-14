import { useState, useEffect, memo } from 'react';
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

export default memo(function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error(`No results for search ${query}`);
          setStatus('idle');
          return;
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotalImages(totalHits);
        setImagesOnPage(prevState => prevState + hits.length);
        setStatus('resolved');
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, [query, page]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  const handleSearchbarSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setImagesOnPage(0);
    setTotalImages(0);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' &&
        toast.error(`Sum problems with search ${query}`)}
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          {imagesOnPage < totalImages && (
            <Button onNextFetch={onLoadMore}>Load More</Button>
          )}
        </>
      )}

      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </AppStyled>
  );
});
