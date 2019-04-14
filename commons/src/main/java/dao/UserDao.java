package dao;

import model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User findByPublicUserId(String publicUserId);

    boolean existsByUsername(String username);
}
