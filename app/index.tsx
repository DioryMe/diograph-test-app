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

    this.state = {diory: {text: "No diories to show."}, diories: {}}

    this.loadDiories()

    this.putInFocus = this.putInFocus.bind(this);
  }

  loadDiories() {
    DiographStore.getAllDiories().then((diories) => {
      if (diories.length < 1) { return; }

      const gridDiory = this.convertDioryToGridDiory(diories[0])

      const gridDiories = {
        text: 'This is a grid:',
        image: 'https://gravatar.com/avatar/ff80f8f9bc52f1b79e468a41f2239001',
        styles: {
          text: { fontSize: '2em', fontFamily: 'sans-serif', color: 'white' }
        },
        diorys: this.convertDioriesToGridDiories(diories)
      }

      this.setState({diory: gridDiory})
      this.setState({diories: gridDiories})
    })
  }

  render() {
    let diory = this.state.diory
    let diories = this.state.diories
    return (
      <div>
        <SearchCreate onFocusClick={this.putInFocus}/>
        <h1>{diory.text}</h1>
        <Diory { ...diory } />
        <DioryGrid { ...diories } />
      </div>
    )
  }

  putInFocus(dioryId) {
    DiographStore.getDiory(dioryId).then(diory => {
      this.setState({diory: this.convertDioryToGridDiory(diory)})
    })

  }

  convertDioryToGridDiory(diory) {
    return {
      text: diory.name,
      image: 'https://gravatar.com/avatar/ff80f8f9bc52f1b79e468a41f2239001',
      styles: {
        diory: { display: 'inline-block', width: '20em', height: '20em', backgroundColor: 'green', margin: '1em' },
        text: { fontSize: '2em', fontFamily: 'sans-serif', color: 'white', textAlign: 'center', textShadow: '1px 1px green' },
        image: { opacity: 0.6, filter: 'blur(5px)' }
      }
    }
  }

  convertDioriesToGridDiories(diories) {
    let gridDiories = {}
    diories.forEach(diory => {
      gridDiories[parseInt(diory.id)] = this.convertDioryToGridDiory(diory)
    })
    return gridDiories
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
    <div><p>Please authenticate.</p></div>,
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
