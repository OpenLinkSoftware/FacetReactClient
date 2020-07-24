/**
 * @module FctUiCommon 
 * 
 * @description
 * Exports functions which return JSX snippets shared by components.
 * @see FctUiUtil for utility methods which don't return JSX.
 */

import React from 'react';

/**
 * Returns a JSX snippet containing the message to display when
 * the search resultset is empty.
 */
export function emptyResultSetMessage() {
  return (
  <div>
      <p>
        This query did not produce any results.<br/>
        Try dropping some of the conditions, to make the query less specific.
      </p>
  </div>
  );
}
