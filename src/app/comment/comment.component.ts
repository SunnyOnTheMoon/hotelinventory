import { Component } from '@angular/core';
import { CommentService } from './comment.service';
import { Comment } from './comment';
import { map, Observable, pluck } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  comments$?: Observable<Comment[]>;

  comment$?: Observable<Comment[]>;

  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute) {
    this.comments$ = this.commentService.getComments();
    this.comment$ = this.activatedRoute.data.pipe(pluck('comments'));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => this.comments = data['comments']);
  }
}
