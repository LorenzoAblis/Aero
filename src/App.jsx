import "./App.scss";
import Current from "./components/Current.jsx";
import Hourly from "./components/Hourly.jsx";
import Weekly from "./components/Weekly.jsx";

function App() {
  return (
    <main>
      <Current />
      <Hourly />
      <Weekly />
    </main>
  );
}

export default App;
