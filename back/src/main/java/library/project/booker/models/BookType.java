package library.project.booker.models;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
	@Table(name = "book_types")
	public class BookType {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String name;

	    @Column(length = 1000)
	    private String description;

	    @OneToMany(mappedBy = "bookType")
	    //@JsonManagedReference("booktype-books")
	    @JsonIgnore
	    private Set<Book> books;

	 // Getters
	    public Long getId() {
	        return id;
	    }

	    public String getName() {
	        return name;
	    }

	    public String getDescription() {
	        return description;
	    }

	    public Set<Book> getBooks() {
	        return books;
	    }

	    // Setters
	    public void setId(Long id) {
	        this.id = id;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }

	    public void setDescription(String description) {
	        this.description = description;
	    }

	    public void setBooks(Set<Book> books) {
	        this.books = books;
	    }
	}



