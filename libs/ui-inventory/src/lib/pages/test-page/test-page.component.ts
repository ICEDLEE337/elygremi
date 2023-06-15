import { AfterViewInit, Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent, Config } from '@oninet/ui/common';
import { DefaultApi } from '@oninet/generated/account';
import { ProductModelApi, ProductModels } from '@oninet/generated/akeneo';
import axios from 'axios';

@Component({
  selector: 'oninet-test-page',
  templateUrl: './test-page.component.html'
})
export class TestPageComponent extends BaseComponent implements OnInit {
  data: ProductModels;

    constructor(
      public api: DefaultApi,
      private config: Config
    ) {
      super();
      this.busy$$.next(true);
    }

  async ngOnInit() {
    this.data = (await axios.get(`${this.config.api}/api/akeneo-product`)).data
  }
}
