import { useEffect, useState } from 'react';
import { buscarTarefas } from '../services/tarefaService';

function Home() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const dados = await buscarTarefas();
        console.log("tarefas recebidas", dados);
        setTarefas(dados);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    carregarTarefas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Tarefas</h1>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <strong>{tarefa.titulo}</strong> - {tarefa.descricao} <br />
              <em>{tarefa.concluida ? 'Concluída' : 'Pendente'}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
