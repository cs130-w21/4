import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Nav-bar">
          <span className="Nav-bar-title">Summer's Personal Network</span>
        </div>
        <div className="Contact-format">
          <span className="New-contact">Add New Contact</span>
        </div>
        <div className="Contact-list">
          <div className="Contact">
            <span className="Contact-name">Saum</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Gaby</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Erynn</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Kian</span>
          </div>
          <div className="Contact">
            <span className="Contact-name">Matt</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
