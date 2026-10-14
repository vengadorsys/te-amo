# De los foros a Torreón — storytelling animado (56 s, 9:16)

## 1. Concepto
- **Tema:** cómo llegó la cultura incel a México y su posible relación con el ataque en la Secundaria 13 de Torreón.
- **Duración:** 56 s (13 planos).
- **Idea central:** una idea nacida en foros de internet cruzó fronteras por algoritmos; ninguna ideología actúa sola, y hablar a tiempo importa.
- **Gancho:** «¿Cómo llega una idea nacida en foros de internet hasta una secundaria de Torreón?»
- **Tono:** sobrio, respetuoso, informativo. Sin morbo.

### Criterios éticos aplicados
- **No se nombra ni se muestra a los agresores** (se evita darles notoriedad), ni a los atacantes extranjeros.
- **No se muestran armas ni violencia.** La víctima se representa con una vela.
- **No se citan sus publicaciones**, para no amplificar su mensaje.
- **El vínculo incel aparece como línea de investigación**, no como un hecho. Hasta el 14 oct 2026 la Fiscalía no ha confirmado el motivo.
- **El cierre incluye una línea de ayuda:** Línea de la Vida, 800 911 2000.

## 2. Guion de voz en off
¿Cómo llega una idea nacida en foros de internet hasta una secundaria de Torreón?
En los años noventa, «incel» era un sitio de apoyo en línea para personas solitarias.
Con los años, esos foros se llenaron de resentimiento… y de odio hacia las mujeres.
Ataques en Estados Unidos y Canadá convirtieron esa subcultura en una alerta mundial.
A México no llegó en avión: llegó en memes, videos y algoritmos, ya en español.
Especialistas notan que su visibilidad creció tras la pandemia, sobre todo entre jóvenes.
Septiembre de 2025: en el CCH Sur asesinan a un alumno de dieciséis años. Analistas señalan códigos incel.
Primero de octubre de 2026. Secundaria 13, ejido La Unión, Torreón.
Dos exalumnos atacaron el plantel. Murió la subdirectora, Nery Edith Nevárez. Hubo cuatro heridos.
La Fiscalía investiga una posible afinidad con comunidades incel. El motivo no está confirmado.
Ninguna ideología actúa sola: hay aislamiento, señales ignoradas y pantallas sin nadie del otro lado.
Hablar con un joven a tiempo puede más que cualquier algoritmo.

## 3. Storyboard
| Tiempo | Narración | En pantalla | Movimiento | Texto |
|---|---|---|---|---|
| 0–4 | Gancho | Celular con una línea punteada hacia una escuela | El trazo se dibuja; zoom lento | — |
| 4–8.5 | Origen 90s | Monitor antiguo con globos de diálogo y corazones | Aparición del boceto | 1997 |
| 8.5–12.5 | Giro | Los mismos globos, ahora con garabatos y una nube encima | Garabatos que crecen | — |
| 12.5–16.5 | Alerta mundial | Globo terráqueo con triángulo de alerta (!) en rojo | Zoom lento | 2014 · 2018 |
| 16.5–21 | Llegada a México | Celular con tarjetas; flechas desde las orillas | Flechas entran | — |
| 21–25 | Pandemia | Joven sentado en la cama con el celular, junto a una ventana | Zoom lento | — |
| 25–30 | CCH Sur | Edificio escolar y una vela encendida | La llama parpadea | CCH Sur |
| 30–33.5 | Fecha | Hoja de calendario y la escuela con bandera | Aparición | 1 OCT 2026 |
| 33.5–38.5 | Víctima | Vela grande y dos flores | La llama parpadea | — |
| 38.5–43 | Investigación | Celular con una lupa encima | Aparición | en investigación |
| 43–47.5 | Reflexión | Figura sola entre hilos enredados | Zoom lento | — |
| 47.5–51.5 | Cierre | Adulto con la mano en el hombro de un joven y un globo de diálogo | Aparición | — |
| 51.5–56 | Memoria | Vela | Fundido del texto | En memoria de Nery Edith Nevárez · Línea de la Vida 800 911 2000 |

**Estilo constante:** línea negra a doble trazo, irregular, sobre fondo marfil (#FAF7F0). El rojo solo aparece en la llama y en la alerta. Entre planos hay un fundido de 0.35 s.

**Prompt base, por si quieres regenerar los dibujos con una IA:** *"minimalist hand-drawn black ink sketch on ivory background, wobbly double-line strokes, editorial illustration, lots of negative space, no shading, no text, vertical 9:16, [descripción del plano]"*.

## 4. Subtítulos
Están en `subtitulos.srt` y también van quemados en el MP4.

## 5. Sonido (pendiente)
El MP4 lleva una pista de audio silenciosa.
- **Voz:** español mexicano, cálida y pausada, sin dramatizar. Deja una pausa de 1 s antes de «1 de octubre de 2026».
- **Música:** piano o pad ambiental grave, a −20 dB debajo de la voz. Se apaga en el plano de la vela final.
- **Efectos:** sonido sutil de lápiz en las apariciones. No uses golpes, gritos ni sirenas.

## 6. Montaje y exportación
Cuando grabes la voz, ajusta las duraciones en `SCENES` dentro de `render.py`, vuelve a ejecutar `python3 render.py` y une el audio:
`ffmpeg -i incels_torreon.mp4 -i voz.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -shortest final.mp4`
Formato: 1080×1920, 30 fps, H.264 + AAC.

## 7. Fuentes
- [La Jornada: investigan vínculos con movimiento incel](https://www.jornada.com.mx/noticia/2026/10/02/estados/investigan-vinculos-de-agresores-en-secundaria-de-torreon-con-movimiento-incel-y-grupos-digitales-violentos)
- [Infobae: Torreón reabre el debate sobre la comunidad incel](https://www.infobae.com/mexico/2026/10/03/ataque-escolar-torreon-reabre-el-debate-sobre-el-patron-digital-de-la-comunidad-incel/)
- [Milenio: cómo ocurrió el ataque](https://www.milenio.com/estados/como-ocurrio-ataque-armado-secundaria-ejido-union-torreon)
- [Infobae: prisión preventiva](https://www.infobae.com/mexico/2026/10/04/dan-prision-preventiva-a-los-gemelos-responsables-del-ataque-armado-a-una-secundaria-en-torreon/)
- [El Financiero: por qué atacaron](https://www.elfinanciero.com.mx/estados/2026/10/01/agresion-en-torreon-por-que-atacaron-los-exalumnos-y-que-dicen-los-testimonios/)
- [N+: crecen los incel en México](https://www.nmas.com.mx/sociedad/crecen-los-incel-en-mexico-de-ataques-en-redes-sociales-a-riesgos-reales-de-violencia/)
- [Revista Abogacía: incels en México](https://www.revistaabogacia.com/incels-en-mexico-cuando-la-frustracion-digital-cruza-al-terreno-penal/)
- [Chilango: caso CCH Sur](https://www.chilango.com/noticias/seguridad/que-paso-cch-sur-unam-esto-se-sabe-del-asesinato-estudiante/)

**Datos que conviene volver a verificar:** el nombre de la víctima aparece en la prensa como Nery, Nedi o Neri Edith Nevárez González. El número de heridos varía entre 4 y 5 según la fuente.
