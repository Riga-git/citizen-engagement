import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  { UsersDataSource } from '../../models/users-data-source';
import { User } from '../../models/user';
import { UserService } from 'src/app/api/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  name : string;
  description : string;
  dataSource: UsersDataSource;
  displayedColumns: string[] = ['Name','Roles','MakeStaf'];
  itemsPerPage : Number;
  usersList : User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) Table: MatTable<any>;

  constructor(private issueService : IssueService, 
    private userServce: UserService, 
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.userServce);
    this.dataSource.loadUsers();
    this.dataSource.usersList$.subscribe({
      next: (usersList) => this.usersList = usersList
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe({
          next : () => this.dataSource.loadUsers(this.paginator.pageIndex+1, this.paginator.pageSize)
  })
}

  addNewType(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
       this.issueService.addNewType(this.name, this.description).subscribe({
        next : () => this.snackBar.open('Type added with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}),
        error : (error) => this.snackBar.open('Sorry we were unable to add the issue type. Detail : '+ error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
       });
    }
  }

  makeUserStaff(userId : string){
    this.userServce.makeUserStaff(userId).subscribe({
      next : (user) => this.usersList.forEach(element => {element['id']===user.id ? this.usersList['id']=}),
      error : (error) => this.snackBar.open(error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
    })
  }

}
