package hu.elte.alkfejl.alkfejl18.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Skill implements Serializable{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;	
	
	@Column(unique = true)
	@NotNull
	private String name;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "skills")
	private List<User> owners;
	
	@ManyToMany(mappedBy = "requiredSkills")
	@JsonIgnore
	private List<Task> requiredBy;
}
