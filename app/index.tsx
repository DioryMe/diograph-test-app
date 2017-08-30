import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Diory, DioryGrid } from 'diory-react-components'
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"
import * as $ from "jquery";
import * as Bloodhound from "corejs-typeahead/dist/bloodhound";
import "corejs-typeahead/dist/typeahead.jquery";

render()

DiographAuthentication.onLogin = () => {
  render()
}

DiographAuthentication.onLogout = () => {
  clear()
}

function render() {
  DiographStore.setAuthToken(DiographAuthentication.token);

  try {
    DiographStore.getAllDiories().then((dioryData) => {
      if (dioryData.length < 1) { return; }

      dioryData = dioryData[0]

      const diory = {
        text: dioryData.name,
        image: 'https://gravatar.com/avatar/ff80f8f9bc52f1b79e468a41f2239001',
        styles: {
          diory: { display: 'inline-block', width: '20em', height: '20em', backgroundColor: 'green', margin: '1em' },
          text: { fontSize: '2em', fontFamily: 'sans-serif', color: 'white', textAlign: 'center', textShadow: '1px 1px green' },
          image: { opacity: 0.6, filter: 'blur(5px)' }
        }
      }

      ReactDOM.render(
        <div>
          <SearchCreate />
          <h1>{ dioryData.name }</h1>
          <Diory { ...diory } />
        </div>,
        document.getElementById('app')
      );

      initializeTypeahead()

    })
  } catch(e) {
    console.log(e)
  }
}

function clear() {
  ReactDOM.render(
    <div><p>No diories to show.</p></div>,
    document.getElementById('app')
  );
}

const SearchCreate = () => {
  return <div id="search-create">
          <input id="typeahead" class="typeahead" type="text" placeholder="Search for diories..." />
          <div id='loading-icon'>
            <img src='loading.gif' />
          </div>
          <div id="search-create__cancel" class='search-create__cancel'>X</div>
        </div>
}

function initializeTypeahead() {
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

