import './App.css';
import { FileTable } from './components';
import { FILES } from './constants';

function App() {
  return (
    <div className="app-container" aria-label="File management application">
      <FileTable files={FILES} />
    </div>
  );
}

export default App;
