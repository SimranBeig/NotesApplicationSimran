import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  searchWord: string = ''

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      this.http.get('http://localhost:5362/api/note/notes', { headers })
        .subscribe(
          (response: any) => {
            console.log('reponse', response);

            this.notes = response;
          },
          (error) => {
            console.error('Error fetching notes:', error);
          }
        );
    } else {
      console.error('Token not found. Please authenticate and obtain a token.');
    }
  }


  addNote() {
    const dialogRef = this.dialog.open(CreateNoteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (token) {
        const headers = new HttpHeaders().set('Authorization', token);
        this.http.get('http://localhost:5362/api/note/notes', { headers })
          .subscribe(
            (response: any) => {
              console.log('reponse', response);

              this.notes = response;
            },
            (error) => {
              console.error('Error fetching notes:', error);
            }
          );
      } else {
        console.error('Token not found. Please authenticate and obtain a token.');
      }
    });
  }



  editNote(note: any) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '400px',
      data: note, // Pass the note object to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the edited note here
      }
    });
  }

  deleteNote(noteId: number) {
    window.alert(`Delete Note ${noteId}`); // Replace with your delete note implementation
  }

  filterNotes() {
    return this.notes.filter((note) => {
      const title = note?.title?.toLowerCase();
      const description = note?.description?.toLowerCase();
      const term = this.searchWord.toLowerCase();
      return title?.includes(term) || description?.includes(term);
    });
  }
}