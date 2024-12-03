package com.instagram.repository;

import com.instagram.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

//    @Query(value = "select * from post where is_deleted=0" , nativeQuery = true)
    @Query(value = "select p.* from post p , user u where p.is_deleted = :isPostDeleted and u.is_deleted = :isUserDeleted and p.user_id=u.id order by p.updated_at desc" ,nativeQuery = true)
    List<Post> findByIsDeletedAndUserIsDeleted(@Param("isPostDeleted") Boolean isPostDeleted, @Param("isUserDeleted") Boolean isUserDeleted);

    List<Post> findByUserIdAndIsDeleted(UUID userId, Boolean isDeleted);

    Post findByIdAndIsDeleted(UUID postId, Boolean aFalse);

    @Query(value = "select p.* from post p , user u where p.is_deleted = :isPostDeleted and u.user_name = :userName and p.user_id=u.id order by p.updated_at desc" ,nativeQuery = true)
    List<Post> findByUserUserNameAndIsDeleted(@Param("userName") String userName,@Param("isPostDeleted") Boolean isPostDeleted);
}
