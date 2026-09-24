package Service;

import Model.Tarefa;
import Model.User;
import Repository.Tarefas.TarefaRepo;

import java.util.List;

public class ServiceTarefa {

    private final TarefaRepo repository;

    public ServiceTarefa(TarefaRepo repository) {this.repository = repository;}

    public Tarefa createTarefa(String nome,String notes) {
        Tarefa novaTarefa= new Tarefa.builderTarefa(nome,notes).build();
        "Tarefa criada: %s".formatted(novaTarefa);
        return novaTarefa;
    }

    public void deleteTarefa(User user, Tarefa tarefa) {
        if (user==null || tarefa==null) {
            throw new IllegalArgumentException("User e tarefa nao podem ser null");
        }
        int i=repository.deleteTarefa(user.getId(),tarefa.getId());

        if(i>0){
            System.out.println("Deletado.");
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
