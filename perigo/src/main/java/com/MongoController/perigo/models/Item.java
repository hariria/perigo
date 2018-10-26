package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Item")
public class Item {

	@Id
	public ObjectId _id;

	public String title;
	public String description;
	public String condition;
	public boolean forSale;
	public ObjectId userSellingItem;
	public ObjectId highestBidder;
	public int endForSaleDate;
	public int startForSaleDate;

	public Item(ObjectId _id, String title, String description, String condition, boolean forSale,
			ObjectId userSellingItem, ObjectId highestBidder, int endForSaleDate, int startForSaleDate) {
		super();
		this._id = _id;
		this.title = title;
		this.description = description;
		this.condition = condition;
		this.forSale = forSale;
		this.userSellingItem = userSellingItem;
		this.highestBidder = highestBidder;
		this.endForSaleDate = endForSaleDate;
		this.startForSaleDate = startForSaleDate;
	}

	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
	public boolean isForSale() {
		return forSale;
	}
	public void setForSale(boolean forSale) {
		this.forSale = forSale;
	}
	public ObjectId getUserSellingItem() {
		return userSellingItem;
	}
	public void setUserSellingItem(ObjectId userSellingItem) {
		this.userSellingItem = userSellingItem;
	}
	public ObjectId getHighestBidder() {
		return highestBidder;
	}
	public void setHighestBidder(ObjectId highestBidder) {
		this.highestBidder = highestBidder;
	}
	public int getEndForSaleDate() {
		return endForSaleDate;
	}
	public void setEndForSaleDate(int endForSaleDate) {
		this.endForSaleDate = endForSaleDate;
	}
	public int getStartForSaleDate() {
		return startForSaleDate;
	}
	public void setStartForSaleDate(int startForSaleDate) {
		this.startForSaleDate = startForSaleDate;
	}


}
