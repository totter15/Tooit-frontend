import React from 'react';

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <div
      style={{
        maxWidth: 1520,
        margin: '0px auto',
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

export default Wrapper;
