package org.example.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionFactory {

    private static final String URL =
            "jdbc:mysql://localhost:3306/tarefa_db";

    private static final String USER = "root";

    private static final String PASSWORD = "Matheus.melo58";

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            return DriverManager.getConnection(
                    URL,
                    USER,
                    PASSWORD
            );

        } catch (SQLException | ClassNotFoundException e) {
            throw new RuntimeException("Erro ao conectar ao banco.", e);
        }
    }
}