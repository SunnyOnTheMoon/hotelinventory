import { ResolveFn } from '@angular/router';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { inject } from '@angular/core';

export const commentGuard: ResolveFn<Comment[]> = (route, state) => {
  // Add your logic here
  const commentService = inject(CommentService);
  return commentService.getComments();
};
