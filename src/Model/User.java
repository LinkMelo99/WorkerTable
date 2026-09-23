package Model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;

@NonNull
@Getter
@EqualsAndHashCode
@Builder
public class User {

    private String FirtsName;
    private String Lastname;
    private Tarefa tarefa;
    private String email;
    private String password;

}
