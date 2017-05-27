import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Diory, DioryGrid } from 'diory-react-components'
import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

// DiographStore.setAuthToken("test-token")
DiographStore.setAuthToken(DiographAuthentication.token);

try {
  DiographStore.get("5691").then((diory) => {
    ReactDOM.render(
      <h1>{ diory.name }</h1>,
      document.getElementById('app')
    );
  })
} catch(e) {
  console.log(e)
}
