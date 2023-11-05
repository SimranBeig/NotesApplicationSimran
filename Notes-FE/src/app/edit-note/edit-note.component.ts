import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {
  editedNote: any;
  noteStatusMessage: string = ''
  noteUpdated: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditNoteComponent>, public notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log({ ...data });

    this.editedNote = { ...data };
  }


  saveChanges() {
    const noteData = {
      title: this.editedNote.title,
      desc: this.editedNote.description,
    };

    this.notesService.editNote(this.editedNote.id, noteData).subscribe(response => {
      if (response) {
        this.noteStatusMessage = 'Note Added Successfully'
        this.noteUpdated = true
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