package library.project.booker.services;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import library.project.booker.models.Book;
import library.project.booker.models.BookType;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Find books by title containing a keyword (case-insensitive)
    List<Book> findByTitleContainingIgnoreCase(String keyword);

    // Find books by BookType
    List<Book> findByBookType(BookType bookType);

 
    // Custom query for books by title containing a keyword
    @Query("SELECT b FROM Book b WHERE b.title LIKE %:title%")
    List<Book> findByTitleContaining(@Param("title") String title);

    // Custom query for books by BookType ID
    
    @Query("SELECT b FROM Book b WHERE b.bookType.id = :bookTypeId")
    List<Book> findByBookTypeId(@Param("bookTypeId") Long bookTypeId);


    
    @Query("SELECT b FROM Book b JOIN FETCH b.bookType")
    List<Book> findAllBooksWithBookType();
}


