export const template = `
<dyna-form *ngIf="options"
[data]="data"
[readOnly]="readOnly"
[uiOptions]="options"
(statusChange)="statusChange.emit($event)"
(valueChange)="valueChange.emit($event)"
[delay]="delay || 250"
></dyna-form>
`;
