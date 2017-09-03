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
	    	<div className="search-result diory-element__element"
	    		onClick={event => this.props.onFocusClick(result)}>
		      <div className="diory-element__title">
		        {result}
		      </div>
		    </div>
		  )
		})
		return <div>{searchResultsJSX}</div>
	}

}

