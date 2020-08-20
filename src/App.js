import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repo, setRepo] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Teste'
    });
    setRepo([...repo, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const index = repo.findIndex(repoId => repoId.id === id);    
    const removed  = repo.splice(index, 1);
    setRepo(repo.filter(item => {return item.id !== removed[0].id}));
    
  }

  useEffect(() => {
    const retrieveRepos = async () => {
      const response = await api.get('/repositories');
      setRepo(response.data);
    }
    retrieveRepos();
  },[])

  return (
    <div>
      <ul  data-testid="repository-list">
      {
        repo ? (          
             repo.map( item =>  
                              
                <li key={item.id}>
                  {item.title}
                  <button onClick={() => handleRemoveRepository(item.id)}>Remover</button> 
                </li> 
              )
          
        ) : null
      }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
