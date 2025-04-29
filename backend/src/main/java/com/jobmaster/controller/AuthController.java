package com.jobmaster.controller;

import com.jobmaster.dto.AuthenticationDTO;
import com.jobmaster.dto.SignUpDTO;
import com.jobmaster.dto.AuthResponseDTO;
import com.jobmaster.service.AuthService;
import com.jobmaster.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final CustomUserDetailsService userDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpDTO signUpDTO) {
        if (authService.hasUserWithEmail(signUpDTO.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        return ResponseEntity.ok(authService.createUser(signUpDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthenticationDTO authDTO) {
        return ResponseEntity.ok(userDetailsService.getAuthResponseDTO(authDTO));
    }
}
