import { Component, Input } from '@angular/core';
import { DefaultApi } from '@oninet/generated/account';
import { SnackService } from '@oninet/ui/common';

@Component({
  selector: 'oninet-download-button',
  templateUrl: './download-button.component.html',
})
export class DownloadButtonComponent {
  @Input() key: string;

  constructor(private api: DefaultApi, private snackBar: SnackService) { }

  async download() {
    try {
      const { url } = (await this.api.fileControllerDownload(this.key)).data;
      if (url) {
        window.location.href = url;
      } else {
        this.snackBar.oops();
      }
    } catch (error: any) {
      this.snackBar.oops();
    }
  }
}
