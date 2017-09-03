import * as React from 'react';
import { SearchInputField } from "./search-input-field"
import { SearchResults } from "./search-results"

export class SearchCreate extends React.Component {
  state: any

  constructor(props) {
    super(props)
    this.state = {searchResults: []}
  }

  render() {
    return (
      <div>
        <SearchInputField onSearchResultsChange={results => this.updateSearchResults(results)} />
        <SearchResults searchResults={this.state.searchResults} />
      </div>
    )
  }

  updateSearchResults(results) {
    this.setState({searchResults: results})
  }

}