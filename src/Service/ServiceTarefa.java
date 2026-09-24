package Service;

import Model.Tarefa;
import Model.User;
import Repository.Tarefas.TarefaRepo;

import java.util.List;

public class ServiceTarefa {

    private final TarefaRepo repository;

    public ServiceTarefa(TarefaRepo repository) {
        this.repository = repository;
    }

    public Tarefa createTarefa(String nome, String notes) {
        Tarefa novaTarefa = new Tarefa.builderTarefa(nome, notes).build();
        "Tarefa criada: %s".formatted(novaTarefa);
        return novaTarefa;
    }

    public void deleteTarefa(User user, Tarefa tarefa) {
        if (user == null || tarefa == null) {
            throw new IllegalArgumentException("User e tarefa nao podem ser null");
        }
        int i = repository.deleteTarefa(user.getId(), tarefa.getId());

        if (i > 0) {
            System.out.println("Deletado.");
        }
    }

    public void modificarTarefa(Long id, String novoNome, Tarefa tarefa) {

        if (tarefa == null) {
            throw new IllegalArgumentException("Tarefa não encontrada.");
        }

        if (id == null) {
            throw new IllegalArgumentException("ID inválido.");
        }
        TarefaRepo

        if (!id.equals(tarefa.getId())) {
            throw new IllegalArgumentException("O ID da tarefa não corresponde.");
        }

        if (novoNome == null || novoNome.isBlank()) {
            throw new IllegalArgumentException("O nome da tarefa não pode ser vazio.");
        }
        tarefa.setNome(novoNome);
    }


}
