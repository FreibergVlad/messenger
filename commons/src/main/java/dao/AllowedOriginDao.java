package dao;

import model.Origin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllowedOriginDao extends JpaRepository<Origin, Long> {
}
