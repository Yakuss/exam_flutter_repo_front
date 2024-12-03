package library.project.booker.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import library.project.booker.models.Book;
import library.project.booker.models.BookType;
import library.project.booker.services.BookRepository;
import library.project.booker.services.BookTypeRepository;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/book")
public class BookController {

    private final BookRepository bookRepository;
    private final BookTypeRepository bookTypeRepository;

    public BookController(BookRepository bookRepository, BookTypeRepository bookTypeRepository) {
        this.bookRepository = bookRepository;
        this.bookTypeRepository = bookTypeRepository;
    }

    

    
    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    


    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublicationDate(bookDetails.getPublicationDate());
            book.setPdfUrl(bookDetails.getPdfUrl());
            book.setFavorite(bookDetails.isFavorite());
            book.setImageUrl(bookDetails.getImageUrl());

            // Handle bookType
            BookType bookType = bookTypeRepository.findById(bookDetails.getBookType().getId())
                    .orElseThrow(() -> new RuntimeException("BookType not found"));
            book.setBookType(bookType);

            bookRepository.save(book);
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

   /* @PostMapping("/books")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }*/
    
    @PostMapping("/books")
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        try {
            BookType bookType = bookTypeRepository.findById(book.getBookType().getId())
                    .orElseThrow(() -> new RuntimeException("BookType not found"));
            book.setBookType(bookType);
            Book savedBook = bookRepository.save(book);
            return ResponseEntity.ok(savedBook);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding book: " + e.getMessage());
        }
    }

    
    @GetMapping("/books/{id}/view")
    public ResponseEntity<String> viewPdf(@PathVariable Long id) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            return ResponseEntity.ok(book.getPdfUrl());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/books/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam String keyword) {
        List<Book> books = bookRepository.findByTitleContainingIgnoreCase(keyword);
        return ResponseEntity.ok(books);
    }
    

    
   
    
    @GetMapping("/books/searchByType")
    public ResponseEntity<List<Book>> getBooksByType(@RequestParam("bookTypeId") Long bookTypeId) {
        List<Book> books = bookRepository.findByBookTypeId(bookTypeId);
        return ResponseEntity.ok(books);
    }



}
