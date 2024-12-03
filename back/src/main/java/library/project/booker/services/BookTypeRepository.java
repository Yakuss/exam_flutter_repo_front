package library.project.booker.services;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import library.project.booker.models.BookType;


@Repository
public interface BookTypeRepository extends JpaRepository<BookType, Long> {
    // Custom query methods for BookType, if needed
	BookType findByName(String name);
}
