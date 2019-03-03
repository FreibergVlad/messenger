package com.freiberg.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WsGatewayController {

    @MessageMapping("/echo")
    public String echo(String message) {
        return message;
    }
}
