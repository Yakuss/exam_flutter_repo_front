package library.project.booker.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import library.project.booker.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
