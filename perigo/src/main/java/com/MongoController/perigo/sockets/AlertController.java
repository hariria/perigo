package com.MongoController.perigo.sockets;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import com.MongoController.perigo.models.Item;
import com.MongoController.perigo.models.UserWatching;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Multimap;
import com.google.common.collect.SetMultimap;

@Controller
@EnableScheduling
public class AlertController {
	
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	
    @Autowired
    public AlertController(SimpMessagingTemplate messagingTemplate) {
    	this.messagingTemplate = messagingTemplate;
    }
    
    @Scheduled(fixedRate = 2000)
    public void alertBidder() {
    	SetMultimap<String, String> outbidUserItems = ServerSocket.GetOutBidUsers();
   
    	//System.out.print(outbidUserItems.size());
    	for (String outbidUser : outbidUserItems.keySet()) {
    		Set<StompPrincipal> outbidUserSessions = ServerSocket.GetPrincipal(outbidUser);
    		Set<String> outbidItems = outbidUserItems.get(outbidUser);

    		for (String item : outbidItems) {
    			for (StompPrincipal user : outbidUserSessions) {
		    		String message = "You have been outbid on: ";
	    			message += (item + ", ");		    		
		    		message = message.substring(0, message.length() - 2);
		    		messagingTemplate.convertAndSendToUser(user.getName(), "/queue/bidalerts", message);	    		
	    		}
    			
	    		ServerSocket.ClearOutbidUserItem(outbidUser, item);
    		}
    	}
	}
    
    @Scheduled(fixedRate = 2000)
    public void updatePrice() {
    	Hashtable<String, Double> updatedItems = ServerSocket.GetItemsNeedUpdating();
    	
    	//System.out.print(outbidUserItems.size());
    	for (String item : updatedItems.keySet()) {
    		
	        String url = "http://localhost:9000/item/" + item;
	        RestTemplate restTemplate = new RestTemplate();
	        String responseEntity = restTemplate.getForObject(url, String.class);
	        ObjectMapper objectMapper = new ObjectMapper();
			Item allItems = null;
			try {
				allItems = objectMapper.readValue(responseEntity, new TypeReference<Item>(){});
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
    		//System.out.println(item);
    		Multimap<String, StompPrincipal> sessionMap = ServerSocket.getSessionMap();
    		for (String user : sessionMap.keySet()) {
    			Collection<StompPrincipal> userSockets = sessionMap.get(user);
    			for (StompPrincipal stp : userSockets) {
    				//System.out.print(stp.getItem());
    				if (stp.getItem().equals(item)) {    
    					//System.out.println(item);
    					Double newPrice = updatedItems.get(item);
    					messagingTemplate.convertAndSendToUser(stp.getName(), "/queue/pricealerts", newPrice.intValue());
    					if (allItems != null) {
    						messagingTemplate.convertAndSend("/queue/browsePriceAlerts", allItems.get_id().toString() + "-" + newPrice.intValue());
    					}
    				}
    			}
    			
    		}
    		  		

		
    		List<UserWatching> usersWatchingItem = allItems.getUsersWatching();
			Double newPrice = updatedItems.get(item);
			
	        for (UserWatching user : usersWatchingItem) {
	        	
	        	if (!user.getUserWatchingId().toString().equals(allItems.getHighestBidder().toString())) {
	        		if (!user.getRecentBidder()) {
	        			Collection<StompPrincipal> usersWatchingSockets = sessionMap.get(user.getUserWatchingId().toString());
		    			for (StompPrincipal stp : usersWatchingSockets) {
		    				//System.out.print(stp.getItem());   
							//System.out.println(item);
		    				String message = "New bid has been placed on " + allItems.getTitle() + " for $" + newPrice.intValue() + ".00";
		 					messagingTemplate.convertAndSendToUser(stp.getName(), "/queue/bidalerts", message);
		    			}
	        		} else {
	        			user.setRecentBidder(false);
	        		}
	        	}
	        }
	        
	        allItems.setUsersWatching(usersWatchingItem);
	        url = "http://localhost:9000/item/" + allItems.get_id();
	        restTemplate.put(url, allItems);   	
    		ServerSocket.ClearUpdatedItem(item, updatedItems.get(item));
   
    	}
	}   
    
    @Scheduled(fixedRate = 20000)
	public void sendReply() {   
    	for (StompPrincipal user : ServerSocket.getNotifyQueue().keySet()) {
    		String message = "Bidding for the following items will end in 10 minutes: ";
    		for (String item : ServerSocket.getNotifyItems(user)) {
    			message += (item + ", ");
    		}
    		message = message.substring(0, message.length() - 2);
    		//System.out.println(message);
    		//System.out.print(user.getName());
    		messagingTemplate.convertAndSendToUser(user.getName(), "/queue/bidalerts", message);
    		
    	}
    	ServerSocket.clearNotifyQueue();
	}

}