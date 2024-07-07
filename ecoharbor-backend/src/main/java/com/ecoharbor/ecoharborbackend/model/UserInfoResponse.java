package com.ecoharbor.ecoharborbackend.model;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserInfoResponse {
    private Long id;
    private String username;
    private Collection<GrantedAuthority> roles;
    private String token;

    public UserInfoResponse(Long id, String username,
                            Collection<GrantedAuthority> roles, String token) {
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection<GrantedAuthority> getRoles() {
        return roles;
    }
}
