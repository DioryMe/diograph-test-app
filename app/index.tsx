import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Diory, DioryGrid } from 'diory-react-components'
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"
import { SearchCreate } from "./search-create"

class App extends React.Component {
  state

  constructor(props) {
    super(props)

    DiographStore.setAuthToken(DiographAuthentication.token);

    this.state = {diory: {text: "COOOL"}, diories: {}}

    this.loadDiories()
  }

  loadDiories() {
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
      this.setState({diory: diory})
      this.setState({diories: {
        1: diory,
        2: diory
      }})
    })
  }

  render() {
    let diory = this.state.diory
    let diories = this.state.diories
    return (
      <div>
        <SearchCreate />
        <h1>{diory.text}</h1>
        <Diory { ...diory } />
        <DioryGrid { ...diories } />
      </div>
    )
  }

}

DiographAuthentication.onLogin = () => {
  render()
}

DiographAuthentication.onLogout = () => {
  clear()
}

function clear() {
  ReactDOM.render(
    <div><p>No diories to show.</p></div>,
    document.getElementById('app')
  );
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
}

render()