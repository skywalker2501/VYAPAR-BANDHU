package com.vyaparbandhu.domain.auth;

import com.vyaparbandhu.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        // In real app, call Twilio/SMS API here
        return ResponseEntity.ok(Map.of("message", "OTP sent to " + phone));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        String otp = request.get("otp");

        // Mock verification logic for prototype
        if ("1234".equals(otp) || otp != null) {
            String token = jwtUtil.generateTokenFromPhone(phone);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of("phone", phone));
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Invalid OTP"));
    }
}
