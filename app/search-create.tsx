import * as React from 'react';
import { SearchInputField } from "./search-input-field"
import { SearchResults } from "./search-results"

export class SearchCreate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <SearchInputField />
        <SearchResults searchResults={[1,2,3]} />
      </div>
    )
  }

}