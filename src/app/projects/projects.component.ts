import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

}
