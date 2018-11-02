package com.MongoController.perigo;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.MongoController.perigo.models.Item;
import com.MongoController.perigo.repositories.ItemRepository;

@RestController
@RequestMapping("/item")
public class ItemController {
	@Autowired
	private ItemRepository repository;

	@RequestMapping(value="/", method=RequestMethod.GET)
	public List<Item> getAllItems() {
		return repository.findAll();
	}

	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public Item getItemById(@PathVariable("id") ObjectId id) {
		return repository.findBy_id(id);
	}

	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public void modifyItemById(@PathVariable("id") ObjectId id, @Valid @RequestBody Item item) {
		item.set_id(id);
		repository.save(item);
	}

	@RequestMapping(value="/", method=RequestMethod.POST)
	public Item createItem(@Valid @RequestBody Item item) {
		item.set_id(ObjectId.get());
		repository.save(item);
		return item;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteItem(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
}