package com.MongoController.perigo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.MongoController.perigo.models.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
	Message findBy_id(ObjectId _id);
}
