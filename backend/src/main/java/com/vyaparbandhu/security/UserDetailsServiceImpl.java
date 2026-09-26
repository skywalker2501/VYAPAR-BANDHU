package com.vyaparbandhu.security;

import com.vyaparbandhu.domain.user.UserEntity;
import com.vyaparbandhu.domain.user.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with phone: " + phoneNumber));

        return User.builder()
                .username(user.getPhoneNumber())
                .password(user.getPasswordHash()) // e.g., bcrypt hash of the OTP or a real password
                .roles(user.getRole())
                .build();
    }
}
