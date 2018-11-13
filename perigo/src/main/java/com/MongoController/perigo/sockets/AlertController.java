package com.MongoController.perigo.sockets;

import java.util.Collection;
import java.util.Hashtable;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

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
    
    @Scheduled(fixedRate = 20000)
    public void alertBidder() {
    	SetMultimap<String, String> outbidUserItems = ServerSocket.GetOutBidUsers();
   
    	//System.out.print(outbidUserItems.size());
    	for (String outbidUser : outbidUserItems.keySet()) {
    		Set<StompPrincipal> outbidUserSessions = ServerSocket.GetPrincipal(outbidUser);
    		Set<String> outbidItems = outbidUserItems.get(outbidUser);
    		
	    	for (StompPrincipal user : outbidUserSessions) {
	    		String message = "YOU HAVE BEEN OUTBID ON: ";
	    		for (String item : outbidItems) {
	    			message += (item + ", ");
		    		ServerSocket.ClearOutbidUserItem(outbidUser, item);
	    		}
	    		message = message.substring(0, message.length() - 2);
	    		messagingTemplate.convertAndSendToUser(user.getName(), "/queue/bidalerts", message);
	    	}
    	}
	}
    
    @Scheduled(fixedRate = 20000)
    public void updatePrice() {
    	Hashtable<String, Double> updatedItems = ServerSocket.GetItemsNeedUpdating();
   
    	//System.out.print(outbidUserItems.size());
    	for (String item : updatedItems.keySet()) {
    		System.out.println(item);
    		Multimap<String, StompPrincipal> sessionMap = ServerSocket.getSessionMap();
    		for (String user : sessionMap.keySet()) {
    			Collection<StompPrincipal> userSockets = sessionMap.get(user);
    			for (StompPrincipal stp : userSockets) {
    				System.out.print(stp.getItem());
    				if (stp.getItem().equals(item)) {    
    					System.out.println(item);
    					Double newPrice = updatedItems.get(item);
    					messagingTemplate.convertAndSendToUser(stp.getName(), "/queue/pricealerts", newPrice.intValue());
    				}
    			}
    			
    		}
    		
    		ServerSocket.ClearUpdatedItem(item, updatedItems.get(item));
   
    	}
	}   
    
    @Scheduled(fixedRate = 20000)
	public void sendReply() {   
    	for (StompPrincipal user : ServerSocket.getNotifyQueue().keySet()) {
    		String message = "BIDDING FOR THE FOLLOWING ITEMS WILL CLOSE IN 5 MINUTES: ";
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