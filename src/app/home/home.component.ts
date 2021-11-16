import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { environment } from 'src/environments/environment';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  myAppUrl = environment.baseURL;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private ledaerService: LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => {
      this.dish = dish;
      console.log('featured-dish: ', this.dish);
    });
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => {
      this.promotion = promotion;
    });
    this.ledaerService.getFeaturedLeader().subscribe(leader => {
      this.leader = leader;
    });
  }
}
