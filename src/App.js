import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import Home from './components/containers/Home';
import Post from './components/containers/Post';

function App() {
  return (
    <main>
      <section>
      <Router>
        <div>
          <Switch>
            <Route path="/:subject/:id">
              <Post />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      </section>
    </main>

  );
}

export default App;
