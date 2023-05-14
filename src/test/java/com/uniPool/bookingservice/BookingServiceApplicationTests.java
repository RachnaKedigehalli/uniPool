package com.uniPool.bookingservice;

import com.uniPool.bookingservice.service.BookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.junit.jupiter.api.*;
import org.json.JSONObject;
import java.util.Date;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class BookingServiceApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private BookingService bookingService;

	@BeforeEach
	void clearAndCreateDummy() throws Exception{
		bookingService.deleteAll();

		JSONObject obj = new JSONObject();
		Date date = new Date();
		obj.put("creatorUserId", "15");
		obj.put("source", "A");
		obj.put("destination", "B");
		obj.put("setTime", date.toInstant().toString());
		obj.put("startTime", date.toInstant().toString());
		obj.put("endTime", date.toInstant().toString());

		this.mockMvc.perform(
						post("/bookings/")
						.contentType(MediaType.APPLICATION_JSON)
						.content(obj.toString())
						.accept(MediaType.APPLICATION_JSON)
					)
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.source").value("A"))
					.andExpect(jsonPath("$.destination").value("B"));
	}

	@Test 
	void testAddBooking() throws Exception{
		JSONObject obj = new JSONObject();
		Date date = new Date();
		obj.put("creatorUserId", "15");
		obj.put("source", "Bengaluru");
		obj.put("destination", "Hyderabad");
		obj.put("setTime", date.toInstant().toString());
		obj.put("startTime", date.toInstant().toString());
		obj.put("endTime", date.toInstant().toString());

		this.mockMvc.perform(
						post("/bookings/")
						.contentType(MediaType.APPLICATION_JSON)
						.content(obj.toString())
						.accept(MediaType.APPLICATION_JSON)
					)
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.source").value("Bengaluru"))
					.andExpect(jsonPath("$.destination").value("Hyderabad"));
	}
	
	@Test
	void testGetBookingsOfUser() throws Exception {
		this.mockMvc.perform(
				get("/bookings/user/15")
			)
			.andDo(print())
			.andExpect(status().isOk())
			.andExpect(content().string(containsString("15")));
	}

	@AfterEach
	void clear() {
		bookingService.deleteAll();
	}

}
