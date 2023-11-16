import { Component } from '@angular/core';
import { User } from 'src/models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private service: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  isVisible: boolean = true;

  user = new User();

  users: User[] = [];

  getUsers(): void {
    this.service.getUsers().subscribe((data) => (this.users = data));
  }

  createUser(): void {
    this.service.create(this.user).subscribe((data) => this.users.push(data));
  }
}
