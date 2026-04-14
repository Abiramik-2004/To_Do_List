package com.todo.todoapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }

        userRepo.save(user);
        return "Registered successfully";
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepo.findByEmail(user.getEmail())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .orElse(null);
    }
}