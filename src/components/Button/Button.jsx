import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ onNextFetch, children }) => {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [onNextFetch]);

  return (
    <Btn type="button" onClick={onNextFetch}>
      {children}
    </Btn>
  );
};

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
