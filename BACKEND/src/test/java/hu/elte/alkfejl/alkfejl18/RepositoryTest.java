package hu.elte.alkfejl.alkfejl18;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import hu.elte.alkfejl.alkfejl18.entities.Skill;
import hu.elte.alkfejl.alkfejl18.entities.User;
import hu.elte.alkfejl.alkfejl18.repositories.SkillRepository;
import hu.elte.alkfejl.alkfejl18.repositories.UserRepository;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@DataJpaTest
public class RepositoryTest {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SkillRepository skillRepository;
	
	@Test
	public void whenFindByUserName_thenReturnUser() {
	    // given
		String userName = "alex";
		String passWord = "almafa12";
	    User user = new User();
	    user.setUsername(userName);
	    user.setPassword(passWord);
	    // when
	    userRepository.save(user);
	 	 
	    // then
	    User savedUser = userRepository.findByUsername(userName).get();
	    assertEquals(savedUser.getName(), user.getName());
	}
	
	@Test
	public void whenFindByName_thenReturnSkill() {
	    // given
		String name = "very_fancy_skill";
	    Skill skill = new Skill();
	    skill.setName(name);
	
	    // when
	    skillRepository.save(skill);
	 	 
	    // then
	    Skill savedSkill = skillRepository.findByName(name).get();
	    assertEquals(savedSkill.getName(), savedSkill.getName());
	}
	
}
