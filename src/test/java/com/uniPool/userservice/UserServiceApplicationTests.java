package com.uniPool.userservice;

import com.uniPool.userservice.controller.UserController;
import org.junit.jupiter.api.*;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;

import com.uniPool.userservice.service.UserService;
import com.uniPool.userservice.entity.User;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Assert;

import static org.hamcrest.Matchers.containsString;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest
class UserServiceApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
    private UserService userService;

	@BeforeEach
	void clearAndCreateDummy() {
		userService.deleteAll();
		User user = new User();
		user.setEmail("user1@gmail.com");
		user.setPassword("1234");
		userService.register(user);
	}

	@AfterEach
	void clear() {
		userService.deleteAll();
	}


	@Test
	public void testGetAllUsers() throws Exception{

		this.mockMvc.perform(
						get("/users/all"))
				.andDo(print())
				.andExpect(status().isOk()
				);
	}

	@Test
	public void testRegister() throws Exception {
		this.mockMvc.perform(
						post("/users/register")
								.contentType(MediaType.APPLICATION_JSON)
								.content("{ \"email\": \"user2@gmail.com\", \"password\": \"blahh\" }")
								.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.email").value("user2@gmail.com"));
	}

	@Test
	public void testLogin() throws Exception {
		this.mockMvc.perform(
						post("/users/login")
								.contentType(MediaType.APPLICATION_JSON)
								.content("{ \"email\": \"user1@gmail.com\", \"password\": \"1234\" }")
								.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.email").value("user1@gmail.com"));
	}
//	@Test
//	void testRegisterService() {
//		User user = new User();
//		user.setEmail("abc@gmail.com");
//		user.setPassword("cyasugcd");
//		Assert.notNull(userService.register(user), "returned NULL");
//
//		user.setEmail("user1@gmail.com");
//		user.setPassword("cyasugcd");
//		Assertions.assertThrows(RuntimeException.class, () -> userService.register(user), "user should not get registered");
//	}

//	@Test
//	void testLogin() {
//		User user = new User();
//		user.setEmail("user1@gmail.com");
//		user.setPassword("1234");
//		User loggedInUser = userService.login(user);
//		Assertions.assertEquals(loggedInUser.getEmail(), user.getEmail());
//	}

}
