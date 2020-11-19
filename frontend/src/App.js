import axios from "axios";

function App() {
  const getApiRequest = () => {
    console.log("get api")
    axios("/api/k").then(response => {
      console.log('response', response);
    });
  }

  return (
    <div>
      <h3>react</h3>
      <button onClick={getApiRequest}>get api</button>
    </div>
  );
}

export default App;
