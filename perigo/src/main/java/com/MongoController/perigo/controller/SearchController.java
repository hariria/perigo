package com.MongoController.perigo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Controller
@RequestMapping("/search")
public class SearchController {
	
	private List<Document> returnAllItems() throws JsonParseException, JsonMappingException, IOException {
	
		
		MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
		MongoDatabase database = mongoClient.getDatabase("perigo");
		
	    MongoCollection<Document> collection = database.getCollection("Item"); 
	    
	    List<Document> toReturn = (List<Document>) collection.find().into(new ArrayList<Document>());
	    mongoClient.close();
	    
	    return toReturn;
	}

	@RequestMapping(value="/{query}", method=RequestMethod.GET)
	public ResponseEntity<Object> getSearchResults(@PathVariable("query") String query) throws JsonParseException, JsonMappingException, IOException {
		
		List<Document> items = returnAllItems();
		
        Set<String> setOfItems = new HashSet<String>(); 
		
		String[] elements = query.split("\\s+");
		
		for (String i : elements) {
			for (Document j : items) {
				String objectId = ((ObjectId) j.get("_id")).toHexString();
				String title = j.getString("title");
				
				if (title.toLowerCase().contains(i.toLowerCase())) {
					setOfItems.add(objectId);
					break;
				}

				
				@SuppressWarnings("unchecked")
				List<String> keywords = (List<String>) j.get("keywords");
				for (String k : keywords) {
					if (k.toLowerCase().equals(i.toLowerCase())) {
						setOfItems.add(objectId);
						break;
					}
				}
			}
		}
		
        String[] entities = setOfItems.stream().toArray(String[] ::new); 
        
        return new ResponseEntity<Object>(entities, HttpStatus.OK);
	}

}
