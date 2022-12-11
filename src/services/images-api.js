import { toast } from 'react-toastify';
const URL = 'https://pixabay.com/api/';
const KEY = '30478815-551fa70579656887e760cc436';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(
        new Error(toast.error(`Sum problems with search ${query} !`))
      );
    }
  );
}

export default fetchImages;
