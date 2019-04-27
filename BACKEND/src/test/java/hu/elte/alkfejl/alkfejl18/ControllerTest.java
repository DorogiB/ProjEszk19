package hu.elte.alkfejl.alkfejl18;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import hu.elte.alkfejl.alkfejl18.controllers.UserController;
import hu.elte.alkfejl.alkfejl18.entities.MessageWrapper;
import hu.elte.alkfejl.alkfejl18.entities.Skill;
import hu.elte.alkfejl.alkfejl18.entities.User;
import hu.elte.alkfejl.alkfejl18.repositories.SkillRepository;
import hu.elte.alkfejl.alkfejl18.repositories.UserRepository;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@DataJpaTest
public class ControllerTest {
	
	@Mock
	private Authentication authentication;
	
	@Autowired
	private UserRepository userRepository;
    @Autowired
    private SkillRepository skillRepository;
    
	@InjectMocks
	private UserController userController;
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		userController.setUserRepository(userRepository);
		userController.setSkillRepository(skillRepository);
		userController.setPasswordEncoder(passwordEncoder);
	}
	
	@Test
	public void whenSaveEditDeleteUser_thenReturnUser() {
	    // given
		String maestroUserName = "Zidane";
	    User maestro = createUser(maestroUserName,"king", "Real");
	    User midget = createUser("meszi","low", "");
	    
	    String editedNameForMaestro = "Real Madrid";
	    User editedMaestro = createUser(maestroUserName, "king", editedNameForMaestro);
	    MessageWrapper editedMaestroWrapper = createWraperForUser(editedMaestro);
	    
	    // when
	    userRepository.save(maestro);
	    userRepository.save(midget);
	    editMaestroUser(maestroUserName, editedMaestroWrapper);
	    deleteMidgetUser(midget);
	 	 
	    // then
	    AssertUsers(maestroUserName, editedNameForMaestro);
	}
	
	@Test
	public void whenSaveEditDeleteSkill_thenReturnSkill() {
	    // given
		String maestroUserName = "Zidane";
	    User maestro = createUser(maestroUserName,"king", "Real");
	    
	    String secondSkillName = "everything";
	    Skill firstSkill = createSkill("ball control", maestro);
	    Skill secondSkill = createSkill(secondSkillName, maestro);
	    
	    // when
	    User savedMaestro = userRepository.save(maestro);
	    addSkill(firstSkill, savedMaestro);
	    userController.removeSkill(savedMaestro.getId(), createWraperForSkill(firstSkill), authentication); 	 
	    addSkill(secondSkill, savedMaestro);
	    
	    // then
	    AssertUserSkills(maestroUserName, maestro.getName(), secondSkillName);
	}


	private User createUser(String userName, String password, String name) {
		User user = new User();
		
		user.setUsername(userName);
		user.setName(name);
		user.setPassword(password);
		user.setAssignedTasks(Collections.EMPTY_LIST);
		user.setOwnedProjects(Collections.EMPTY_LIST);
		user.setProjects(Collections.EMPTY_LIST);
		List<Skill> emptySkillList = new ArrayList();
		user.setSkills(emptySkillList);
		
		return user;
	}
	
	private MessageWrapper createWraperForUser(User user) {
	    MessageWrapper userWrapper = new MessageWrapper();
	    
	    userWrapper.setName(user.getName());
	    userWrapper.setUsername(user.getUsername());
	    userWrapper.setPassword(user.getPassword());
	    
	    return userWrapper;
	}
	
	private void editMaestroUser(String maestroUserName, MessageWrapper editedMaestroWrapper) {
	    Integer maestroId = userRepository.findByUsername(maestroUserName).get().getId();
	    Mockito.when(authentication.getName()).thenReturn(maestroUserName);
	    userController.editUser(maestroId, editedMaestroWrapper, authentication);
	}
	
	private void deleteMidgetUser(User midget) {
	    String midgetUserName = midget.getUsername();
	    Integer midgetId = userRepository.findByUsername(midgetUserName).get().getId();
	    Mockito.when(authentication.getName()).thenReturn(midgetUserName);
	    userController.deleteUser(midgetId, authentication);
	}
	
	private void AssertUsers(String maestroUserName, String editedNameForMaestro) {
	    List<User> users = (List<User>) userController.getAll(authentication).getBody();
	    assertEquals(1, users.size());
	    
	    User editedMaestroUser = users.get(0);
	    assertEquals(maestroUserName, editedMaestroUser.getUsername());
	    assertEquals(editedNameForMaestro, editedMaestroUser.getName());
	}
	
	private Skill createSkill(String name, User owner) {
		Skill skill = new Skill();
		
		skill.setName(name);
		List<User> owners = new ArrayList<User>();
		owners.add(owner);
		skill.setOwners(owners);
		
		return skill;
	}
	
	private MessageWrapper createWraperForSkill(Skill skill) {
	    MessageWrapper skillWrapper = new MessageWrapper();
	    
	    skillWrapper.setName(skill.getName());
	    
	    return skillWrapper;
	}
	
	private void addSkill(Skill skill, User user) {
	    skillRepository.save(skill);
	    Mockito.when(authentication.getName()).thenReturn(user.getUsername());
	    userController.addSkill(user.getId(), createWraperForSkill(skill), authentication);
	}
	
	private void AssertUserSkills(String maestroUserName, String nameForMaestro, String skillName) {
	    List<User> users = (List<User>) userController.getAll(authentication).getBody();
	    assertEquals(1, users.size());
	    
	    User maestroUser = users.get(0);
	    assertEquals(maestroUserName, maestroUser.getUsername());
	    assertEquals(nameForMaestro, maestroUser.getName());
	    
	    List<Skill> maestroSkills = (List<Skill>) userController.getSkillList(maestroUser.getId()).getBody();
	    assertEquals(1, maestroSkills.size());

	    Skill maestroUserSkill = maestroSkills.get(0);
	    assertEquals(skillName, maestroUserSkill.getName());
	    assertEquals(maestroUserName, maestroUserSkill.getOwners().get(0).getUsername());
	}
	
}
