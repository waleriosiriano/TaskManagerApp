import axios from 'axios';

const API_URL = 'http://localhost:8080/tarefas';

export const buscarTarefas = async () => {
    const resposta = await axios.get(API_URL);
    return resposta.data;
};

export const adicionarTarefa = async (tarefa) => {
    const resposta = await axios.post(API_URL, tarefa);
    return resposta.data;
};

export const atualizarTarefa = async (id, tarefa) => {
    const resposta = await axios.put(`${API_URL}/${id}`, tarefa);
    return resposta.data;
};

export const deletarTarefa = async (id) => {
    const resposta = await axios.delete(`${API_URL}/${id}`);
    return resposta.data;
};
