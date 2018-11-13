package com.MongoController.perigo.sockets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(AppRunner.class);
	
	@Autowired
	private AlertService alertService;
	
    public AppRunner() {

    }

    @Override
    public void run(String... args) throws Exception {
    	logger.info("Started alert thread");
    	alertService.executeAsynchronously();
    }

} 