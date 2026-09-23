package Service;

import Model.Tarefa;
import Model.User;

import java.util.List;

public class ServiceTarefa {

    public Tarefa createTarefa(String nome,String notes) {
        Tarefa novaTarefa= new Tarefa.builderTarefa(nome,notes).build();
        "Tarefa criada: %s".formatted(novaTarefa);
        return novaTarefa;
    }

    public void deleteTarefa(User user, String tarefa) {
        if (user.getTarefa().isEmpty()) {
            throw new IllegalArgumentException("Nao a tarefas a serem removidas.");
        } else {
            user.getTarefa().remove(tarefa);
        }
    }

    public void modificarTarefa(User user, String tarefa,String novoNome) {
        List<Tarefa> t1=user.getTarefa();
        t1.stream()
                .filter(f->f.getNome().equals(tarefa))
                .findFirst()
                .ifPresent(f->f.alterarNome(novoNome));
    }


}
