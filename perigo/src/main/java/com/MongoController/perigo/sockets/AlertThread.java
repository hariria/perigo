package com.MongoController.perigo.sockets;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.MongoController.perigo.models.Item;
import com.MongoController.perigo.models.UserWatching;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@Scope("prototype")
public class AlertThread implements Runnable {

	private static final Logger LOGGER = LoggerFactory.getLogger(AlertThread.class);

	public AlertThread() {
		LOGGER.info("Created Thread");
	}
    /* @Async
    public CompletableFuture<HashMap<String, UserWatching[]>> alertUsersUpcomingBids() throws InterruptedException, JsonParseException, JsonMappingException, IOException {
        String url = "http://localhost:9000/item/";
        RestTemplate restTemplate = new RestTemplate();
        String responseEntity = restTemplate.getForObject(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
		List<Item> allItems = objectMapper.readValue(responseEntity, new TypeReference<List<Item>>(){});
        HashMap<String, UserWatching[]> itemsNeedAlerting = new HashMap<String, UserWatching[]>();
        for (Item item : allItems) {
        	long time = System.currentTimeMillis();
        	long diff = item.getEndForSaleDate();
        	if (time - diff > 0) {
        		UserWatching[] usersWatchingItem = item.getUsersWatching();
        		String itemName = item.getTitle();
        		itemsNeedAlerting.put(itemName, usersWatchingItem);
        	}
        	
        }
    
        return CompletableFuture.completedFuture(itemsNeedAlerting);
    } */

	@Override
	public void run() {
	
		while (true) {
	        String url = "http://localhost:9000/item/";
	        RestTemplate restTemplate = new RestTemplate();
	        String responseEntity = restTemplate.getForObject(url, String.class);
	        ObjectMapper objectMapper = new ObjectMapper();
			List<Item> allItems = null;
			try {
				allItems = objectMapper.readValue(responseEntity, new TypeReference<List<Item>>(){});
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
			
	        HashMap<String, List<UserWatching>> itemsNeedAlerting = new HashMap<String, List<UserWatching>>();
	        for (Item item : allItems) {
	        	long time = System.currentTimeMillis();
	        	long diff = item.getEndForSaleDate();
	        	if (diff - time < 600000) {
	        		List<UserWatching> usersWatchingItem = item.getUsersWatching();
	        		String itemName = item.getTitle();
	        		itemsNeedAlerting.put(itemName, usersWatchingItem);
	        	}
	        	
	        }
	        
	        for (Entry<String, List<UserWatching>> pair : itemsNeedAlerting.entrySet()){
	        	String item = pair.getKey();
	            for (UserWatching user : pair.getValue()) {
	            	String userId = user.getUserWatchingId().toString();	         
	            	if (ServerSocket.CheckSession(userId)) {	
	            		Set<StompPrincipal> stp = ServerSocket.GetPrincipal(userId);
	            		for (StompPrincipal uniquestp : stp) {
		            		if (!ServerSocket.CheckNotified(uniquestp, item)) {
			            		ServerSocket.addNotifyQueue(uniquestp, item);
			            		ServerSocket.addNotifyList(uniquestp, item);
		            		}
	            		}
	            	}
	            }
	        }
	
	        try {
				Thread.sleep(20000L);
				
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        
		}
		
	}

}
