package com.MongoController.perigo.controller;

import java.util.ArrayList;
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
import com.MongoController.perigo.models.NewBid;
import com.MongoController.perigo.models.UserWatching;
import com.MongoController.perigo.repositories.ItemRepository;
import com.MongoController.perigo.sockets.ServerSocket;

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

	@RequestMapping(value="/addwatchinguser/{id}", method=RequestMethod.PUT)
	public void modifySavedItems(@PathVariable("id") ObjectId id, @Valid @RequestBody UserWatching userWatchingId) {		
		Item update = repository.findBy_id(id);
		update.getUsersWatching().add(userWatchingId);
		repository.save(update);	
	}
	
	@RequestMapping(value="/removewatchinguser/{id}", method=RequestMethod.PUT)
	public void removedSavedItem(@PathVariable("id") ObjectId id, @Valid @RequestBody UserWatching userWatchingId) {		
		Item update = repository.findBy_id(id);
		update.getUsersWatching().removeIf(si -> si.getUserWatchingId().equals(userWatchingId.getUserWatchingId()));

		repository.save(update);	
	}
	
	@RequestMapping(value="/editlisting/{id}", method=RequestMethod.PUT)
	public Item editItem(@PathVariable("id") ObjectId id, @Valid @RequestBody Item newInfo) {
		Item toChange = repository.findBy_id(id);
		toChange.setTitle(newInfo.title);
		toChange.setDescription(newInfo.description);
		toChange.setLocation(newInfo.location);
		toChange.setZipCode(newInfo.zipCode);
		toChange.setKeywords(newInfo.keywords);
		
		repository.save(toChange);
		
		return toChange;
	}
	
	@RequestMapping(value="/", method=RequestMethod.POST)
	public Item createItem(@Valid @RequestBody Item item) {
		item.set_id(ObjectId.get());
		item.setUsersWatching(new ArrayList<UserWatching>());
		repository.save(item);
		return item;
	}

	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void deleteItem(@PathVariable ObjectId id) {
		repository.delete(repository.findBy_id(id));
	}
	
	@RequestMapping(value="/submitbid/{id}", method=RequestMethod.PUT)
	public void submitNewBid(@PathVariable("id") ObjectId id, @Valid @RequestBody NewBid bid) {
		Item update = repository.findBy_id(id);
		
		// Notify old bidder they've been outbid
		if (update.getHighestBidder() != null && !(update.getHighestBidder().toString().equals(bid.getHighestBidder().toString()))) {
			ServerSocket.AddOutBidUser(update.getHighestBidder().toString(), update.getTitle());
		}
		
		// Person who just got outbid shouldn't get a notification that the
		// price has changed (duplicate notification)
		List<UserWatching> usersWatching = update.getUsersWatching();
		for (UserWatching user : usersWatching) {
			if (user.getUserWatchingId().equals(update.getHighestBidder())) {
				user.setRecentBidder(true);
			}
		}
		update.setUsersWatching(usersWatching);		
		
		
		update.setMaxBid(bid.getBid());
		update.setHighestBidder(bid.getHighestBidder());
		
		// Send price update to all sockets
		ServerSocket.AddUpdatedItem(update.get_id().toString(), (double)bid.getBid());
		
		repository.save(update);
	}
}
