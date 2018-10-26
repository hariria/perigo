package com.MongoController.perigo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.MongoController.perigo.models.MeetupLocation;

public interface MeetupLocationRepository extends MongoRepository<MeetupLocation, String> {
	MeetupLocation findBy_id(ObjectId _id);
}
