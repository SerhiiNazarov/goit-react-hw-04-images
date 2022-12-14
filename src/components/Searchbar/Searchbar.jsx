import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter data to search !');
      return;
    }

    onSubmit(query);
    setQuery('');
    event.target.reset();
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>
            <AiOutlineSearch size={30} />
          </ButtonLabel>
        </Button>

        <Input
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.proptype = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(Searchbar);
