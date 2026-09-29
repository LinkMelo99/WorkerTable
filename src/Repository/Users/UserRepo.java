package Repository.Users;

import ConnectionFactory.ConnectionFactory;
import Model.Tarefa;
import Model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public final class UserRepo {

    User user1 = User.builder().build();
    User user2 = User.builder().build();
    User user3 = User.builder().build();

    List<User> listuser = List.of(user1, user2, user3);


    public void insertUser(User user) {
        String sql = "INSERT INTO USER (EMAIL,PASSWORD,FIRSTNAME,LASTNAME,TAREFA) VALUES(?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getEmail());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getFirtsName());
            stmt.setString(4, user.getLastname());

            int i = stmt.executeUpdate();

            if (i > 0) {
                System.out.println("Usuario adicionado");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public User checkEmail(String email) {
        String sql = """
                SELECT ID, LOGIN, EMAIL, SENHA
                FROM USUARIO
                WHERE EMAIL = ?
                """;

        if (email.isBlank() || email.isEmpty()) {
            throw new IllegalArgumentException("Email incorreto");
        }

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = User.builder()
                            .email(rs.getString("EMAIL"))
                            .build();
                    return user;
                }
                return null;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public int inativeUser(User user) throws SQLException {

        String sql = """
                UPDATE USER
                SET ATIVO = FALSE
                WHERE ATIVO = TRUE AND ID = ?
                """;
        int rowsAffected = 0;

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, user.getId());

            rowsAffected = stmt.executeUpdate();
            if (rowsAffected == 0) {
                throw new IllegalArgumentException("Nao foi deletado");
            }
        }
        return rowsAffected;
    }

    public int deleteUser(User user) throws SQLException {
        String sql = """
                DELETE FROM USER WHERE ID=?
                """;
        int rowsAffected = 0;
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, user.getId());
            stmt.executeUpdate();

            if (rowsAffected == 0) {
                throw new IllegalArgumentException("Nao foi deletado");
            }
        }
        return rowsAffected;
    }

    public User findById(Long id) throws SQLException {
        String sql = """
                SELECT ID,FIRTS_NAME,LAST_NAME,EMAIL FROM USER WHERE ID=? AND ATIVO=TRUE;
                """;

        User user=null;


        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);


            try (ResultSet rs = stmt.executeQuery()) {

                if (rs.next()) {
                  Long UserId=  rs.getLong("ID");
                  String FirtsName= rs.getString("FIRTS_NAME");
                  String LastName=  rs.getString("LAST_NAME");
                  String email= rs.getString("EMAIL");

                    user = new User.UserBuilder()
                            .id(UserId)
                            .FirtsName(FirtsName)
                            .Lastname(LastName)
                            .email(email)
                            .build();
                }
            }
        }
        return user;
    }
}
