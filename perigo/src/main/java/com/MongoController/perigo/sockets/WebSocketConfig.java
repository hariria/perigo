package com.MongoController.perigo.sockets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/queue");
        config.setApplicationDestinationPrefixes("/perigoapp");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/perigoendpoint").setHandshakeHandler(new CustomHandshakeHandler()).withSockJS();
    }
    
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.interceptors(sessionContextChannelInterceptor());
    }
    
    @Bean
    public ChannelInterceptor sessionContextChannelInterceptor() {
        return new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
            	final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                String token = accessor.getFirstNativeHeader("name");
                String item = accessor.getFirstNativeHeader("item");             
                if (token != null) {
                	if (ServerSocket.anyOrphansLeft()) {
                		StompPrincipal stp = ServerSocket.getOrphan();
                		if (item != null) stp.setItem(item);
                		ServerSocket.addSessionMap(token, stp);
                	}
                }
                return message;
            }
        };
    }

}