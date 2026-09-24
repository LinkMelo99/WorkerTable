package Repository.Tarefas;

import ConnectionFactory.ConnectionFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class TarefaRepo {


    public int deleteTarefa(Long idUser, Long idTarefa) {
        String sql = "DELETE FROM TAREFA WHERE ID=? AND ID_USER=?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1,idUser);
            stmt.setLong(2,idTarefa);

            int deleteConfirmed= stmt.executeUpdate();
            if(deleteConfirmed>0){
                System.out.println("Confirmado.");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
