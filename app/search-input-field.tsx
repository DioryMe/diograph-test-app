import * as React from 'react';
import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

export class SearchInputField extends React.Component {
  constructor(props) {
    super(props)
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
            return `
              <div class="search-result diory-element__element">
                  <div class="diory-element__title">
                    ${value.value}
                  </div>
              </div>`
          },
          empty: function() {
            return `<div class="search-result diory-element__element">
                      <div class="diory-element__title">No results.</div>
                    </div>`
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