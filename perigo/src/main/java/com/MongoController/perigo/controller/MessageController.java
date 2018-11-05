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

import com.MongoController.perigo.models.Message;
import com.MongoController.perigo.repositories.MessageRepository;

@RestController
@RequestMapping("/message")
public class MessageController {
	@Autowired
	private MessageRepository repository;

	@RequestMapping(value="/", method=RequestMethod.GET)
	public List<Message> getAllMessages() {
		return repository.findAll();
	}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Message getMessageById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}

	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public void modifyMessageById(@PathVariable("id") ObjectId id, @Valid @RequestBody Message message) {
		message.set_id(id);
		repository.save(message);
	}

	@RequestMapping(value="/", method=RequestMethod.POST)
	public Message createMessage(@Valid @RequestBody Message message) {
		message.set_id(ObjectId.get());
		repository.save(message);
		return message;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteMessage(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}
