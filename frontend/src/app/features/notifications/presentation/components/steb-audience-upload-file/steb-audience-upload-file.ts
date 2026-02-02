import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-steb-audience-upload-file',
  imports: [],
  templateUrl: './steb-audience-upload-file.html',
  styles: ``,
})
export class StebAudienceUploadFile {

  isUploaded = signal<boolean>(false);

}
