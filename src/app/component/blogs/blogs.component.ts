import { Component, inject } from '@angular/core';
import { BlogcardsComponent } from '../blogcards/blogcards.component';
import { BlogServiceService } from '../../blog-service.service';
import { Blog } from '../../types/blog';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogcardsComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogservie = inject(BlogServiceService)
  allBlogs! : Blog[]
  ngOnInit()
  {
    this.blogservie.getFeaturedBlogs().subscribe(result => {
      this.allBlogs = result;
      console.log(this.allBlogs)
    })
  }
}
