import React from 'react'

const FctClientContext = React.createContext();

export const FctClientProvider = FctClientContext.Provider;
export const FctClientConsumer = FctClientContext.Consumer;

export default FctClientContext;