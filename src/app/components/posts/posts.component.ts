import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  currentPost: Post = {
    id: 0,
    title: '',
    body: ''
  }
  isEdit: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  onNewPost(post: Post) { //Comming from post-form component through onNewPost (declared in this.html)
    this.posts.unshift(post);
  }

  editPost(post: Post) {
    this.currentPost = post;  //currentPost passes to post-form component
    this.isEdit = true;   //isEdit passes to post-form component // back-to-black
  }

  onUpdatedPost(post: Post) {
    this.posts.forEach((cur, index) => {
      if (post.id === cur.id) { // If post (old) === post (new)
        this.posts.splice(index, 1);  //Delete cur post, (old post)
        this.posts.unshift(post); //Add (new post)
        this.isEdit = false;  // back-to-yellow
        this.currentPost = {
          id: 0,
          title: '',
          body: ''
        }
      }
    });
  }

  removePost(post: Post) {
    if (confirm("Are you sure?")) {
      this.postService.removePost(post.id).subscribe(() => {
        this.posts.forEach((cur, index) => {
          if (post.id === cur.id) { // If post (old) === post (new)
            this.posts.splice(index, 1);  //Delete cur post, (old post)
          }
        });
      })
    }
  }

}
