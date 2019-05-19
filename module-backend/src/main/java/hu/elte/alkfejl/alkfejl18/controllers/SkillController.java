package hu.elte.alkfejl.alkfejl18.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.elte.alkfejl.alkfejl18.repositories.*;
import hu.elte.alkfejl.alkfejl18.entities.*;

@CrossOrigin
@RestController
@RequestMapping("/skills")
public class SkillController {
	@Autowired
	private SkillRepository skillRepository;
	
	@GetMapping("")
	public ResponseEntity<Iterable<Skill>> getAll(){
		Iterable<Skill> skills = skillRepository.findAll();
		return ResponseEntity.ok(skills);
	}
	
	@PostMapping("/new")
	public ResponseEntity<Skill> createSkill(@RequestBody MessageWrapper skill){
		Optional<Skill> oSkill = skillRepository.findByName(skill.getName());
		if(oSkill.isPresent()){
			return ResponseEntity.badRequest().build();
		}
		Skill newSkill = new Skill(null,skill.getName(), new ArrayList<User>(), new ArrayList<Task>());
		return ResponseEntity.ok(skillRepository.save(newSkill));
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Skill> getSkill(@PathVariable Integer id) {
        Optional<Skill> oSkill = skillRepository.findById(id);
        if (!oSkill.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oSkill.get());
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteSkill(@PathVariable Integer id) {
        Optional<Skill> oSkill = skillRepository.findById(id);
        if (!oSkill.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        if(!oSkill.get().getOwners().isEmpty()){
        	return ResponseEntity.badRequest().body("Skill can't be deleted since it is added to a user");
        }
        skillRepository.delete(oSkill.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/edit/{id}")
    public ResponseEntity<Skill> put(@PathVariable Integer id, @RequestBody Skill skill) {
        Optional<Skill> oSkill = skillRepository.findById(id);
        if (!oSkill.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        skill.setId(id);
        return ResponseEntity.ok(skillRepository.save(skill));
    }
}
