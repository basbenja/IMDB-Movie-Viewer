# **Visualizador de películas IMBD - Frontend**

## **Prerrequisitos**
Para correr esta aplicación, es necesario contar con `node` y `npm` (Node Package
Manager). Se puede instalar ambos con `nvm` (Node Version Manager) desde el siguiente
link: [Download Node.js](https://nodejs.org/en/download/).

Para verificar que la instalación fue exitosa, correr los siguientes comandos, que
deberían devolver la versión de cada utilidad:
```bash
node -v
npm -v
```

En este proyecto, se usó la versión `v22.15.0` de `node` y la `10.9.2` de `npm`.

## **Pasos para ejecutar la aplicación localmente**
#### **1. Instalar las dependencias**
Dirigirse a la carpeta `frontend` y correr el siguiente comando para instalar las
dependencias necesarias para ejecutar este proyecto:
```bash
npm install
```

#### **2. Establecer variables de entorno**
La única variable de entorno que hay que establecer es `VITE_BACKEND_URL`, en el
archivo `.env`. Esta hace referencia la URL en donde está corriendo el backend.


#### **3. Correr la aplicación**
```bash
npm run dev
```
