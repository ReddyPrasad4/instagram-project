//package com.instagram.configuration;
//
//import com.instagram.service.intrface.UserService;
//import jakarta.servlet.Filter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
////    @Autowired
////    private UserDetailsService userDetailsService;
//
//    @Autowired
//    private UserService userService;
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.csrf(AbstractHttpConfigurer::disable)
////                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
//                .authorizeHttpRequests(auth -> auth.requestMatchers("/api/user/register","/api/user/login/{userNameOrEmail}/{password}").permitAll()
////                        .requestMatchers("/api/post/**","/api/comment/**","/api/likes/**").authenticated())
//                        .anyRequest().authenticated());
////                .formLogin(Customizer.withDefaults())
////                .httpBasic(Customizer.withDefaults()).
//        httpSecurity.addFilterBefore((Filter) userService, BasicAuthenticationFilter.class);
//        return httpSecurity.build();
//    }
//
//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
////    @Bean
////    CorsConfigurationSource corsConfigurationSource() {
////        CorsConfiguration configuration = new CorsConfiguration();
////        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
////        configuration.setAllowedMethods(List.of("DELETE", "GET", "POST", "PATCH", "PUT"));
////        configuration.setAllowCredentials(true);
////        configuration.addAllowedHeader("*");
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        source.registerCorsConfiguration("/**", configuration);
////        return source;
////    }
//}
