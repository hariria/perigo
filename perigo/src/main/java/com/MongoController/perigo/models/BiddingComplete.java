package com.MongoController.perigo.models;

public class BiddingComplete {
	public String highestBidderEmail;
	public String sellerEmail;
	public BiddingComplete(String highestBidderEmail, String sellerEmail, String itemName) {
		super();
		this.highestBidderEmail = highestBidderEmail;
		this.sellerEmail = sellerEmail;
		this.itemName = itemName;
	}
	public String itemName;
	public String getHighestBidderEmail() {
		return highestBidderEmail;
	}
	public void setHighestBidderEmail(String highestBidderEmail) {
		this.highestBidderEmail = highestBidderEmail;
	}
	public String getSellerEmail() {
		return sellerEmail;
	}
	public void setSellerEmail(String sellerEmail) {
		this.sellerEmail = sellerEmail;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	
	
}
