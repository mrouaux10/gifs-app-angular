import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'error-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center p-8 text-center">
      <!-- 🚨 Icono de error -->
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      
      <!-- 📝 Mensaje de error -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        Algo salió mal
      </h3>
      <p class="text-gray-600 mb-6 max-w-md">
        {{ message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' }}
      </p>
      
      <!-- 🔄 Botón de retry -->
      <button 
        (click)="onRetry.emit()"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
      >
        <i class="fa-solid fa-rotate"></i>
        <span>Intentar de nuevo</span>
      </button>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `]
})
export class ErrorStateComponent {
  @Input() message?: string;
  @Output() onRetry = new EventEmitter<void>();
}
