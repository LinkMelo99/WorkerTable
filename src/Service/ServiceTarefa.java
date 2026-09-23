package Service;

import Model.Tarefa;

public class ServiceTarefa {

    public Tarefa createTarefa(Tarefa tarefa){
        if(tarefa==null){
            throw new IllegalArgumentException("E necessario criar uma tarefa");
        }
        if(tarefa.getNome()==null && tarefa.getNotes()==null){
            throw new IllegalArgumentException("E necessario um nome e os detalhes da tarefa");
        }
        return tarefa;
    }


}
