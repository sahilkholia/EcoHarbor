package com.ecoharbor.ecoharborbackend.controller;

import com.ecoharbor.ecoharborbackend.model.LoginDto;
import com.ecoharbor.ecoharborbackend.model.Role;
import com.ecoharbor.ecoharborbackend.model.SignUpDto;
import com.ecoharbor.ecoharborbackend.model.User;
import com.ecoharbor.ecoharborbackend.repository.RoleRepository;
import com.ecoharbor.ecoharborbackend.repository.UserRepository;
import com.ecoharbor.ecoharborbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;



    @PostMapping("/api/auth/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginDto user){
        System.out.println("Inside controller");
        System.out.println(user.getUsername()+" "+user.getPassword());
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        System.out.println("token: "+token);
        Authentication authentication = authenticationManager.authenticate(token);
        System.out.println("step 2 reached");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){

        // add check for username exists in a DB
        if(userRepository.existsByUsername(signUpDto.getUsername())){
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }


        // create user object
        User user = new User();
        user.setUsername(signUpDto.getUsername());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

        Role roles = roleRepository.findByName("ROLE_ADMIN").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);

    }


    @PostMapping("/api/auth/test")
    public ResponseEntity<String> test(@RequestBody String s){
        System.out.println("test");
        return ResponseEntity.ok("Test Successful");
    }

    @GetMapping("/loggedintest")
    public ResponseEntity<String> loggedInTest(){
        return ResponseEntity.ok("Logged in Successfully");
    }
}
