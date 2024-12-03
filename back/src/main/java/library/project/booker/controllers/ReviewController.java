package library.project.booker.controllers;


import library.project.booker.models.Book;
import library.project.booker.models.Review;
import library.project.booker.services.BookRepository;
import library.project.booker.services.ReviewRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookRepository bookRepository;

    // Create a new Review
    @PostMapping("/")
    public ResponseEntity<Review> createReview(@RequestBody Review review, @RequestParam Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        review.getBooks().add(book);
        book.getReviews().add(review); // Ensure the book also has the review
        Review savedReview = reviewRepository.save(review);
        bookRepository.save(book); // Save the book to update the join table
        return ResponseEntity.ok(savedReview);
    }

    // Read all Reviews
    @GetMapping("/")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return ResponseEntity.ok(reviews);
    }

    // Read a single Review by ID
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update a Review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        Review review = reviewRepository.findById(id).orElse(null);
        if (review != null) {
            review.setContent(reviewDetails.getContent());
            review.setRating(reviewDetails.getRating());
            reviewRepository.save(review);
            return ResponseEntity.ok(review);
        }
        return ResponseEntity.notFound().build();
    }


    
    // Read Reviews by Book ID
    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBookId(@PathVariable Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        List<Review> reviews = book.getReviews().stream().toList();
        return ResponseEntity.ok(reviews);
    }
    
 // Delete a Review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        for (Book book : review.getBooks()) {
            book.getReviews().remove(review);
        }
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}