//package com.instagram.service.implementation;
//
//import com.instagram.entity.User;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationServiceException;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.BeanPropertyBindingResult;
//import org.springframework.validation.Errors;
//
//
//public class UsernamePasswordLoginAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//
//    public UsernamePasswordLoginAuthenticationFilter (AuthenticationManager authenticationManager) {
//        super(authenticationManager);
//    }
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request,HttpServletResponse response) throws AuthenticationException {
//
//        User login = new User();
//        login.setUserName(request.getParameter("userName"));
//        login.setPassword(request.getParameter("password"));
//        Errors errors = new BeanPropertyBindingResult(login, "login");
//        if(errors.hasErrors()) {
//            throw new AuthenticationServiceException("Authentication Validation Failure");
//        }
//        return super.attemptAuthentication(request, response);
//    }
//}
