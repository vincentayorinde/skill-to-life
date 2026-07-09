import { Component, OnInit } from '@angular/core';

interface GrowthBrick {
  style: Record<string, string | number>;
}

@Component({
  selector: 'ns-growth-bricks',
  standalone: true,
  template: `
    <div class="bricks-container" aria-hidden="true">
      @for (brick of bricks; track brick) {
        <div class="brick" [style]="brick.style"></div>
      }
    </div>
  `,
  styles: [
    `
      .bricks-container {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
      }

      .brick {
        position: absolute;
        border-radius: 3px;
      }
    `,
  ],
})
export class NsGrowthBricksComponent implements OnInit {
  bricks: GrowthBrick[] = [];

  ngOnInit(): void {
    this.bricks = Array.from({ length: 20 }, (_, index) => {
      const opacity = 0.03 + Math.random() * 0.04;

      return {
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${8 + Math.random() * 16}px`,
          height: `${8 + Math.random() * 16}px`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 8}s`,
          animationName: index % 4 === 0 ? 'brick-bounce' : 'brick-float',
          opacity,
          '--brick-opacity': opacity,
        },
      };
    });
  }
}
