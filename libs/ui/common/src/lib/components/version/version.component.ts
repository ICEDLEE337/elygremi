import { Component, OnInit } from '@angular/core';
import { Config } from '../../providers/config.class';
import axios from 'axios';

@Component({
  selector: 'oninet-version',
  templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit {
  version: any;
  constructor(private config: Config) { }

  async ngOnInit() {
    try {
      this.version = (await axios.get(`${this.config.api}/api/health`)).data?.version;
    } catch (error: any) {
      this.version = '';
    }
  }
}
