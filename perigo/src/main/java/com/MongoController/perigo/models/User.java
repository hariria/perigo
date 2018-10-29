package com.MongoController.perigo.models;

import java.io.Serializable;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;

@Document(collection="User")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	public ObjectId _id;
	
	public String firstName;
	public String lastName;
	public String phoneNumber;
	public int zipCode;
	public String googleUserId;
	public int userRating;
	
	@JsonCreator
	public User(ObjectId _id, String firstName, String lastName, String phoneNumber, int zipCode, String googleUserId, 
			int userRating) {
		super();
		this._id = _id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.zipCode = zipCode;
		this.googleUserId = googleUserId;
		this.userRating = userRating;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

	public String getGoogleUserId() {
		return googleUserId;
	}

	public void setGoogleUserId(String googleUserId) {
		this.googleUserId = googleUserId;
	}

	public int getuserRating() {
		return userRating;
	}

	public void setuserRating(int userRating) {
		this.userRating = userRating;
	}
	
	

}
