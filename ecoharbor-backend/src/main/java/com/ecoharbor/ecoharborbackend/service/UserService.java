package com.ecoharbor.ecoharborbackend.service;

import com.ecoharbor.ecoharborbackend.model.User;
import com.ecoharbor.ecoharborbackend.repository.UserRepository;
import com.ecoharbor.ecoharborbackend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        return UserDetailsImpl.build(user);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

}
