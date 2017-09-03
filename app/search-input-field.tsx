import * as React from 'react';
import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

export interface SearchInputFieldProps { onSearchResultsChange: any }

export class SearchInputField extends React.Component<SearchInputFieldProps, undefined> {
  searchResults
  constructor(props) {
    super(props)
    this.searchResults = []
  }

  componentDidMount() {
    this.initializeTypeahead()
  }

  render() {
    return (
      <div id="search-create">
        <input id="typeahead" className="typeahead" type="text" placeholder="Search for diories..." />
        <div id='loading-icon'>
          <img src='loading.gif' />
        </div>
        <div id="search-create__cancel" className='search-create__cancel'>X</div>
      </div>
    )
  }

  initializeTypeahead() {
    let that = this;
    var bloodhound = new Bloodhound({
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
    
    bloodhound.search("paikka", sync, async);

    function sync(datums) {
      console.log('datums from `local`, `prefetch`, and `#add`');
      console.log(datums);
    }

    function async(datums) {
      let values = datums.map(d => d.value)
      console.log(values)
      that.props.onSearchResultsChange(values)
    }
  }

}