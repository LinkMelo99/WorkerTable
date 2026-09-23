package Repository.Users;

import Connection.ConnectionFactory;
import Model.Tarefa;
import Model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class UserRepo {

    User user1 = User.builder().build();
    User user2 = User.builder().build();
    User user3 = User.builder().build();

    List<User> listuser = List.of(user1, user2, user3);


    private void insertUser(User user) {
        String sql = "INSERT INTO USER (EMAIL,PASSWORD,FIRSTNAME,LASTNAME,TAREFA) VALUES(?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1,user.getEmail());
            stmt.setString(2,user.getPassword());
            stmt.setString(3,user.getFirtsName());
            stmt.setString(4,user.getLastname());

            int i=stmt.executeUpdate();

            if(i>0){
                System.out.println("Usuario adicionado");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private void insetTarefaUser(Tarefa tarefa,User user){
        String sql = "INSERT INTO USER (EMAIL,PASSWORD,FIRSTNAME,LASTNAME,TAREFA) VALUES(?,?,?,?,?)";
    }

}
