import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';
import { BlogServiceService } from '../../../blog-service.service';
import { Blog } from '../../../types/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatCheckboxModule,MatButtonModule,MatSelectModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent {
formbuilder = inject(FormBuilder)
blogForm = this.formbuilder.group(
  {
    id:[null],
    categoryId:[null,Validators.required],
    title: ['',Validators.required],
    description: ['',],
    content: ['',],
    image: ['',],
    isfeatured:[false],
  }
)
selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
categoryService = inject(CategoryService);
categoryList : Category[] =[];
blogService = inject(BlogServiceService);
router = inject(Router);
route = inject(ActivatedRoute);
isEdit = false;
ngOnInit()
{
    let id = this.route.snapshot.params['id'];
    console.log(id)
    if(id)
    {
      this.isEdit = true;
      this.blogService.getBlogById(id).subscribe((result)=>{
        console.log(result);
        this.blogForm.patchValue(result as any);
      })
    }
    this.categoryService.getAllCategory().subscribe((result)=>{
    this.categoryList = result;
  })

}
onCreateBlog() {
    if (this.blogForm.valid) {
      let model: any = this.blogForm.value;
      this.blogService.createBlog(model).subscribe({
        next: (response) => {
          console.log('Success:', response); // Log the successful response
          alert("Blog Created Successfully");
          this.router.navigateByUrl("/admin/blogs");
        },
        error: (error: HttpErrorResponse) => {
          console.error('There was an error!', error);
          console.log('Error response body:', error.error); // Log the response body
          alert('Failed to create blog. Please try again.');
        }
      });
    }
  }
onUpdateBlog() {
  if (this.blogForm.valid) {
    let model: any = this.blogForm.value;
    this.blogService.updateblog(this.blogForm.value.id!,model).subscribe({
      next: (response) => {
        console.log('Success:', response); // Log the successful response
        alert("Blog Updated Successfuly");
        this.router.navigateByUrl("/admin/blogs");
      },
      error: (error: HttpErrorResponse) => {
        console.error('There was an error!', error);
        console.log('Error response body:', error.error); // Log the response body
        alert('Failed to create blog. Please try again.');
      }
    });
  }
}
}

