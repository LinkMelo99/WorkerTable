package Repository.Tarefas;

import ConnectionFactory.ConnectionFactory;
import Model.Tarefa;
import Model.User;

import javax.xml.transform.Result;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class TarefaRepo {


    public int deleteTarefa(Long idUser, Long idTarefa) {
        String sql = "DELETE FROM TAREFA WHERE ID=? AND ID_USER=?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, idUser);
            stmt.setLong(2, idTarefa);

            int deleteConfirmed = stmt.executeUpdate();
            if (deleteConfirmed > 0) {
                System.out.println("Confirmado.");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean updateNomeTarefaById(Long id, String novoNome) {

        String sql = "UPDATE TAREFAS SET NOME=? WHERE ID=?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, novoNome);
            stmt.setLong(2, id);

            int linhasAlteradas = stmt.executeUpdate();

            return linhasAlteradas > 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Tarefa createTarefa(Tarefa tarefa, User user) throws SQLException {

        String sql="INSERT INTO TAREFAS (NOME,NOTES,USER_ID) VALUE(?,?,?)";

        try(Connection conn=ConnectionFactory.getConnection();
        PreparedStatement stmt= conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){

            stmt.setString(1, tarefa.getNome());
            stmt.setString(2, tarefa.getNotes());
            stmt.setLong(3,user.getId());

            int i= stmt.executeUpdate();
            if (i == 0) {
                throw new SQLException("Falha ao criar a tarefa.");
            }
            try(ResultSet rs= stmt.getGeneratedKeys()){
                if(rs.next()){
                    tarefa.setId(rs.getLong(1));
                    tarefa.setId(user.getId());

                    return tarefa;

                }
                throw new SQLException("ID não foi gerado.");
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

    public List<User> findUsersByTarefa(Tarefa tarefa) throws SQLException {

        List<User>listaDeUsuariosDaTarefaEspecifica=new ArrayList<>();

        String sql = "SELECT U.ID, U.FIRST_NAME,U.LAST_NAME, U.EMAIL FROM USUARIOS U "
                + "JOIN TAREFA_USUARIO TU ON TU.ID_USUARIO = U.ID "
                + "WHERE TU.ID_TAREFA = ?";

        try(Connection conn=ConnectionFactory.getConnection();
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
}
