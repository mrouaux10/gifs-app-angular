import { Component } from '@angular/core';

@Component({
  selector: 'gif-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse">
      <div class="bg-gray-300 rounded-lg h-48 w-full mb-2"></div>
      <div class="bg-gray-300 rounded h-4 w-3/4 mb-1"></div>
      <div class="bg-gray-300 rounded h-3 w-1/2"></div>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export class GifSkeletonComponent {}
