import React from 'react';

function Wrapper({ children }: React.PropsWithChildren) {
  return <div style={{ width: 1520, margin: '0px auto' }}>{children}</div>;
}

export default Wrapper;
