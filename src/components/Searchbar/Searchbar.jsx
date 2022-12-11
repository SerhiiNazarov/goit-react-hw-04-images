import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { query } = this.state;

    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter data to search !');
      return;
    }

    onSubmit(query);
    this.setState({ query: '' });
    event.target.reset();
  };

  render() {
    const { query } = this.state;

    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
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
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
