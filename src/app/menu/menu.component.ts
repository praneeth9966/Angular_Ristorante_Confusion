import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { environment } from 'src/environments/environment';
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {

  myAppUrl = environment.baseURL;
  dishes: Dish[];

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
    });
  }

}
