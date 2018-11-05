package com.MongoController.perigo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.SavedItem;
import com.MongoController.perigo.models.User;
import com.MongoController.perigo.models.UserTransferObject;
import com.MongoController.perigo.repositories.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserRepository repository;
	
	@RequestMapping(value="/username/{username}", method=RequestMethod.GET)
	public User getUserBygoogleUserId(@PathVariable("username") String username) {
		return repository.findByUsername(username);
	}
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public List<User> getAllUsers() {
		return repository.findAll();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public User getUserById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public void modifyUserById(@PathVariable("id") ObjectId id, @Valid @RequestBody User user) {
		user.set_id(id);
		repository.save(user);
	}
	
	@RequestMapping(value="/addsaveditem/{id}", method=RequestMethod.PUT)
	public void modifySavedItems(@PathVariable("id") ObjectId id, @Valid @RequestBody SavedItem savedItem) {
		User update = repository.findBy_id(id);
		update.getSavedItems().add(savedItem);
		repository.save(update);
	}
	
	@RequestMapping(value="/removesaveditem/{id}", method=RequestMethod.PUT)
	public void removeSavedItem(@PathVariable("id") ObjectId id, @Valid @RequestBody SavedItem savedItem) {
		User update = repository.findBy_id(id);
		update.getSavedItems().removeIf(si -> si.getItemId().equals(savedItem.getItemId()));
		repository.save(update);
	}
	
	private boolean checkEmail(String email) {
		return email.toLowerCase().contains("@usc.edu");
	}
	
	private boolean checkZipCode(String zipCode) {
	    if (zipCode.length() != 5) return false;
		
		try {
	        Integer.parseInt(zipCode);
	    } catch (NumberFormatException | NullPointerException nfe) {
	        return false;
	    }
	    
	    return true;		
	}
	
	@RequestMapping(value="/", method=RequestMethod.POST)
	public ResponseEntity<?> createUser(@Valid @RequestBody UserTransferObject userToTransfer) {

		User usernameCheck = repository.findByUsername(userToTransfer.getUsername());
		User emailCheck = repository.findByEmail(userToTransfer.getEmail());
		
		if (usernameCheck != null) return new ResponseEntity<>("USERNAME EXISTS ALREADY", HttpStatus.BAD_REQUEST);
		else if (emailCheck != null) return new ResponseEntity<>("EMAIL ALREADY REGISTERED", HttpStatus.BAD_REQUEST);
		else if (!checkEmail(userToTransfer.getEmail())) return new ResponseEntity<>("MUST USE USC EMAIL", HttpStatus.BAD_REQUEST);
		else if (!checkZipCode(userToTransfer.getZipCode())) return new ResponseEntity<>("INVALID ZIP CODE", HttpStatus.BAD_REQUEST);

		User userToAdd = new User();
		userToAdd.set_id(ObjectId.get());
		userToAdd.setEmail(userToTransfer.getEmail());
		userToAdd.setFirstName(userToTransfer.getFirstName());
		userToAdd.setLastName(userToTransfer.getLastName());
		userToAdd.setLocation(userToTransfer.getLocation());
		userToAdd.setZipCode(userToTransfer.getUsername());
		userToAdd.setUserRating(5);
		userToAdd.setSavedItems(new ArrayList<SavedItem>());
		userToAdd.setUsername(userToTransfer.getUsername());
		userToAdd.setHash(userToTransfer.getPassword().hashCode());
		
		repository.save(userToAdd);
		
		System.out.println("Adding to Database");
		return new ResponseEntity<>(userToAdd.get_id().toHexString(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteUser(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}
