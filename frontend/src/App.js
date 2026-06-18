import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <header className="App-header flex flex-col items-center gap-4">
        <img src={logo} className="App-logo h-40 pointer-events-none" alt="logo" />
        <h1 className="text-4xl font-extrabold text-sky-400 drop-shadow-md">
          Tailwind CSS v3 configured!
        </h1>
        <p className="text-slate-300">
          Edit <code className="bg-slate-800 px-2 py-1 rounded text-pink-400">src/App.js</code> and save to reload.
        </p>
        <a
          className="text-sky-400 hover:text-sky-300 underline transition"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
