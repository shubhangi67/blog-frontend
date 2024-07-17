import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!: string;
  password!:string;
authservice = inject(AuthService);
router = inject(Router);
login()
{
  if(this.email && this.password)
  {
    this.authservice.login(this.email,this.password).subscribe(result=>{
      console.log(result);
      alert('Login successful');
      localStorage.setItem("token", result.token);
      this.router.navigateByUrl('admin/blogs');
    });
  }
  else
  {
    alert("Please enter email and password");
  }
}
}
