import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

import { Post } from '../../models/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Post> = new EventEmitter(); // Defining the newPost
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post; //Now bind with form-html through ngModel
  @Input() isEdit: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  addPost(title, body) {
    if (!title || !body) {
      alert("Please add post");
    } else {
      this.postService.savePost({ title, body } as Post).subscribe(post => {//savePost is service
        this.newPost.emit(post);  //newPost pass down to post-form HTML
      })
    }
  }

  updatePost() {
    this.postService.updatePost(this.currentPost).subscribe(post => { //updatePost is service
      console.log(post);
      this.isEdit = false; //Back to normal (Black Btn)
      this.updatedPost.emit(post);   //Toggle function
    })
  }

}

/*
1. EventEmitter => Transmit (post) event from this (post-form) component,
                        to other (posts) component.
2. Output => Transmit data from here to other component
3. Input => Receive data from other component
*/
