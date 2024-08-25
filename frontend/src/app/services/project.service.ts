import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.prod';
import { HttpClient } from '@angular/common/http';

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
  // image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`; // Use apiUrl from environment

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}

