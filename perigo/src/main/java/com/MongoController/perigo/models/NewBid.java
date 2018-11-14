package com.MongoController.perigo.models;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class NewBid {
	private int bid;
	
	@JsonSerialize(using = ToStringSerializer.class)
	private ObjectId highestBidder;
	
	public NewBid() {

	}

	public NewBid(int bid) {
		super();
		this.bid = bid;
	}

	public int getBid() {
		return bid;
	}

	public void setBid(int bid) {
		this.bid = bid;
	}

	public ObjectId getHighestBidder() {
		return highestBidder;
	}

	public void setHighestBidder(ObjectId highestBidder) {
		this.highestBidder = highestBidder;
	}
	
	
}
