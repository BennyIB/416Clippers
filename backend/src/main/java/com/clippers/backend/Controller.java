package main.java.com.clippers.backend;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
public class MyController {

    @GetMapping("/Arizona_Illinois_Legislative_Districts")
    public String getJson() throws IOException {
        // Load the JSON file from the resources directory
        ClassPathResource resource = new ClassPathResource("Arizona_Illinois_Boundary.json");
        // Read the content of the JSON file
        String jsonContent = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        // Return the content as the response
        return jsonContent;
    }
}
