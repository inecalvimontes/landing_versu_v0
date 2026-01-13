# Cómo Instalar Node.js en Windows

Node.js no está instalado en tu sistema. Sigue estos pasos para instalarlo:

## Opción 1: Instalador Oficial (Recomendado)

1. **Descarga Node.js:**
   - Ve a: https://nodejs.org/
   - Descarga la versión **LTS (Long Term Support)** - la recomendada para la mayoría de usuarios
   - Esto descargará un archivo `.msi` (ejemplo: `node-v20.x.x-x64.msi`)

2. **Instala Node.js:**
   - Ejecuta el archivo `.msi` que descargaste
   - Sigue el asistente de instalación
   - **Importante:** Asegúrate de que la opción "Add to PATH" esté marcada (normalmente viene marcada por defecto)
   - Haz clic en "Install" y espera a que termine

3. **Verifica la instalación:**
   - Cierra y vuelve a abrir PowerShell/terminal (importante para que reconozca los cambios)
   - Ejecuta:
     ```powershell
     node --version
     npm --version
     ```
   - Deberías ver números de versión (ejemplo: `v20.10.0` y `10.2.3`)

## Opción 2: Usando Chocolatey (Si lo tienes instalado)

Si tienes Chocolatey instalado, puedes usar:
```powershell
choco install nodejs-lts
```

## Opción 3: Usando winget (Windows Package Manager)

Si tienes Windows 10/11 con winget:
```powershell
winget install OpenJS.NodeJS.LTS
```

## Después de Instalar

1. **Cierra y vuelve a abrir PowerShell** (muy importante)
2. Navega a tu proyecto:
   ```powershell
   cd "C:\Users\LENOVO\OneDrive - Universidad Católica de Chile\Escritorio\Versu\Cursor Test"
   ```
3. Instala las dependencias:
   ```powershell
   npm install
   ```

## Solución de Problemas

Si después de instalar aún no funciona:
1. Reinicia tu computadora (para asegurar que PATH se actualice)
2. O verifica manualmente que Node.js está en PATH:
   - Node.js normalmente se instala en: `C:\Program Files\nodejs\`
   - Asegúrate de que esta ruta esté en las variables de entorno PATH

## Verificar PATH (Opcional)

Para verificar si Node.js está en PATH:
```powershell
$env:Path -split ';' | Select-String nodejs
```

Si no aparece nada, necesitas agregar `C:\Program Files\nodejs\` a tu PATH manualmente.
