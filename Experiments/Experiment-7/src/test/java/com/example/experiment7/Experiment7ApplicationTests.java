package com.example.experiment7;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class Experiment7ApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoads() {
    }

    @Test
    public void testPublicEndpointAccessWithoutAuth() throws Exception {
        mockMvc.perform(get("/api/public/hello"))
                .andExpect(status().isOk());
    }

    @Test
    public void testUserCanAccessUserEndpoint() throws Exception {
        mockMvc.perform(get("/api/user/profile")
                    .with(httpBasic("user1", "user123")))
                .andExpect(status().isOk());
    }

    @Test
    public void testUserCannotAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                    .with(httpBasic("user1", "user123")))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testAdminCanAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                    .with(httpBasic("admin1", "admin123")))
                .andExpect(status().isOk());
    }

    @Test
    public void testAdminCanAccessUserEndpoint() throws Exception {
        mockMvc.perform(get("/api/user/profile")
                    .with(httpBasic("admin1", "admin123")))
                .andExpect(status().isOk());
    }

    @Test
    public void testAccessWithoutAuthenticationFails() throws Exception {
        mockMvc.perform(get("/api/user/profile"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testInvalidCredentialsFail() throws Exception {
        mockMvc.perform(get("/api/user/profile")
                    .with(httpBasic("user1", "wrongpassword")))
                .andExpect(status().isUnauthorized());
    }
}
