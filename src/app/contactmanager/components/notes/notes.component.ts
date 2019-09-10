import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() notes : Note[];
  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource : MatTableDataSource<Note>;


  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

}
