import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { Project, ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectService: ProjectService){};

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    })
  };

}
