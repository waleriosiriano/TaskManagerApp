import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = () => {
    axios.get("http://localhost:8080/tarefas")
      .then(response => {
        setTarefas(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar tarefas:", error);
      });
  };

  const adicionarTarefa = (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo,
      descricao,
    };

    if (modoEdicao && tarefaEditando) {
      axios.put(`http://localhost:8080/tarefas/${tarefaEditando.id}`, novaTarefa)
        .then(() => {
          buscarTarefas();
          setTitulo("");
          setDescricao("");
          setModoEdicao(false);
          setTarefaEditando(null);
        })
        .catch(error => {
          console.error("Erro ao editar tarefa:", error);
        });
    } else {
      axios.post("http://localhost:8080/tarefas", novaTarefa)
        .then(response => {
          setTarefas([...tarefas, response.data]);
          setTitulo("");
          setDescricao("");
        })
        .catch(error => {
          console.error("Erro ao adicionar tarefa:", error);
        });
    }
  };

  const marcarComoConcluida = (id) => {
    axios.put(`http://localhost:8080/tarefas/${id}/concluir`)
      .then(() => {
        buscarTarefas();
      })
      .catch(error => {
        console.error("Erro ao marcar como concluída:", error);
      });
  };

  const iniciarEdicao = (tarefa) => {
    setModoEdicao(true);
    setTarefaEditando(tarefa);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
  };

  const removerTarefa = (id) => {
    console.log("Remover tarefa com id:", id); // Verifique o id
    axios.delete(`http://localhost:8080/tarefas/${id}`)
      .then(() => {
        buscarTarefas(); // Atualiza a lista após remoção
      })
      .catch(error => {
        console.error("Erro ao remover tarefa:", error);
      });
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">{modoEdicao ? "Salvar" : "Adicionar"}</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.titulo} - {tarefa.descricao} <strong>{tarefa.concluida ? "Concluída" : "Pendente"}</strong>
            {!tarefa.concluida && (
              <>
                <button onClick={() => marcarComoConcluida(tarefa.id)} style={{ marginLeft: '10px' }}>
                  Marcar como concluída
                </button>
                <button onClick={() => iniciarEdicao(tarefa)} style={{ marginLeft: '10px' }}>
                  Editar
                </button>
              </>
            )}
            <button onClick={() => removerTarefa(tarefa.id)} style={{ marginLeft: '10px', color: 'red' }}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
