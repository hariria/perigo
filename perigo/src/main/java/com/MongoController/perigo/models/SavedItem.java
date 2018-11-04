package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class SavedItem {
	
	@JsonSerialize(using = ToStringSerializer.class)
	ObjectId itemId;

	public ObjectId getItemId() {
		return itemId;
	}

	public void setItemId(ObjectId itemId) {
		this.itemId = itemId;
	}

	public SavedItem(ObjectId itemId) {
		super();
		this.itemId = itemId;
	}
	
	public SavedItem() {
		
	}
}
