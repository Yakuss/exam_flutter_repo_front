package library.project.booker.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import library.project.booker.models.BookType;
import library.project.booker.services.BookTypeRepository;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/bookTypes")
public class BookTypeController {

    @Autowired
    private BookTypeRepository bookTypeRepository;

    
    ////id and name
    
    
    // Create a new BookType
    @PostMapping("/")
    public BookType createBookType(@RequestBody BookType bookType) {
        return bookTypeRepository.save(bookType);
    }

    // Read all BookTypes
    @GetMapping("/Types")
    public List<BookType> getAllBookTypes() {
        return bookTypeRepository.findAll();
    }
    
   

    /*
    @GetMapping("/{id}")
    public BookType getBookTypeById(@PathVariable Long id) {
        return bookTypeRepository.findById(id).orElse(null);
    }*/

    // Update a BookType
    @PutMapping("/{id}")
    public BookType updateBookType(@PathVariable Long id, @RequestBody BookType bookTypeDetails) {
        BookType bookType = bookTypeRepository.findById(id).orElse(null);
        if (bookType != null) {
            bookType.setName(bookTypeDetails.getName());
            bookType.setDescription(bookTypeDetails.getDescription());
            bookTypeRepository.save(bookType);
        }
        return bookType;
    }

    // Delete a BookType
    @DeleteMapping("/{id}")
    public void deleteBookType(@PathVariable Long id) {
        bookTypeRepository.deleteById(id);
    }
    
 // Read a single BookType by ID
    @GetMapping("/Types/{id}")
    public ResponseEntity<BookType> getBookTypeById(@PathVariable Long id) {
        BookType bookType = bookTypeRepository.findById(id).orElse(null);
        if (bookType != null) {
            return ResponseEntity.ok(bookType);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
