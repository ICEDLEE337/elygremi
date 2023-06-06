import { Component, EventEmitter, Input, Output } from '@angular/core';
// const illegals = /(\.[^/.]+$)/g;
// const spaces = /[^-_\w\d]/g;

@Component({
  selector: 'oninet-file-upload',
  templateUrl: 'file-upload.component.html',
  styles: [
    `
      .file-input {
        display: none;
      }
    `,
  ],
})
export class FileUploadComponent {
  @Input() extensions = '.jpg,.jpeg,.doc,.docx,.odt,.txt,.pdf';
  @Input() label = 'Browse';
  @Input() icon = 'folder_open';
  @Input() hideBrowseButton = false;
  @Output() dataChange = new EventEmitter<FormData | null>();
  @Output() fileChange = new EventEmitter<{
    files: File[];
    formData: FormData;
  } | null>();
  @Output() error = new EventEmitter();
  @Input() limit: number;
  formData = new FormData();
  filez: Record<string, File> = {};

  get filenames() {
    return Object.keys(this.filez);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    this._selectFile(files, event.target.files);
  }

  private _selectFile(files: FileList, filez: any) {
    for (let index = 0; index < files.length; index++) {
      const file = filez[index];
      this.filez[file.name] = file;
    }

    this.emit();
  }

  onDrop($event: any) {
    if ($event?.dataTransfer?.files) {
      this._selectFile($event.dataTransfer.files, $event.dataTransfer.files);
    }
  }

  onFileRemoved(filename: string) {
    delete this.filez[filename];

    this.emit();
  }

  emit() {
    this.formData = new FormData();

    const files = Object.values(this.filez);

    if (!files?.length) {
      this.fileChange.emit(null);
      this.dataChange.emit(null);
    }

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const reader = new FileReader();
      reader.onerror = (error) => {
        this.error.next(error);
        console.warn({ error });
      };
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileString: any = e?.target?.result;

        if (fileString) {
          this.formData.append('files[]', file, file.name);

          this.fileChange.emit({ files, formData: this.formData });
          this.dataChange.emit(this.formData);
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
