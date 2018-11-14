package com.MongoController.perigo.sockets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;

@Service
public class AlertService {
	
    @Autowired
    @Qualifier("threadPoolExecutor")
    private TaskExecutor taskExecutor;
    
    public void executeAsynchronously() {
        taskExecutor.execute(new AlertThread());
        taskExecutor.execute(new RemoveExpiredThread());
    }
}