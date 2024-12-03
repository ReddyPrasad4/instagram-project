package com.instagram.repository;

import com.instagram.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User , UUID> {

    User findByIdAndIsDeleted(UUID userId , Boolean isDeleted);

    @Query(value = "select * from user where is_deleted= 0" , nativeQuery = true)
    List<User> findAllUsersAndNotDeleted();

    User findByUserNameAndIsDeleted(String userName, Boolean isDeleted);

    @Query(value = "SELECT * FROM User  WHERE (BINARY user_name = ?1 OR email = ?2) AND BINARY password = ?3 AND is_deleted=false" ,nativeQuery = true)
    User    findByUserNameOrEmailAndPassword( String userName,String email,String password);

    List<User> findByUserNameOrEmailAndIsDeleted(String userName, String email, Boolean aFalse);

    @Query(value = "select * from user where user_name like %?1% and is_deleted=false", nativeQuery = true)
    List<User> findMatchedUser(String userName);
}
