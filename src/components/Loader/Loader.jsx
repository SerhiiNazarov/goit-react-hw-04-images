import { Blocks } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Blocks
      visible={true}
      height="300"
      width="300"
      ariaLabel="blocks-loading"
      wrapperStyle={{
        marginLeft: '38%',
      }}
    />
  );
};

export default Loader;
