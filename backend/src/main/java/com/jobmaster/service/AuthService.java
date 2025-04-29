package com.jobmaster.service;

import com.jobmaster.dto.SignUpDTO;
import com.jobmaster.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(SignUpDTO signUpDTO);
    Boolean hasUserWithEmail(String email);
}
