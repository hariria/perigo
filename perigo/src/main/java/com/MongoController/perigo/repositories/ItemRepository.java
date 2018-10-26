package com.MongoController.perigo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.MongoController.perigo.models.Item;

public interface ItemRepository extends MongoRepository<Item, String> {
	Item findBy_id(ObjectId _id);
}