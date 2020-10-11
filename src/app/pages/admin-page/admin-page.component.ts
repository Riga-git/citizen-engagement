import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import  { UsersDataSource } from '../../dataSources/users-data-source';
import { User } from '../../models/user';
import { UserService } from 'src/app/api/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { findIndex } from 'lodash';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  dataSource: UsersDataSource;
  displayedColumns: string[] = ['Name','Roles','MakeStaf'];
  usersList : User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) Table: MatTable<unknown>;

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
       this.issueService.addNewType(form.controls['Name'].value, form.controls['Description'].value).subscribe({
        next : () => {this.snackBar.open('Type added with succes','',
                                        {panelClass : 'SnackBarSuccess', duration : 2500});
                      form.resetForm();},
        error : (error) => this.snackBar.open('Sorry we were unable to add the issue type. Detail : '+ error.message, 
                                              'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
       });
    }
  }

  makeUserStaff(userId : string){
    this.userServce.makeUserStaff(userId).subscribe({
      next : (user) => {this.usersList[findIndex(this.usersList,['id', userId])].roles = user.roles},
      error : (error) => this.snackBar.open(error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
    })
  }

}
