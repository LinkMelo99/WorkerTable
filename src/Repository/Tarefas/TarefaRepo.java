package Repository.Tarefas;

import ConnectionFactory.ConnectionFactory;
import Model.Tarefa;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


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
}
