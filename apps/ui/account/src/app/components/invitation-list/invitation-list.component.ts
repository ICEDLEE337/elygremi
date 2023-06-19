import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { Invitation } from '@oninet/generated/account';

@Component({
  selector: 'oninet-invitation-list',
  templateUrl: './invitation-list.component.html',
})
export class InvitationListComponent implements OnInit, OnChanges {
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() resend = new EventEmitter();
  @Input() invitations!: Invitation[];
  @Input() enableCreating = false;
  @Input() enableEditing = false;
  @Input() enableDeleting = false;
  @Input() enableFiltering = true;
  @Input() enableResending = false;
  @Input() showTitle = true;
  toDelete = {} as any;
  filteredInvitations!: Invitation[];
  filter: any;

  filterChange($event: any) {
    this.filter = $event;
    this.filteredInvitations = $event.filter
      ? this.invitations.filter((u) =>
          u.email?.toLowerCase().includes($event.filter?.toLowerCase())
        )
      : this.invitations;
  }

  ngOnChanges(): void {
    this.filterChange('');
  }

  ngOnInit(): void {
    this.filteredInvitations = this.invitations;
  }

  initDelete(invitation: Invitation) {
    this.toDelete[invitation.email as string] = true;
  }

  cancelDelete(invitation: Invitation) {
    this.toDelete[invitation.email as string] = false;
  }

  deleteInvitation(invitation: Invitation) {
    this.delete.emit(invitation);
  }
}
