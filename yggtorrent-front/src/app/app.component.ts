import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @HostBinding('style.height') cssHeight = '100vh';
  @HostBinding('style.width') cssWidth = '100vw';
  @HostBinding('style.display') cssDisplay = 'flex';
}
