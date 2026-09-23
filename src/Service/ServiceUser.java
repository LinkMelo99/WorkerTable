package Service;

import Model.User;

import java.util.ArrayList;
import java.util.List;

public class ServiceUser {


    public User login(String email,String password){
        User user=repository.findEmaile(email);

        if(user==null){
            throw new IllegalArgumentException("Usuario nao encontrado");
        }
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new IllegalArgumentException("Senha inválida.");
        }
        return user;
    }

    public User createUser(User user){
        if(user==null){
            throw new IllegalArgumentException("E necessario se cadastrar.");
        }
        if(user.getFirtsName()==null && user.getPassword()==null && user.getFirtsName()==null){
            throw new IllegalArgumentException("Nome, email e senha são obrigatórios.");
        }
        return user;
    }

    public List<User> grupoDeTarefa(User user){
        List<User>grupoTarefa=new ArrayList<>();
        if(user==null){
            throw new IllegalArgumentException("Usuario nao encontrado");
        }
        if(grupoTarefa.contains(user)){
            throw new IllegalArgumentException("Usuario ja no grupo de trabalho");
        }
        grupoTarefa.add(user);
        return grupoTarefa;
    }
    public void deleteUserByName(String name){
        if(name.isBlank()){
            throw new IllegalArgumentException("Sem usuarios para deletar");
        }
        const repoUser

        )
    }

}
