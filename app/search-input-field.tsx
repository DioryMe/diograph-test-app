import * as React from 'react';
import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

export interface SearchInputFieldProps { onSearchResultsChange: any }

export class SearchInputField extends React.Component<SearchInputFieldProps, {term: any}> {
  bloodHound

  constructor(props) {
    super(props)
    this.bloodHound = this.initializeBloodhound()
    this.state = {term: "paikka"}
    this.onInputChange(this.state.term)
  }

  render() {
    return (
      <div className="search-input-field">
        <style>{searchInputFieldStyles}</style>
        <input className="search-input-field__input"
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
          placeholder="Search for diories..." />
        <div className='search-input-field__loading-icon'>
          <img src='loading.gif' />
        </div>
        <div className='search-input-field__cancel' onClick={ () => { this.onInputChange("") }}>X</div>
      </div>
    )
  }

  initializeBloodhound() {
    return new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'http://diory-server.herokuapp.com/v1/search',
        prepare: function(query, settings) {
          settings.url = settings.url + '?q=' + query,
          settings.headers = {
            "Authorization": "test-token"
          };
          return settings;
        }
      }
    });
  }

  onInputChange(term) {
    let that = this;
    this.setState({term: term})
    if (term.length >= 3) {
      this.bloodHound.search(term, () => {}, datums => {
        let values
        if (datums.length > 0) {
          values = datums
        } else {
          values = [{value: "No results."}]
        }
        that.props.onSearchResultsChange(values)
      });
    } else {
      that.props.onSearchResultsChange([])
    }

  }

}

let searchInputFieldStyles = `
    .search-input-field {
      position: relative;
    }

    .search-input-field__loading-icon {
      position: absolute;
      display: none;
      top: 14px;
      right: 60px;
    }

    .search-input-field__input {
      line-height: 48px;
      font-size: 36px;
      width: 100%;
    }

    .search-input-field__cancel {
      position: absolute;
      top: 6px;
      right: 16px;
      color: gray;
      font-size: 36px;
      cursor: pointer;
      font-family: Helvetica, sans-serif;
    }
`
