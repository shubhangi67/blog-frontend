import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog } from './types/blog';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
http = inject(HttpClient)
  constructor() {
  }
  getHeaders(){
    const token = localStorage.getItem("token") || "";
    if(token){
    return { headers: {
    "Authorization": `Bearer ${token}`}
    }}
    else return {}
    }

  getFeaturedBlogs()
    {
      return this.http.get<Blog[]>(environment.apiUrl+ "Blog",{
        ...this.getHeaders()
      });
    }
  getBlogById(id:string)
  {
    return this.http.get<Blog>(environment.apiUrl+"Blog/"+id);
  }
  deleteBlog(id:number)
  {
    return this.http.delete<Blog>(environment.apiUrl+"Blog/"+id);
  }
  createBlog(blog: Blog)
  {
    return this.http.post(environment.apiUrl+"Blog",blog);
  }
  updateblog(id: number,blog: Blog)
  {
    return this.http.put(environment.apiUrl+"Blog/"+id,blog);
  }
}
