package hu.elte.alkfejl.alkfejl18.entities;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
public class Task implements Serializable{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	@Column
	@NotNull
	private String name;
	

	@ManyToMany
	@JoinTable
	private List<Skill> requiredSkills; 
	
	@JoinColumn
	@NotNull
	@ManyToMany
	private List<User> assignees;
	

	@ManyToMany
	@JoinTable
	private List<Task> prerequisites;
	

	@ManyToMany(mappedBy = "prerequisites")
	@JsonIgnore
	private List<Task> requiredBy;
	
	@Column
	@NotNull
	private Boolean complete;
	
	@Column
	private LocalDateTime startTime;
	
	@Column 
	private LocalDateTime completionTime;
	
	@Column
	private String completedBy;
	
	@Column
	@NotNull
	private Boolean isOpen;
	
	@JoinColumn
	@ManyToOne
	private Project project; 
}
