import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MobileService } from '../_services/mobile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public list: any[];
  sub: any;
  code: any;
  pesquisa: any;

  constructor(
    private ms: MobileService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        if (params['code']) {
          this.code = params['code'];
          this.getItem(this.code);
        } else {
          this.listAll();
        }
      });
  }

  listAll() {
    this.ms.getAll()
      .then((data) => {
        this.list = data || [];
      }).catch((error) => {
        console.log(error);
      });
  }

  getItem(code: any) {
    this.ms.getItem(code)
      .then((data) => {
        this.list = [data];
      }).catch((error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
