import { Component, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { Org } from "@oninet/generated/account";

@Component({
    selector: 'oninet-org-list',
    templateUrl: './org-list.component.html'
})
export class OrgListComponent implements OnInit {
    @Input() orgs!: Org[];
    @Output() create = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Input() enableCreating = false;
    @Input() enableEditing = false;
    @Input() enableDeleting = false;
    toDelete = {} as any;
    filteredOrgs!: Org[];

    filterChange ($event: any) {
        this.filteredOrgs = $event.filter ? this.orgs.filter(o => o.name?.toLowerCase().includes($event.filter?.toLowerCase())) : this.orgs;
    }

    ngOnInit(): void {
        this.filteredOrgs = this.orgs;
    }

    initDelete(org: Org) {
        this.toDelete[org.id as string] = true;
    }

    cancelDelete(org: Org) {
        this.toDelete[org.id as string] = false;
    }

    async deleteOrg(org: Org) {
        this.delete.emit(org);
    }
}