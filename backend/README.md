# **Visualizador de películas IMBD - Backend**


## **Pasos para ejecutar la aplicación localmente**
#### **1. Crear un entorno virtual de Python 3.12.7**
Para crear un entorno virtual, existen diferentes herramientas. La que yo utilizo se llama
`pyenv`, que permite manejar distintas versiones de Python. En el [repositorio de GitHub
de `pyenv`](https://github.com/pyenv/pyenv) se encuentran las instrucciones para
instalarla.

Una vez instalado `pyenv`, seguir los siguientes pasos:
```bash
pyenv install 3.12.7                    # instala la versión 3.12.7 de Python
pyenv virtualenv 3.12.7 movie-viewer    # crea un entorno llamado "movie-viewer" con Python 3.12.7
pyenv activate movie-viewer             # activa el entorno recién creado
```

#### **2. Instalar dependencias**
Una vez activado el entorno virtual, instalar las dependencias del proyecto, listadas
en el archivo `requirements.txt`.

```bash
pip install -r requirements.txt
```

NOTA: `requirements.txt` también contiene las dependencias necesarias para correr los
tests.

#### **3. Establecer variables de entorno**
En el archivo `.env`, darle un valor a la variable `DATA_STORAGE_PATH`. Esta hace
referencia a la carpeta en donde quedarán almacenados los archivos de películas subidos
por el usuario.


#### **4. Correr la aplicación**
```bash
flask run --debug
```

## **Pasos para correr los tests**
**En el mismo entorno virtual creado para la aplicación**, dirigirse al directorio
`backend` (el actual), y correr el comando:
```bash
pytest
```