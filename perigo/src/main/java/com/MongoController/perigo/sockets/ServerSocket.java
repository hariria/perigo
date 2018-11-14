package com.MongoController.perigo.sockets;

import java.util.Hashtable;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.SetMultimap;
 
public class ServerSocket {
	
	private static SetMultimap<String, StompPrincipal> sessionMap = HashMultimap.create();
	private static SetMultimap<StompPrincipal, String> notifyQueue = HashMultimap.create();
	private static SetMultimap<StompPrincipal, String> notifiedList = HashMultimap.create();
	private static SetMultimap<String, String> outbidUsers = HashMultimap.create();
	private static Hashtable<String, Double> updateItemPrices = new Hashtable<String, Double>();
	private static BlockingQueue<StompPrincipal> orphanedSockets = new LinkedBlockingQueue<StompPrincipal>();
	
	public static synchronized void AddUpdatedItem(String item, Double price) {
		updateItemPrices.put(item, price);
	}
	
	public static synchronized Hashtable<String, Double> GetItemsNeedUpdating() {
		return updateItemPrices;
	}
	
	public static synchronized void ClearUpdatedItem(String item, Double price) {
		if (updateItemPrices.get(item).equals(price)) updateItemPrices.remove(item);
	}
	
	
	public static synchronized void AddOutBidUser(String user, String item) {
		outbidUsers.put(user, item);
	}
	
	public static synchronized SetMultimap<String, String> GetOutBidUsers() {
		return outbidUsers;
	}
	
	public static synchronized void ClearOutbidUserItem(String user, String item) {
		outbidUsers.remove(user, item);
	}
	
	public static synchronized boolean CheckSession(String user) {
		return ServerSocket.sessionMap.containsKey(user);
	}
	
	public static synchronized  Set<StompPrincipal> GetPrincipal(String user) {
		return ServerSocket.sessionMap.get(user);
	}
	
	public static synchronized SetMultimap<String, StompPrincipal> getSessionMap() {
		return sessionMap;
	}
	
	public static synchronized void addSessionMap(String user, StompPrincipal connection) {
		ServerSocket.sessionMap.put(user, connection);
	}
	
	public static synchronized SetMultimap<StompPrincipal, String> getNotifyQueue() {
		return notifyQueue;
	}
	
	public static synchronized void addNotifyQueue(StompPrincipal notifySTP, String notifyItem) {
		ServerSocket.notifyQueue.put(notifySTP, notifyItem);
	}	
	
	public static synchronized Set<String> getNotifyItems(StompPrincipal notifySTP) {
		return ServerSocket.notifyQueue.get(notifySTP);
	}
	
	public static synchronized boolean CheckNotified(StompPrincipal notifiedSTP, String notifiedUser) {
		return ServerSocket.notifiedList.containsEntry(notifiedSTP, notifiedUser);
	}
	
	public static synchronized SetMultimap<StompPrincipal, String> getNotifiedList() {
		return notifiedList;
	}
	
	public static synchronized void setNotifiedList(StompPrincipal notifiedSTP, String notifiedItem) {
		ServerSocket.notifiedList.put(notifiedSTP, notifiedItem);
	}
	
	public static synchronized void addNotifyList(StompPrincipal notifySTP, String notifyItem) {
		ServerSocket.notifiedList.put(notifySTP, notifyItem);
	}
	
	public static synchronized BlockingQueue<StompPrincipal> getOrphanedSockets() {
		return orphanedSockets;
	}
	
	public static synchronized void addOrphan(StompPrincipal orphan) {
		ServerSocket.orphanedSockets.add(orphan);
	}
	
	public static synchronized void clearNotifyQueue() {
		ServerSocket.notifyQueue.clear();
	}
	
	public static synchronized boolean anyOrphansLeft() {
		return !ServerSocket.orphanedSockets.isEmpty();
	}
	
	public static synchronized StompPrincipal getOrphan() {
		return ServerSocket.orphanedSockets.remove();
	}
	
}