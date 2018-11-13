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
public class RemoveExpiredThread implements Runnable {

	private static final Logger LOGGER = LoggerFactory.getLogger(AlertThread.class);

	public RemoveExpiredThread() {
		LOGGER.info("Created Thread");
	}

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
			
	        for (Item item : allItems) {
	        	long time = System.currentTimeMillis();
	        	long end = item.getEndForSaleDate();
	        	if (time - end > 0) {
	        		String entityUrl = url + item.get_id();
	        		restTemplate.delete(entityUrl);
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
