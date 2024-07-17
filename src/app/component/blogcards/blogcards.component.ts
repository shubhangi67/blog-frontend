import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../types/blog';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';
import { BlogServiceService } from '../../blog-service.service';

@Component({
  selector: 'app-blogcards',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,RouterLink],
  templateUrl: './blogcards.component.html',
  styleUrl: './blogcards.component.scss'
})
export class BlogcardsComponent {
@Input() item!: Blog;
blogservice = inject(BlogServiceService)
blog !: Blog;
categoryservice = inject(CategoryService)
category: Category[] =[];
route = inject(ActivatedRoute)
ngOnInit()
{
  this.categoryservice.getAllCategory().subscribe(result =>
  {
    this.category = result;
  }
  )
}
getCategoryByName()
{
  let category = this.category.find(x => x.id === this.blog?.categoryId);
  return category?.categoryName;
}}

