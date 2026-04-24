package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome, authenticated user");
        response.put("username", authentication.getName());
        response.put("roles", authentication.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList()));
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> getUserDashboard(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User Dashboard - Access Granted");
        response.put("username", authentication.getName());
        response.put("description", "This endpoint is accessible to USER and ADMIN roles");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> getUserSettings(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "User Settings - Access Granted");
        response.put("username", authentication.getName());
        response.put("description", "You can manage your user settings here");
        return ResponseEntity.ok(response);
    }
}
