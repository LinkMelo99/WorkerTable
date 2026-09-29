package Repository.TarefaUser;

import ConnectionFactory.ConnectionFactory;
import Model.Tarefa;
import Model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TarefaUserRepo {

    public List<User> findUsersByTarefa(Tarefa tarefa) throws SQLException {

        List<User>listaDeUsuariosDaTarefaEspecifica=new ArrayList<>();

        String sql = "SELECT U.ID, U.FIRST_NAME,U.LAST_NAME, U.EMAIL FROM USUARIOS U "
                + "JOIN TAREFA_USUARIO TU ON TU.ID_USUARIO = U.ID "
                + "WHERE TU.ID_TAREFA = ?";

        try(Connection conn= ConnectionFactory.getConnection();
            PreparedStatement stmt=conn.prepareStatement(sql)){

            stmt.setLong(1,tarefa.getId());

            try(ResultSet rs= stmt.executeQuery()){
                while(rs.next()){
                    Long id=rs.getLong("ID");
                    String FirstName=rs.getString("FIRST_NAME");
                    String LastName=rs.getString("LAST_NAME");
                    String email=rs.getString("email");

                    listaDeUsuariosDaTarefaEspecifica.add(User.builder()
                            .id(id).FirtsName(FirstName).Lastname(LastName).email(email).build());

                }
            }
            return listaDeUsuariosDaTarefaEspecifica;
        }
    }

    public void createGroupForTarefa(Tarefa tarefa,User user) throws SQLException {
        Objects.requireNonNull(tarefa,"Tarefa nao pode ser nula");
        Objects.requireNonNull(user,"Usuario nao pode ser nula");

        String sql="INSERT INTO TAREFA_USER (ID_USER,ID_TAREFA) VALUES(?,?)";

        try(Connection conn=ConnectionFactory.getConnection();
            PreparedStatement stmt=conn.prepareStatement(sql)){

            stmt.setLong(1,user.getId());
            stmt.setLong(2,tarefa.getId());

            if(stmt.executeUpdate()==0){
                System.out.println("Error: Nao foi criado o grupo");
            }
        }
    }
    public List<Tarefa> findTarefasByUsersId(Long id) throws SQLException {

        List<Tarefa>tarefasDoUsuario=new ArrayList<>();

        String sql="SELECT T.* FROM TAREFAS T JOIN TAREFA_USUARIO TU ON TU.ID = T.ID WHERE TU.ID_USUARIO=?";

        try(Connection conn=ConnectionFactory.getConnection();
            PreparedStatement stmt=conn.prepareStatement(sql)){

            stmt.setLong(1,id);
            try(ResultSet rs= stmt.executeQuery()){
                while(rs.next()){
                    String nome = rs.getString("NOME");
                    String notes=rs.getString("NOTES");
                    Boolean conc=rs.getBoolean("CONCLUIDO");
                    Date date=rs.getDate("DATA");

                    Tarefa tarefasDoUser=new Tarefa.builderTarefa()
                            .IdUser(id)
                            .nome(nome)
                            .notes(notes)
                            .build();

                    tarefasDoUsuario.add(tarefasDoUser);
                }

            }
        }
        return tarefasDoUsuario;
    }
}
