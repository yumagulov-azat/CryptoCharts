import { trigger, style, animate, transition } from '@angular/animations';

export function slideInUp() {
  return trigger(
    'slideInUp', [
      transition(':enter', [
        style({transform: 'translateY(100px)', opacity: 0}),
        animate('0.6s cubic-bezier(0.075, 0.82, 0.165, 1)', style({transform: 'translateY(0)', opacity: 1}))
      ])
    ]
  );
}
