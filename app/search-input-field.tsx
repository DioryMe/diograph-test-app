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
    var searchResults = new Bloodhound({
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

    $('#search-create #typeahead').typeahead({
        hint: false,
        minLength: 3
      }, {
        display: 'value',
        source: searchResults,
        templates: {
          suggestion: function(value) {
            that.searchResults.push(value.value)
            that.props.onSearchResultsChange(that.searchResults)
            return "<span></span>"
          },
          empty: function() {
            that.props.onSearchResultsChange(["No results"])
            return "<span></span>"
          }
        }
    });

    // X click
    $('#search-create__cancel').click(() => {
      $('#typeahead').typeahead('val', '');
    })

    // Loading starts
    $('#search-create').bind('typeahead:asyncrequest', function() {
      $('#loading-icon').css('display', 'block');
    });

    // Loading ends
    $('#search-create').bind('typeahead:asyncreceive', function() {
      $('#loading-icon').hide();
    });

    // Loadinc cancelled (esc)
    $('#search-create').bind('typeahead:asynccancel', function() {
      $('#loading-icon').hide();
    });
  }

}