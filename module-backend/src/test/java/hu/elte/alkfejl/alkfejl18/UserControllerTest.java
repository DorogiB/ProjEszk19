package hu.elte.alkfejl.alkfejl18;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.hamcrest.Matchers.*;
import org.hamcrest.core.IsNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import hu.elte.alkfejl.alkfejl18.controllers.UserController;
import hu.elte.alkfejl.alkfejl18.entities.User;
import hu.elte.alkfejl.alkfejl18.repositories.SkillRepository;
import hu.elte.alkfejl.alkfejl18.repositories.UserRepository;


@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private UserRepository userRepo;
	@MockBean
	private SkillRepository skillRepo;
	@MockBean
	private BCryptPasswordEncoder encoder;
	
	
	@Test
	@WithMockUser("admin")
	public void test_get_all() throws Exception{
		
		User a = new User();
		a.setId(1);
		a.setName("asd");
		a.setPassword("pwd");
		a.setUsername("aaa");
		User b = new User();
		b.setId(2);
		b.setName("bsd");
		b.setPassword("qwe");
		b.setUsername("bbb");
		List<User> allUsers = Arrays.asList(a,b);
		
		when(userRepo.findAll()).thenReturn(allUsers);

		mockMvc.perform(get("/users")).andExpect(status().isOk())
					.andExpect(jsonPath("$", hasSize(2)))
					.andExpect(jsonPath("$[0].name",is("asd")))
					.andExpect(jsonPath("$[0].username",is("aaa")))
					.andExpect(jsonPath("$[0].skills",is(IsNull.nullValue())))
					.andExpect(jsonPath("$[1].name",is("bsd")))
					.andExpect(jsonPath("$[1].username",is("bbb")))
					.andExpect(jsonPath("$[1].skills",is(IsNull.nullValue())));
					
	}
}
