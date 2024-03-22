package main.java.com.clippers.backend; 

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/Arizona_Illinois_Legislative_Districts")
    public String helloWorld() {
        return "Hello, World!";
    }
}
