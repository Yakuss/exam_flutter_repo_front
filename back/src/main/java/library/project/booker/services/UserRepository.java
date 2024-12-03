package library.project.booker.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import library.project.booker.models.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
    // Custom query methods for User, if needed
}
 