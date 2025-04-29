package com.jobmaster.service;

import com.jobmaster.model.User;
import com.jobmaster.repository.UserRepository;
import com.jobmaster.dto.AuthResponseDTO;
import com.jobmaster.dto.AuthenticationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public AuthResponseDTO getAuthResponseDTO(AuthenticationDTO dto) {
        UserDetails userDetails = loadUserByUsername(dto.username());
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String jwt = jwtService.generateToken(userDetails);

        return new AuthResponseDTO("Login successful", user.getId(), jwt);
    }
}
