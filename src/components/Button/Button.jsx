import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ onNextFetch, children }) => {
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
