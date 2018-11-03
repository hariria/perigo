package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection="Review")
public class Review {
	
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	public ObjectId _id;
	
	public ObjectId reviewerId;
	public ObjectId userBeingReviewed;
	public Review(ObjectId _id, ObjectId reviewerId, ObjectId userBeingReviewed) {
		super();
		this._id = _id;
		this.reviewerId = reviewerId;
		this.userBeingReviewed = userBeingReviewed;
	}
	public ObjectId get_id() {
		return _id;
	}
	public void set_id(ObjectId _id) {
		this._id = _id;
	}
	public ObjectId getReviewerId() {
		return reviewerId;
	}
	public void setReviewerId(ObjectId reviewerId) {
		this.reviewerId = reviewerId;
	}
	public ObjectId getUserBeingReviewed() {
		return userBeingReviewed;
	}
	public void setUserBeingReviewed(ObjectId userBeingReviewed) {
		this.userBeingReviewed = userBeingReviewed;
	}

	
}
