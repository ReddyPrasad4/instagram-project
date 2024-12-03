package com.instagram.controller;

import com.instagram.dto.BaseResponseDTO;
import com.instagram.dto.LoginDTO;
import com.instagram.dto.UserDTO;
import com.instagram.service.intrface.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<BaseResponseDTO> saveUser(@RequestBody UserDTO userDTO){
        return  userService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody LoginDTO loginDTO){
        return  userService.validateUser(loginDTO);
    }

    @GetMapping("/get-by-user-name/{userName}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String userName){
        return  userService.fetchByUserName(userName);
    }

    @GetMapping("/get-matched-user/{userName}")
    public ResponseEntity<List<UserDTO>> getMatchedUsers(@PathVariable String userName){
        return  userService.getAllMatchedUsers(userName);
    }

    @PutMapping("/update-user")
    public ResponseEntity<BaseResponseDTO> updateUser(@RequestBody UserDTO userDTO){
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("/delete-by-user-name/{userName}")
    public ResponseEntity<BaseResponseDTO> updateUser(@PathVariable String userName){
        return userService.deleteUser(userName);
    }

}
