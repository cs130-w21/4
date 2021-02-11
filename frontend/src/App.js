import './App.css';

// user-defined components
import ContactList from './contact-list'
import NavBar from './navigation-bar'
import FilterBar from './filter-bar'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <FilterBar />
        <ContactList />
      </header>
    </div>
  );
}

export default App;
