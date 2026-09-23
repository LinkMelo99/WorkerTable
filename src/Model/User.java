package Model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;

import java.util.List;

@NonNull
@Getter
@EqualsAndHashCode
@Builder
public class User {

    private String FirtsName;
    private String Lastname;
    private List<Tarefa> tarefa;
    private String email;
    private String password;

}


