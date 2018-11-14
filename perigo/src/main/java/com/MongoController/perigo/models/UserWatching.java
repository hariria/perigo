package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class UserWatching {
	
	@JsonSerialize(using = ToStringSerializer.class)
	ObjectId userWatchingId;
	boolean recentBidder = false;
	
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
	
	public void setRecentBidder(boolean bid) {
		recentBidder = bid;
	}
	
	public boolean getRecentBidder() {
		return recentBidder;
	}
	
	public UserWatching() {
		
	}
}
