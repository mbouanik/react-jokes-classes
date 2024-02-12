import React from "react";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. */

function App() {
  return (
    <div className="App">
      <JokeList numJokesToGet={5} />
    </div>
  );
}

export default App;
