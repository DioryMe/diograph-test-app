import * as React from "react"

export interface SearchResultsProps { searchResults: Array<any>, onFocusClick: any }

export class SearchResults extends React.Component<SearchResultsProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return this.renderSearchResults()
  }

  renderSearchResults() {
    let searchResultsJSX = this.props.searchResults.map((result) => {
      return (
        <div className="search-result__element"
          key={result.id}
          onClick={event => this.props.onFocusClick(result.id)}>
          <div className="search-result__title">
            {result.value}
          </div>
          <style>{searchResultsStyles}</style>
        </div>
      )
    })
    return <div>{searchResultsJSX}</div>
  }

}

let searchResultsStyles = `
  .search-result__element {
    display: table;
    table-layout: fixed;
    margin: 3px;
    width: 100%;
    height: auto;
    position: relative;
    border: 3px solid lightgray;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }

  .search-result__title {
    display: table-cell;
    text-align: center;
    padding: 10px 5px;
    width: 400px;
  }

  .search-result__action {
    display: table-cell;
    background-color: lightblue;
    width: 100px;
    height: auto;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
`
