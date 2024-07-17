import { Component, inject } from '@angular/core';
import { BlogServiceService } from '../../blog-service.service';
import { Blog } from '../../types/blog';
import { RouterLink } from '@angular/router';
import { BlogcardsComponent } from '../blogcards/blogcards.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, BlogcardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
blogservie = inject(BlogServiceService)
featuredblogs! : Blog[]
ngOnInit()
{
  this.blogservie.getFeaturedBlogs().subscribe(result => {
    this.featuredblogs = result;
    console.log(this.featuredblogs)
  })
}
}
