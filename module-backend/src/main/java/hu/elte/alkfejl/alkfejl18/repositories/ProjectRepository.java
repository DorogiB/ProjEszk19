package hu.elte.alkfejl.alkfejl18.repositories;

import hu.elte.alkfejl.alkfejl18.entities.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {

}
