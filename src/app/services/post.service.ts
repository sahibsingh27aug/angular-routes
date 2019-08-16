import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';

const httpOptions = { //Content type
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class PostService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {  //Get all posts, therefore array[]
    return this.http.get<Post[]>(this.postsUrl);  //http.get => GET
  }

  savePost(post: Post): Observable<Post> {  //Save single post, therefore no array
    return this.http.post<Post>(this.postsUrl, post, httpOptions);  //http.post => POST
  }

  updatePost(post: Post): Observable<Post> {  //Update single post, therefore no array
    const url = `${this.postsUrl}/${post.id}`;  // url = postUrl + id

    return this.http.put<Post>(url, post, httpOptions);
  }

  getPost(id: number): Observable<Post> {  //Update single post, therefore no array
    const url = `${this.postsUrl}/${id}`;  // url = postUrl + id

    return this.http.get<Post>(url);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post == 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions);
  }
}
