# SI2 Frontend

## Propósito y stack

Frontend web Angular 22 con TypeScript, Standalone Components, SCSS, Reactive Forms, HttpClient, Signals/RxJS, lazy loading y Vitest. Consume exclusivamente `/api/v1` de FastAPI.

## Arquitectura

`core` contiene autenticación, configuración e interceptores; `features` contiene pantallas por funcionalidad; `shared` queda reservado para UI realmente compartida. Los componentes no llaman APIs directamente: usan `AuthService` y `AuthApi`.

## Seguridad

No poner JWT secrets, contraseñas DB ni claves privadas en este repositorio. El guard solo mejora UX; la autorización real pertenece al backend. El token de acceso se mantiene en `sessionStorage` y se limpia al cerrar sesión o recibir 401.

## Comandos

```bash
npm install
npm start
npm test -- --watch=false
npm run build
```

Angular 22 requiere Node 22.22.3 o superior. La URL de desarrollo está en `src/app/core/config/environment.ts`; la de producción usa reemplazo de archivo.

## Estado actual

Implementados CU-01, CU-02 y CU-04: registro de paciente, login JWT, ruta protegida, interceptor Bearer, pantalla protegida y logout. El tipo `nutritionist` existe en el contrato pero no puede autoasignarse mediante registro público. No implementar aquí acceso directo a Supabase ni lógica de negocio de futuras features.
