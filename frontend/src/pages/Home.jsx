import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Grid,
  Card,
  Typography,
  Box,
} from "@mui/material";
import '../App.css';

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
    axios
      .get("http://localhost:8080/tarefas")
      .then((response) => {
        setTarefas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  };

  const adicionarTarefa = (e) => {
    e.preventDefault();
    const novaTarefa = { titulo, descricao };

    if (modoEdicao && tarefaEditando) {
      axios
        .put(`http://localhost:8080/tarefas/${tarefaEditando.id}`, novaTarefa)
        .then(() => {
          buscarTarefas();
          setTitulo("");
          setDescricao("");
          setModoEdicao(false);
          setTarefaEditando(null);
        })
        .catch((error) => {
          console.error("Erro ao editar tarefa:", error);
        });
    } else {
      axios
        .post("http://localhost:8080/tarefas", novaTarefa)
        .then((response) => {
          setTarefas([...tarefas, response.data]);
          setTitulo("");
          setDescricao("");
        })
        .catch((error) => {
          console.error("Erro ao adicionar tarefa:", error);
        });
    }
  };

  const marcarComoConcluida = (id) => {
    axios
      .put(`http://localhost:8080/tarefas/${id}/concluir`)
      .then(() => {
        buscarTarefas();
      })
      .catch((error) => {
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
    axios
      .delete(`http://localhost:8080/tarefas/${id}`)
      .then(() => {
        buscarTarefas();
      })
      .catch((error) => {
        console.error("Erro ao remover tarefa:", error);
      });
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight={500}>
        Lista de Tarefas
      </Typography>

      <Box
        component="form"
        onSubmit={adicionarTarefa}
        sx={{
          backgroundColor: "#ffffffcc",
          padding: 3,
          borderRadius: 6,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          marginBottom: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Título"
              variant="outlined"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Descrição"
              variant="outlined"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                borderRadius: "999px",
                paddingY: 1.2,
                fontWeight: 600,
              }}
            >
              {modoEdicao ? "Editar Tarefa" : "Adicionar Tarefa"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {tarefas.map((tarefa) => (
          <Grid key={tarefa.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                padding: 2,
                borderRadius: 5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                backgroundColor: "#fff",
                minHeight: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6">{tarefa.titulo}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {tarefa.descricao}
                </Typography>
                <Typography
                  variant="caption"
                  color={tarefa.concluida ? "green" : "text.secondary"}
                >
                  {tarefa.concluida ? "✅ Concluída" : "⌛ Pendente"}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => marcarComoConcluida(tarefa.id)}
                  sx={{ mr: 1, borderRadius: "999px" }}
                >
                  Concluir
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => iniciarEdicao(tarefa)}
                  sx={{ mr: 1, borderRadius: "999px" }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => removerTarefa(tarefa.id)}
                  sx={{ borderRadius: "999px" }}
                >
                  Remover
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
