import ptcgLogo from './assets/tcg.png';
import ptcgpLogo from './assets/Pokemon_TCG_Pocket_logo.png';
import './App.css'

import CardList from './components/CardList.jsx';
import CardSelector from "./components/CardSelector.jsx";

function App() {

  return (
    <div className="App">

      <header className="App-header">
            <div className="ptcg-title">
                <img src={ptcgLogo} className="ptcg-logo" alt="ptcg-logo"/>
            </div>
            <div className="ptcgp-title">
                <img src={ptcgpLogo} className="ptcgp-logo" alt="ptcgp-logo"/>
            </div>

      </header>

      <div className="card-handler">
          <CardList />
          <CardSelector />
      </div>

    </div>
  )
}

export default App
