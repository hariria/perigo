package com.MongoController.perigo.models;

public class NewBid {
	private int bid;

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
	
}
