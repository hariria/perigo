package com.MongoController.perigo.sockets;

import java.security.Principal;

class StompPrincipal implements Principal {
    String name;
    String item = null;
    
    StompPrincipal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
    
    public String getItem() {
    	return this.item;
    }
    
    public void setItem(String item) {
    	this.item = item;
    }
}