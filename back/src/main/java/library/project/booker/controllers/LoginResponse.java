package library.project.booker.controllers;

public class LoginResponse {
	 private Long userId;
	 private String username;
	 
	    public LoginResponse(Long userId, String username) {
	        this.userId = userId;
	        this.username = username;
	    }
	    
	public Long getUserId() {
		return userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	    // Getters and setters
	
}
