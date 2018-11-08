package com.MongoController.perigo.controller;

import java.beans.Encoder;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.json.JsonWriterSettings;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.MongoController.perigo.models.Item;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

@Controller
@RequestMapping("/search")
public class SearchController {
	
	private List<Item> returnAllItems() throws JsonParseException, JsonMappingException, IOException {
	
		List<Item> toReturn = new ArrayList<Item>();
		
		MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
		MongoDatabase database = mongoClient.getDatabase("perigo");
		
	    MongoCollection<Document> collection = database.getCollection("Item"); 
        try (MongoCursor<Document> cur = collection.find().iterator()) {
            while (cur.hasNext()) {

            	Document doc = cur.next();
        		
            	ObjectMapper objectMapper = new ObjectMapper();
            	
            	
            	
            	Item item = objectMapper.readValue(doc.toJson(), Item.class);
            	
            	//toReturn.add(item);
            	
            }
        }
	    mongoClient.close();
	    return toReturn;
	}

	@RequestMapping(value="/{query}", method=RequestMethod.GET)
	public void getSearchResults(@PathVariable("query") String query) throws JsonParseException, JsonMappingException, IOException {
		List<Item> items = returnAllItems();
		String[] elements = query.split("\\s+");


		//for (String i : elements) {
			for (Item i : items) {
				System.out.println(i.title);
			}
		
		//}
	}

}
