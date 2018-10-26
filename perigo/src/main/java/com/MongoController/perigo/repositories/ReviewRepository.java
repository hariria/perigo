package com.MongoController.perigo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.MongoController.perigo.models.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {
	Review findBy_id(ObjectId _id);
}
