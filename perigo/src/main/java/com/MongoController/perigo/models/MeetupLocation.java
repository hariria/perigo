package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "MeetupLocation")
public class MeetupLocation {
	
	@Id
	public ObjectId _id;
	
	public String locationName;
	public long zipCode;
	public String address;
	
	public MeetupLocation(ObjectId _id, String locationName, long zipCode, String address) {
		super();
		this._id = _id;
		this.locationName = locationName;
		this.zipCode = zipCode;
		this.address = address;
	}
	
	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getLocationName() {
		return locationName;
	}
	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}
	public long getZipCode() {
		return zipCode;
	}
	public void setZipCode(long zipCode) {
		this.zipCode = zipCode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	
}
