package ConnectionFactory;

import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private static final String URL = "jdbc:mysql://localhost:3306/meu_banco";
    private static final String USER = "root";
    private static final String PASSWORD = "1234";

    public static java.sql.Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao conectar ao banco.", e);
        }
    }
}