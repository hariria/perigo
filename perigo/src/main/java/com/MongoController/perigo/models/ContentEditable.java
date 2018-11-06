package com.MongoController.perigo.models;

public class ContentEditable {
	private String location;
	private String zipCode;
	
	public ContentEditable(String location, String zipCode) {
		super();
		this.location = location;
		this.zipCode = zipCode;
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
	
	
}
