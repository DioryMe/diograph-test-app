import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Diory, DioryGrid } from 'diory-react-components'
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

render()

document.getElementById("diograph-save-button").addEventListener('click', () => {
  render()
})

document.getElementById("logout").addEventListener('click', () => {
  clear()
})

function render() {
  DiographStore.setAuthToken(DiographAuthentication.token);

  try {
    DiographStore.getAll().then((dioryData) => {
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
          <h1>{ dioryData.name }</h1>
          <Diory { ...diory } />
        </div>,
        document.getElementById('app')
      );

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

