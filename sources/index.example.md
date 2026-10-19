# Fuentes por tema

Material de estudio propio, agrupado por tema. La skill `teach` lo usa así: **el tema de la sesión mapea a UNA carpeta** y solo esa fuente manda.

```text
sources/
├── index.md              # este archivo, local: tema → carpeta → qué cubre
└── <slug-del-tema>/      # el material de ese tema (*.pdf, *.md, *.epub, lo que sea)
    └── ...
```

> **Nada de `sources/` se versiona.** `.gitignore` ignora todo su contenido salvo este
> ejemplo, sin importar el formato: PDF, Markdown, EPUB, DOCX, audio, imágenes, lo que sea.
> El índice real se crea copiando este archivo:
>
> ```powershell
> copy sources\index.example.md sources\index.md
> ```
>
> Ese `index.md` queda solo en tu máquina, igual que el material. Si clonás el repo en otra,
> tenés que volver a copiarlo y a poner las fuentes.

## Reglas

1. Antes de enseñar, buscar el tema en la tabla de abajo.
2. La carpeta que corresponda es la base autoritativa de la sesión: enseñar y verificar contra ese material.
3. Las demás carpetas se ignoran por completo (una sesión de expresiones regulares no toca los PDF de cálculo).
4. Si **ninguna** carpeta cubre el tema: **preguntar antes de usar la web** — ofrecer "web (no viene de tus fuentes)" o esperar a que agregue el PDF. Nunca caer en silencio a memoria ni a internet.
5. `researcher` obedece la misma regla: primero el material propio, web solo para tapar un agujero y diciéndolo.

## Índice

| Tema | Carpeta | Cubre | Notas |
|---|---|---|---|
| _(ej.)_ Cálculo en varias variables | `calculo-varias-variables/` | integrales múltiples, campos, teorema de Green | _ejemplo — reemplazar_ |
| _(ej.)_ Autómatas y lenguajes | `automatas/` | máquinas de estados, ER, equivalencias | _ejemplo — reemplazar_ |

> La columna **Notas** es pública solo si este archivo se commitea — no se commitea, así que
> podés anotar lo que quieras. Aun así, conviene que diga de dónde salió el material
> (libro, capítulo, apunte propio) y no datos de terceros.
