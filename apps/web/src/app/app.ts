import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NsAppShellComponent,
  NsBadgeComponent,
  NsButtonComponent,
  NsCardComponent,
  NsProgressComponent,
} from 'ui';

@Component({
  imports: [
    RouterModule,
    NsAppShellComponent,
    NsBadgeComponent,
    NsButtonComponent,
    NsCardComponent,
    NsProgressComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'NextSkill';
  protected readonly shellLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Assessment', href: '#assessment' },
    { label: 'Roadmaps', href: '#roadmaps' },
    { label: 'Open Source', href: '#open-source' },
    { label: 'Releases', href: '#releases' },
  ];
}
