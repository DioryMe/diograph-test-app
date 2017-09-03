import * as React from "react"

export interface SearchResultsProps { searchResults: Array<any> }

export class SearchResults extends React.Component<SearchResultsProps, undefined> {
	searchResults
	
	constructor(props) {
		super(props)
		this.searchResults = props.searchResults
		console.log(this.searchResults)
	}

	render() {
		return (
	    <div className="search-result diory-element__element">
	      <div className="diory-element__title">
	        {this.searchResults.length}
	      </div>
	    </div>
    )
	}

}

