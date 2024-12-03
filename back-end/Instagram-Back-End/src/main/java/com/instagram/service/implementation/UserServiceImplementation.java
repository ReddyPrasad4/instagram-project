package com.instagram.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.dto.BaseResponseDTO;
import com.instagram.dto.LoginDTO;
import com.instagram.dto.UserDTO;
import com.instagram.entity.User;
import com.instagram.repository.UserRepository;
import com.instagram.service.intrface.UserService;
import com.instagram.util.ApplicationConstants;
import com.instagram.util.Convertions;
import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Convertions convertion;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public ResponseEntity<BaseResponseDTO> registerUser(UserDTO userDTO) {
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        try {
            if (!ObjectUtils.isEmpty(userDTO) && StringUtils.isNotEmpty(userDTO.getEmail()) && !ObjectUtils.isEmpty(userDTO.getMobileNumber())) {
                List<User> userList = userRepository.findByUserNameOrEmailAndIsDeleted(userDTO.getUserName(),userDTO.getEmail(), Boolean.FALSE);
                if (CollectionUtils.isEmpty(userList)) {
                    User convertedUser = convertion.convertToEntity(userDTO, User.class);
                    convertedUser.setEmail(convertedUser.getEmail().toLowerCase());
                    convertedUser.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
                    userRepository.save(convertedUser);
                    baseResponseDTO.setMessage(ApplicationConstants.USER_SAVE_SUCCESS);
                    return new ResponseEntity<>(baseResponseDTO, HttpStatus.OK);
                }
                else if(userList.stream().anyMatch(user -> user.getUserName().equals(userDTO.getUserName())))
                {
                    baseResponseDTO.setMessage(ApplicationConstants.USER_NAME_ALREADY_EXISTS);
                }
                else {
                    baseResponseDTO.setMessage(ApplicationConstants.USER_EMAIL_ALREADY_EXISTS);
                }
                return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
            }
            baseResponseDTO.setMessage(ApplicationConstants.EMPTY_INPUT);
            return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            baseResponseDTO.setMessage(ApplicationConstants.ERROR_SAVING_USER + e.getMessage());
            log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public ResponseEntity<List<UserDTO>> getAllMatchedUsers(String userName) {
        UserDTO responseUserDTO = new UserDTO();
        try {
            List<User> userList = userRepository.findMatchedUser(userName);
            if(!CollectionUtils.isEmpty(userList))
            {
                List<UserDTO> userDTOList = userList.stream().map(user -> convertion.convertToDto(user, UserDTO.class)).toList();
                return new ResponseEntity<>(userDTOList,HttpStatus.OK);
            }
            responseUserDTO.setMessage(ApplicationConstants.USER_NOT_FOUND);
            return new ResponseEntity<>(List.of(responseUserDTO),HttpStatus.BAD_REQUEST);
        }
        catch (Exception e)
        {
            log.error(e.getLocalizedMessage());
            responseUserDTO.setMessage(ApplicationConstants.ERROR_FETCHING_USER+ e.getLocalizedMessage());
            return new ResponseEntity<>(List.of(responseUserDTO),HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<UserDTO> validateUser(LoginDTO loginDTO) {
        UserDTO responseUserDTO = new UserDTO();
        try {
            if (!StringUtils.isEmpty(loginDTO.getUserNameOrEmail()) && !StringUtils.isEmpty(loginDTO.getPassword())) {
                List<User> userList = userRepository.findByUserNameOrEmailAndIsDeleted(loginDTO.getUserNameOrEmail(),loginDTO.getUserNameOrEmail(),Boolean.FALSE);
                if (!CollectionUtils.isEmpty(userList)) {
                    Optional<User> matchedOptionalUser = userList.stream().filter(user -> (user.getUserName().equals(loginDTO.getUserNameOrEmail()) || user.getEmail().equals(loginDTO.getUserNameOrEmail())) && new BCryptPasswordEncoder().matches(loginDTO.getPassword(),user.getPassword())).findFirst();
                    if(matchedOptionalUser.isPresent())
                    {
                        UserDTO userDTO = convertion.convertToDto(matchedOptionalUser.get(), UserDTO.class);
                        userDTO.setMessage(ApplicationConstants.LOGGED_IN_SUCCESS);
                        return new ResponseEntity<>(userDTO, HttpStatus.OK);
                    }
                    else {
                        responseUserDTO.setMessage(ApplicationConstants.INVALID_CREDENTIALS);
                        return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
                    }
                } else {
                    responseUserDTO.setMessage(ApplicationConstants.NO_USER_FOUND);
                    return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
                }
            } else {
                responseUserDTO.setMessage(ApplicationConstants.EMPTY_INPUT);
                return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            responseUserDTO.setMessage(ApplicationConstants.ERROR_FETCHING_USER + e.getLocalizedMessage());
            return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<UserDTO> fetchByUserName(String userName) {
        UserDTO responseUserDTO = new UserDTO();
        try {
            if (!StringUtils.isEmpty(userName)) {
                User user = userRepository.findByUserNameAndIsDeleted(userName, Boolean.FALSE);
                if (!ObjectUtils.isEmpty(user)) {
                    UserDTO userDTO = convertion.convertToDto(user, UserDTO.class);
                    userDTO.setMessage(ApplicationConstants.USER_FOUND_SUCCESS);
                    return new ResponseEntity<>(userDTO, HttpStatus.OK);
                }
                responseUserDTO.setMessage(ApplicationConstants.USER_NOT_FOUND);
                return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
            }
            responseUserDTO.setMessage(ApplicationConstants.EMPTY_INPUT);
            return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            responseUserDTO.setMessage(ApplicationConstants.ERROR_FETCHING_USER + e.getLocalizedMessage());
            return new ResponseEntity<>(responseUserDTO, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<BaseResponseDTO> updateUser(UserDTO userDTO) {
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        try {
            if (!ObjectUtils.isEmpty(userDTO.getId())) {
                User fetchedUser = userRepository.findById(userDTO.getId()).orElseThrow(() -> new RuntimeException(ApplicationConstants.USER_NOT_FOUND));
                User duplicateUser = userRepository.findByUserNameAndIsDeleted(userDTO.getUserName(), Boolean.FALSE);
                if (!ObjectUtils.isEmpty(duplicateUser)) {
                    User user = objectMapper.readerForUpdating(fetchedUser).readValue(objectMapper.writeValueAsBytes(userDTO));
                    userRepository.save(user);
                    baseResponseDTO.setMessage(ApplicationConstants.USER_UPDATED_SUCCESS);
                    return new ResponseEntity<>(baseResponseDTO, HttpStatus.OK);
                }
                baseResponseDTO.setMessage(ApplicationConstants.USER_NAME_NOT_AVAILABLE);
                return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            baseResponseDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
        }
        baseResponseDTO.setMessage(ApplicationConstants.ERROR_UPDATING_USER);
        return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<BaseResponseDTO> deleteUser(String userName) {
        BaseResponseDTO baseResponseDTO = new BaseResponseDTO();
        try {
//            Assert.notNull(userId,ApplicationConstants.EMPTY_INPUT);
            if (StringUtils.isNotEmpty(userName)) {
                User fetchedUser = userRepository.findByUserNameAndIsDeleted(userName,Boolean.FALSE);
                if (!ObjectUtils.isEmpty(fetchedUser)) {
                    fetchedUser.setIsDeleted(Boolean.TRUE);
                    userRepository.save(fetchedUser);
                    baseResponseDTO.setMessage(ApplicationConstants.USER_DELETED_SUCCESS);
                    return new ResponseEntity<>(baseResponseDTO, HttpStatus.OK);
                }
                baseResponseDTO.setMessage(ApplicationConstants.USER_NOT_FOUND);
                return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
            }
            baseResponseDTO.setMessage(ApplicationConstants.EMPTY_INPUT);
            return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
            baseResponseDTO.setMessage(ApplicationConstants.ERROR_DELETING_USER + e.getMessage());
            return new ResponseEntity<>(baseResponseDTO, HttpStatus.BAD_REQUEST);
        }

    }
}
