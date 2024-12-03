package com.instagram.controller;

import com.instagram.dto.BaseResponseDTO;
import com.instagram.dto.PostDTO;
import com.instagram.service.intrface.PostService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

import java.util.List;
import java.util.UUID;


@CrossOrigin
@RestController
@RequestMapping("/api/post")
@SecurityRequirement(name = "userName")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/save-post/{userName}")
    public ResponseEntity<BaseResponseDTO> savePostByUserId(@RequestBody PostDTO postDTO, @PathVariable String userName){
        return postService.savePostByUserName(postDTO,userName);
    }

    @GetMapping("/get-all-posts")
    public ResponseEntity<List<PostDTO>> getAllPosts(){
        return postService.getAllPosts();
    }
    @GetMapping("/get-post-by-id/{postId}")
    public ResponseEntity<PostDTO> fetchPostById(@PathVariable UUID postId){
        return postService.getPostById(postId);
    }
    @GetMapping("/get-all-posts-by-user-name/{userName}")
    public ResponseEntity<List<PostDTO>> getAllPostByUserId(@PathVariable String userName){
        return postService.getAllPostByUserName(userName);
    }
    @PutMapping("/update-post")
    public ResponseEntity<BaseResponseDTO> updatePost(@RequestBody PostDTO postDTO){
        return postService.updatePost(postDTO);
    }

    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<BaseResponseDTO> deletePost(@PathVariable UUID postId){
        return postService.deletePost(postId);
    }

}
