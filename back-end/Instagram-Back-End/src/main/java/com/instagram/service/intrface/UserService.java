package com.instagram.service.intrface;

import com.instagram.dto.BaseResponseDTO;
import com.instagram.dto.LoginDTO;
import com.instagram.dto.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface UserService {

    ResponseEntity<BaseResponseDTO> registerUser(UserDTO userDTO);

    ResponseEntity<UserDTO> validateUser(LoginDTO loginDTO);

    ResponseEntity<BaseResponseDTO> updateUser(UserDTO userDTO);

    ResponseEntity<BaseResponseDTO> deleteUser(String userName);

    ResponseEntity<UserDTO> fetchByUserName(String userName);

    ResponseEntity<List<UserDTO>> getAllMatchedUsers(String userName);
}
