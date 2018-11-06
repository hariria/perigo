package com.MongoController.perigo.models;

import java.io.Serializable;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection="User")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	public ObjectId _id;
	
	public String username;
	public String hash;
	public String firstName;
	public String lastName;
	public String email;
	public String location;
	public String zipCode;
	public int userRating;
	public List<SavedItem> savedItems;
	

	public User() {

	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public int getUserRating() {
		return userRating;
	}

	public void setUserRating(int userRating) {
		this.userRating = userRating;
	}

	public List<SavedItem> getSavedItems() {
		return savedItems;
	}

	public void setSavedItems(List<SavedItem> savedItems) {
		this.savedItems = savedItems;
	}
	
	

	

}
