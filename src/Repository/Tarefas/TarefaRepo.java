package Repository.Tarefas;

import ConnectionFactory.ConnectionFactory;
import Model.Tarefa;

import javax.xml.transform.Result;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;


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

    public Tarefa createTarefa(Tarefa tarefa) throws SQLException {

        String sql="INSERT INTO TAREFAS (NOME,NOTES) VALUE(?,?)";

        try(Connection conn=ConnectionFactory.getConnection();
        PreparedStatement stmt= conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){

            stmt.setString(1, tarefa.getNome());
            stmt.setString(2, tarefa.getNotes());

            int i= stmt.executeUpdate();
            if (i == 0) {
                throw new SQLException("Falha ao criar a tarefa.");
            }
            try(ResultSet rs= stmt.getGeneratedKeys()){
                if(rs.next()){
                    Long idGerado=rs.getLong(1);
                    tarefa.setId(idGerado);

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

                    if(tarefasDoUsuario.isEmpty()){
                        System.out.println("Usuario ja completou suas tarefas");
                    }
                    return tarefasDoUsuario;
                }

            }
        }
    }
}
