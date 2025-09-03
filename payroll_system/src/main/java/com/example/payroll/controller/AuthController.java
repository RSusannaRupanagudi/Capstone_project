package com.example.payroll.controller;

import com.example.payroll.dto.AuthRequest;
import com.example.payroll.dto.AuthResponse;
import com.example.payroll.dto.ApiResponse;
import com.example.payroll.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<ApiResponse> testApi() {
        return ResponseEntity.ok(new ApiResponse(true, "Auth API is working"));
    }
}
