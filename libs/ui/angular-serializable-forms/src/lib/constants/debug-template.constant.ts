export const debugTemplate = `
<pre>{{data|json}}</pre>
<pre>{{options|json}}</pre>
<dyna-form
[data]="data"
[editable]="true"
[uiOptions]="options"
(statusChange)="statusChange.emit($event)"
(valueChange)="valueChange.emit($event)"
></dyna-form>
`;