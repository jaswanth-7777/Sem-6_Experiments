package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getAdminDashboard(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome, admin");
        response.put("username", authentication.getName());
        response.put("role", "ADMIN");
        response.put("description", "This endpoint is accessible only to ADMIN role");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<Map<String, String>> listAllUsers(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin: User Management - Access Granted");
        response.put("admin", authentication.getName());
        response.put("description", "You can view all users here");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/settings")
    public ResponseEntity<Map<String, String>> adminSettings(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin Settings - Access Granted");
        response.put("admin", authentication.getName());
        response.put("description", "You can manage system-wide settings here");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reports")
    public ResponseEntity<Map<String, String>> getReports(Authentication authentication) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin Reports - Access Granted");
        response.put("admin", authentication.getName());
        response.put("description", "View system reports and analytics");
        return ResponseEntity.ok(response);
    }
}
