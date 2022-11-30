import React from "react";

export const RenderContext = React.createContext();

export function RenderContextProvider(props) {
  const { children, initial_value } = props;
  return (
    <RenderContext.Provider value={{ initial_value }}>
      {children}
    </RenderContext.Provider>
  )
};