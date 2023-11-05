// create-note.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent {
  noteTitle: string = '';
  noteDescription: string = '';
  noteStatusMessage: string = ''
  noteAdded: boolean = false


  constructor(private dialogRef: MatDialogRef<CreateNoteComponent>, private notesService: NotesService) { }

  createNote() {
    const noteData = {
      title: this.noteTitle,
      desc: this.noteDescription,
    };

    this.notesService.addNote(noteData).subscribe(response => {
      if (response) {
        this.noteStatusMessage = 'Note Added Successfully'
        this.noteAdded = true
        this.dialogRef.close();
      }
    }, error => {
      console.log('error---------', error);

      this.noteStatusMessage = 'Failed while creating new note. Please try again.'
    });
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
