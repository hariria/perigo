package com.MongoController.perigo.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection="Message")
public class Message {
	
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	ObjectId _id;
	
	public String content;
	public ObjectId userSendingMessage;
	public ObjectId userReceivingMessage;
	
	public Message(ObjectId _id, String content, ObjectId userSendingMessage, ObjectId userReceivingMessage) {
		super();
		this._id = _id;
		this.content = content;
		this.userSendingMessage = userSendingMessage;
		this.userReceivingMessage = userReceivingMessage;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public ObjectId getUserSendingMessage() {
		return userSendingMessage;
	}

	public void setUserSendingMessage(ObjectId userSendingMessage) {
		this.userSendingMessage = userSendingMessage;
	}

	public ObjectId getUserReceivingMessage() {
		return userReceivingMessage;
	}

	public void setUserReceivingMessage(ObjectId userReceivingMessage) {
		this.userReceivingMessage = userReceivingMessage;
	}
	
	
}
