import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

const Loader = () => {
  const color = "#f29200";

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <GridLoader
        color={color}
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
