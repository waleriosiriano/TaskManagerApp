package com.taskmanager.repository;

import com.taskmanager.model.Tarefa;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TarefaRepository extends MongoRepository<Tarefa, String> {
    // Aqui você pode adicionar consultas customizadas mais tarde, se necessário
}
