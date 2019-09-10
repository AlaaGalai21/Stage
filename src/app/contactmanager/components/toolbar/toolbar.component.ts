import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  @Output() toggleTheme = new EventEmitter();


  constructor(private dialog : MatDialog,private _snackBar: MatSnackBar, private router : Router) { }

  ngOnInit() {
  }
  openAddContactDialog() : void{
    let dialogRef = this.dialog.open(NewContactDialogComponent, {

      width : '500 px'
    });
    dialogRef.afterClosed().subscribe(result =>{

      console.log('The Dialoge Was Closed ', result);
      if(result){
        this.openSnackBar("Contact Added", "Navigate").onAction().subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
        });
      }
    });

  }
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>  {
    return this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
