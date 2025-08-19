import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-8 text-center">
      <!-- 🎭 Icono de estado vacío -->
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-face-frown text-gray-400 text-2xl"></i>
      </div>
      
      <!-- 📝 Mensaje personalizable -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title || 'No se encontraron resultados' }}
      </h3>
      <p class="text-gray-600 mb-4 max-w-md">
        {{ message || 'Intenta con otros términos de búsqueda o explora los gifs trending.' }}
      </p>
      
      <!-- 💡 Sugerencias si las hay -->
      @if (suggestions && suggestions.length > 0) {
        <div class="mt-4">
          <p class="text-sm text-gray-500 mb-2">Sugerencias:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            @for (suggestion of suggestions; track suggestion) {
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{ suggestion }}
              </span>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class EmptyStateComponent {
  @Input() title?: string;
  @Input() message?: string;
  @Input() suggestions?: string[];
}
