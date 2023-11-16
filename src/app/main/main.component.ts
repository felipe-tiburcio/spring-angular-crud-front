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

  isButtonVisible: boolean = true;
  isTableVisible: boolean = true;

  user = new User();

  users: User[] = [];

  getUsers(): void {
    this.service.getUsers().subscribe((data) => (this.users = data));
  }

  createUser(): void {
    this.service.create(this.user).subscribe((data) => {
      this.users.push(data);
      this.user = new User();

      alert('User created!');
    });
  }

  selectUser(index: number): void {
    this.user = this.users[index];
    this.isButtonVisible = false;
    this.isTableVisible = false;
  }

  updateUser(): void {
    this.service.update(this.user).subscribe((data) => {
      const index = this.users.findIndex((obj) => {
        return obj.id === data.id;
      });

      this.users[index] = data;

      this.isButtonVisible = true;
      this.isTableVisible = true;

      alert('User updated!');

      this.user = new User();
    });
  }

  removeUser(): void {
    this.service.update(this.user).subscribe((data) => {
      const index = this.users.findIndex((obj) => {
        return obj.id === this.user.id;
      });

      this.users.splice(index, 1);

      this.isButtonVisible = true;
      this.isTableVisible = true;

      alert('User removed!');

      this.user = new User();
    });
  }
}
