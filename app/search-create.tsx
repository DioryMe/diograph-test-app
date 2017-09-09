import * as React from 'react';
import { SearchInputField } from "./search-input-field"
import { SearchResults } from "./search-results"

export interface SearchCreateState { searchResults: any, searchTerm: string }
export interface SearchCreateProps { onFocusClick: any }

export class SearchCreate extends React.Component<SearchCreateProps, SearchCreateState> {

  constructor(props) {
    super(props)
    this.state = {searchResults: [], searchTerm: "paikka"}
  }

  render() {
    return (
      <div>
        <SearchInputField
          searchTerm={this.state.searchTerm}
          onSearchTermChange={newTerm => this.setState({searchTerm: newTerm})}
          onSearchResultsChange={results => this.setState({searchResults: results})} />
        <SearchResults
          searchResults={this.state.searchResults}
          onFocusClick={dioryId => this.onFocusClick(dioryId)} />
      </div>
    )
  }

  onFocusClick(dioryId) {
    this.setState({searchResults: []})
    this.setState({searchTerm: ""})
    this.props.onFocusClick(dioryId)
  }

}
