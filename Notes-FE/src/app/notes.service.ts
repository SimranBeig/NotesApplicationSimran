// notes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:5362/api/note';

  constructor(private http: HttpClient) { }

  addNote(noteData: any): Observable<any> {
    const token = localStorage.getItem('token')
    if (token) {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.http.post(`${this.apiUrl}/note`, noteData, { headers });
    }
    return new Observable((observer) => {
      observer.error('Authorization token not found');
      observer.next(null);
      observer.complete();
    });
  }

  editNote(noteId: number, updatedNoteData: any): Observable<any> {
    console.log(noteId, updatedNoteData);

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', token);

    if (token) {
      return this.http.put(`${this.apiUrl}/note?note_id=${noteId}`, updatedNoteData, { headers });
    }
    return new Observable((observer) => {
      observer.error('Authorization token not found');
      observer.next(null);
      observer.complete();
    });
  }

  deleteNote(noteId: number): Observable<any> {
    const token = localStorage.getItem('token')
    if (token) {
      return this.http.delete(`${this.apiUrl}/note/${noteId}`);
    }
    return new Observable((observer) => {
      observer.error('Authorization token not found');
      observer.next(null);
      observer.complete();
    });
  }
}
