import { Component } from '@angular/core';

import { HOME_LAB } from './home.copy';

/** "Lab project" band for PetWorld: secondary to the services, plain link to a static page. */
@Component({
  selector: 'app-lab-band',
  templateUrl: './lab-band.html',
})
export class LabBand {
  protected readonly lab = HOME_LAB;
}
