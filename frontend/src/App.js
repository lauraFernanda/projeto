import React, { Component } from 'react';

//importa o arquivo das rotas
import Routes from './routes'

// Classe App importa as rotas que são exportadas para o arquivo index, que renderiza no HTML.
class App extends Component {
  render() {
    return <Routes />
  }
}

export default App;