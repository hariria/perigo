package com.MongoController.perigo.controller;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.MeetupLocation;
import com.MongoController.perigo.repositories.MeetupLocationRepository;

@RestController
@RequestMapping("/meetuplocation")
public class MeetupLocationController {
	@Autowired
	private MeetupLocationRepository repository;

	@RequestMapping(value="/", method=RequestMethod.GET)
	public List<MeetupLocation> getAllMeetupLocations() {
		return repository.findAll();
	}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public MeetupLocation getMeetupLocationById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}

	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public void modifyMeetupLocationById(@PathVariable("id") ObjectId id, @Valid @RequestBody MeetupLocation meetupLocation) {
		meetupLocation.set_id(id);
		repository.save(meetupLocation);
	}

	@RequestMapping(value="/", method=RequestMethod.POST)
	public MeetupLocation createMeetupLocation(@Valid @RequestBody MeetupLocation meetupLocation) {
		meetupLocation.set_id(ObjectId.get());
		repository.save(meetupLocation);
		return meetupLocation;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteMeetupLocation(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}
