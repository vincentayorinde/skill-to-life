import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NsTopLoaderComponent } from 'ui';

@Component({
  imports: [RouterOutlet, NsTopLoaderComponent],
  selector: 'app-root',
  template: `
    <ns-top-loader />
    <router-outlet />
  `,
})
export class App {}
