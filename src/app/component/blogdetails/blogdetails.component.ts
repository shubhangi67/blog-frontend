import { Component, inject } from '@angular/core';
import { BlogServiceService } from '../../blog-service.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../types/blog';
import { CategoryService } from '../../category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.scss'
})
export class BlogdetailsComponent {
  blogservice = inject(BlogServiceService)
  blog !: Blog;
  categoryservice = inject(CategoryService)
category: Category[] =[];
route = inject(ActivatedRoute)
ngOnInit()
{
  let id = this.route.snapshot.params['id'];
  console.log(id);
  this.blogservice.getBlogById(id).subscribe(result =>
  {
    this.blog = result;
  }
  )
  this.categoryservice.getAllCategory().subscribe(result =>
  {
    this.category = result;
  }
  )
}
getCategoryByName()
{
  let category = this.category.find(x => x.id === this.blog.categoryId);
  return category?.categoryName;
}}
