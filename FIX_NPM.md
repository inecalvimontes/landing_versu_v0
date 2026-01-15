# Solución: Error de Ejecución de Scripts en PowerShell

El error indica que PowerShell bloquea la ejecución de scripts de npm debido a la política de ejecución.

## Solución Rápida (Recomendada)

Ejecuta este comando en PowerShell **como Administrador**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Cuando te pregunte si deseas continuar, presiona **Y** y Enter.

## Explicación

- **RemoteSigned**: Permite ejecutar scripts locales sin firmar, pero requiere que los scripts descargados de internet estén firmados
- **Scope CurrentUser**: Solo afecta tu usuario, no toda la computadora (más seguro)

## Después de Cambiar la Política

1. Cierra y vuelve a abrir PowerShell
2. Verifica que npm funciona:
   ```powershell
   npm -version
   ```
3. Navega a tu proyecto y ejecuta:
   ```powershell
   cd "C:\Users\LENOVO\OneDrive - Universidad Católica de Chile\Escritorio\Versu\Cursor Test"
   npm install
   ```

## Alternativa: Sin Permisos de Administrador

Si no puedes ejecutar como Administrador, puedes usar este comando que no requiere permisos elevados (pero solo afecta a tu usuario):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

El flag `-Force` evita la confirmación.

## Verificar la Política Actual

Para ver la política actual:
```powershell
Get-ExecutionPolicy -List
```
