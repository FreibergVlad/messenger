package dao;

import model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserDao extends PagingAndSortingRepository<User, Long> {

    String USER_SEARCH_QUERY = "select u from User u where u.username like concat(:namePattern,'%')";

    User findByUsername(String username);

    @Query(USER_SEARCH_QUERY)
    List<User> findUserByNamePattern(String namePattern, Pageable pageRequest);

    User findByPublicUserId(String publicUserId);

    boolean existsByUsername(String username);
}
