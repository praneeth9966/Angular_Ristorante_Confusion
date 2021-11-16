import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { ContactType } from '../shared/feedback';
import { environment } from 'src/environments/environment';
import { visibility } from '../animations/app.animations';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

 dish: Dish;
 dishIds: string[];
 prev: string;
 next: string;

 commentsForm: FormGroup;
 comment: Comment;
 contactType = ContactType;
 @ViewChild('cform') commentFormDirective:any;
 myAppUrl = environment.baseURL;
 dishcopy: Dish;
 visibility = 'shown';

 constructor(private dishservice: DishService,
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishservice.getDish(params['id']);
    }))
    .subscribe(dish => {
      this.dish = dish;
      console.log('result-dish: ', this.dish);
      this.dishcopy = dish;
      console.log('First dishcopy: ', this.dishcopy);
      this.setPrevNext(dish.id);
      this.visibility = 'shown';
    });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentsForm = this.fb.group({
      author: ['', Validators.required ],
      rating: 5,
      comment: ['', Validators.required ]
    });
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toString();
    this.dishcopy.comments.push(this.comment);
    console.log('second-dishcopy: ', this.dishcopy.comments.push(this.comment));
    this.dishservice.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
      console.log('third-dishcopy: ', this.dishcopy);
    })
    this.commentsForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

}
