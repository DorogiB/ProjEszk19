package hu.elte.alkfejl.alkfejl18.repositories;

import hu.elte.alkfejl.alkfejl18.entities.User;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	 public Optional<User> findByUsername(String username);
	 
}


