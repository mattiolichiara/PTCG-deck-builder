import ptcgLogo from './assets/tcg.png';
import ptcgpLogo from './assets/Pokemon_TCG_Pocket_logo.png';
import './App.css'

import {useState, useReducer} from "react";
import CardList from './components/CardList.jsx';
import CardSelector from "./components/CardSelector.jsx";

const initialState = {
    hasSelected: true,
    selected: "ptcg",
}

function reducer(state, action) {
    switch (action.type) {
        case "SELECT_PTCG":
            console.log("Selected PTCG state", state);
            return { hasSelected: true, selected: "ptcg" };
        case "SELECT_PTCGP":
            console.log("Selected PTCGP state", state);
            return { hasSelected: true, selected: "ptcgp" };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">

      <header className="App-header">
            <div className={`ptcg-title ${state.selected === "ptcg" ? "selected" : ""}`} onClick={() => dispatch({ type: "SELECT_PTCG" })}>
                <img src={ptcgLogo} className="ptcg-logo" alt="ptcg-logo"/>
            </div>
            <div className={`ptcgp-title ${state.selected === "ptcgp" ? "selected" : ""}`} onClick={() => dispatch({ type: "SELECT_PTCGP" })}>
                <img src={ptcgpLogo} className="ptcgp-logo" alt="ptcgp-logo"/>
            </div>

      </header>

      <div className="card-handler">
          <CardList selected={state.selected}/>
          <CardSelector selected={state.selected}/>
      </div>

    </div>
  )
}

export default App
