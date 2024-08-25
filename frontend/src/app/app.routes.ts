import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';

const url = "https://anjali-portfolio-frontend.onrender.com/";

export const routes: Routes = [
    { path: url, component: HomeComponent },
    { path: url + "about", component: AboutComponent },
    { path: url + "projects", component: ProjectsComponent },
];


