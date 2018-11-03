package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class UserWatching {
	
	@JsonSerialize(using = ToStringSerializer.class)
	ObjectId userWatchingId;

	public ObjectId getUserWatchingId() {
		return userWatchingId;
	}

	public void setUserWatchingId(ObjectId userWatchingId) {
		this.userWatchingId = userWatchingId;
	}

	public UserWatching(ObjectId userWatchingId) {
		super();
		this.userWatchingId = userWatchingId;
	}
}
