package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection = "MeetupLocation")
public class MeetupLocation {
	
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	public ObjectId _id;
	
	public String locationName;
	public int zipCode;
	public String address;
	
	public MeetupLocation(ObjectId _id, String locationName, int zipCode, String address) {
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
	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	
}
