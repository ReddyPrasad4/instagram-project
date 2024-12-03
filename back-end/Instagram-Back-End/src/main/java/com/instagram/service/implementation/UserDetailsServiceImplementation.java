//package com.instagram.service.implementation;
//
//import com.instagram.entity.User;
//import com.instagram.repository.UserRepository;
//import io.micrometer.common.util.StringUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.util.ObjectUtils;
//
//@Service
//public class UserDetailsServiceImplementation  implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//            if(StringUtils.isNotEmpty(username)) {
//                User user = userRepository.findByUserNameAndIsDeleted(username, Boolean.FALSE);
//                if (!ObjectUtils.isEmpty(user)) {
//                    return org.springframework.security.core.userdetails.User.withUsername(user.getUserName()).password(user.getPassword()).build();
//                }
//            }
//            throw new UsernameNotFoundException("No user found with "+username);
//
//    }
//
//    public UserDetails validateUser(String username , String password) throws UsernameNotFoundException {
//
//        if(StringUtils.isNotEmpty(username)) {
//            User user = userRepository.findByUserNameAndIsDeleted(username, Boolean.FALSE);
//            if (!ObjectUtils.isEmpty(user)) {
//                return org.springframework.security.core.userdetails.User.withUsername(user.getUserName()).password(user.getPassword()).build();
//            }
//        }
//        throw new UsernameNotFoundException("No user found with "+username);
//
//    }
//
//
//}
