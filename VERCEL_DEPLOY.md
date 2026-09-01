# Desplegar SI2 Frontend en Vercel

## Requisitos

- Repositorio del frontend conectado a Vercel.
- URL pública de FastAPI disponible por HTTPS.
- El backend debe aceptar como origen la URL final de Vercel en `CORS_ORIGINS`.

El frontend nunca se conecta directamente a PostgreSQL o Supabase. Todas las peticiones pasan por FastAPI.

## Importar el proyecto

1. Entra a [vercel.com/new](https://vercel.com/new).
2. Selecciona el repositorio de `SI2-frontend`.
3. En **Root Directory**, deja `./` si el repositorio contiene únicamente Angular. Si el repositorio contiene varios proyectos, selecciona la carpeta `SI2-frontend`.
4. Usa estos valores:

   - **Framework Preset:** Angular (Vercel también puede detectarlo automáticamente).
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist/si2-frontend/browser`.
   - **Install Command:** `npm install`.

El archivo `vercel.json` ya define el comando, la carpeta de salida y el fallback SPA para que funcionen rutas como `/login`, `/register` y `/home` al refrescar el navegador.

## Configurar la variable de entorno

Antes del primer deploy:

1. En el proyecto de Vercel, abre **Settings → Environment Variables**.
2. Crea la variable:

   - **Name:** `API_URL`
   - **Value:** `https://backendprueba-production-379f.up.railway.app/api/v1`
   - **Environments:** Production, Preview y Development, según corresponda.

3. Guarda la variable.
4. Ejecuta **Deployments → Redeploy** y selecciona **Use existing Build Cache** desactivado si quieres forzar una compilación limpia.

`API_URL` se incorpora durante el build. No agregues aquí contraseñas de PostgreSQL, claves JWT, tokens ni credenciales de Supabase.

## Configurar CORS en el backend

En Railway, agrega o actualiza la variable `CORS_ORIGINS` con el dominio de Vercel:

```text
https://TU-PROYECTO.vercel.app
```

Si utilizas un dominio personalizado, agrega también ese origen separado por comas:

```text
https://TU-PROYECTO.vercel.app,https://app.tudominio.com
```

No agregues una barra final (`/`) y no uses `*` si el frontend utiliza credenciales o sesión.

Después de cambiar `CORS_ORIGINS`, reinicia o redeploya el servicio backend.

## Validación posterior

1. Abre `https://TU-PROYECTO.vercel.app`.
2. Prueba registro y login.
3. En DevTools → Network, confirma que las peticiones van a `https://TU-BACKEND.../api/v1`.
4. Confirma que no aparecen errores CORS.
5. Comprueba que `/login`, `/register` y `/home` funcionan directamente y después de refrescar.

## Deploy desde CLI (opcional)

Desde `SI2-frontend`:

```bash
npm install
npx vercel login
npx vercel --prod
```

La variable `API_URL` debe existir en Vercel antes del deploy. Para revisar el build localmente:

```bash
API_URL=https://backendprueba-production-379f.up.railway.app/api/v1 npm run build
```

En PowerShell:

```powershell
$env:API_URL = 'https://backendprueba-production-379f.up.railway.app/api/v1'
npm run build
```
