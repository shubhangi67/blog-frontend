import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Blog } from '../../../types/blog';
import { BlogServiceService } from '../../../blog-service.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-manage-blogs',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './manageblogs.component.html',
  styleUrls: ['./manageblogs.component.scss'] // Corrected from styleUrl to styleUrls
})
export class ManageblogsComponent implements AfterViewInit {
  displayedColumns: string[] = ['Title', 'CategoryId', 'action'];
  dataSource: MatTableDataSource<Blog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  blogService = inject(BlogServiceService);
  categories = inject(CategoryService);
  allBlogs: Blog[] = [];
  category: Category[] =[];
  constructor() {
    this.dataSource = new MatTableDataSource(this.allBlogs);
  }

  ngOnInit() {
    this.blogService.getFeaturedBlogs().subscribe((result) => {
      this.allBlogs = result;
      this.dataSource.data = this.allBlogs; // Correctly assign data to dataSource
      console.log(this.allBlogs);
    });
    this.categories.getAllCategory().subscribe((result) => {
      this.category = result;
      // this.dataSource.data = this.category; // Correctly assign data to dataSource
      // console.log(this.allBlogs);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCategoryName(row:Blog)
  {
    let cat = this.category.find(c=>c.id==row?.categoryId);
    return cat?.categoryName;
  }
  delete(data:Blog)
  {
      console.log(data.id);
      this.blogService.deleteBlog(data.id).subscribe(()=>{})
      this.dataSource.data = this.allBlogs.filter(x => x.id != data.id);
  }
}
