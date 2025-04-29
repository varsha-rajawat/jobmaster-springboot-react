package com.jobmaster.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobmaster.dto.SignUpDTO;
import com.jobmaster.dto.UserDTO;
import com.jobmaster.mapper.UserMapper;
import com.jobmaster.model.User;
import com.jobmaster.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final UserMapper userMapper;

    public UserDTO createUser(SignUpDTO signUpDTO) {
        User user = userMapper.toUserEntity(signUpDTO);
        user.setPassword(encoder.encode(signUpDTO.getPassword()));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

}
