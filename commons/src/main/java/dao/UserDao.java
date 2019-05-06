package dao;

import model.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Collection;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    User findByUsername(String username);

    Collection<User> findByUsernameStartsWith(String namePattern, PageRequest pageRequest);

    User findByPublicUserId(String publicUserId);

    boolean existsByUsername(String username);
}
