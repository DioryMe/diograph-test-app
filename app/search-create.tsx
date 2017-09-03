import * as React from 'react';
import { SearchInputField } from "./search-input-field"
import { SearchResults } from "./search-results"

export interface SearchCreateState { searchResults: any }
export interface SearchCreateProps { onFocusClick: any }

export class SearchCreate extends React.Component<SearchCreateProps, SearchCreateState> {

  constructor(props) {
    super(props)
    this.state = {searchResults: []}
  }

  render() {
    return (
      <div>
        <SearchInputField onSearchResultsChange={results => this.updateSearchResults(results)} />
        <SearchResults
          searchResults={this.state.searchResults}
          onFocusClick={dioryId => this.onFocusClick(dioryId)}/>
      </div>
    )
  }

  updateSearchResults(results) {
    this.setState({searchResults: results})
  }

  onFocusClick(dioryId) {
    this.setState({searchResults: []})
    this.props.onFocusClick(dioryId)
  }

}
