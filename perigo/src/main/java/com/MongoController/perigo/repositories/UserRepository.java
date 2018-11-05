package com.MongoController.perigo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.MongoController.perigo.models.User;

public interface UserRepository extends MongoRepository<User, String> {
	User findBy_id(ObjectId _id);
    User findByUsername(String username);
    User findByEmail(String email);
}
