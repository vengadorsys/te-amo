"""Renderiza el video vertical (1080x1920, 30 fps) con dibujos tipo boceto.

Uso: python3 render.py  ->  genera incels_torreon.mp4 y subtitulos.srt
Requiere Pillow y ffmpeg.
"""
import math
import random
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
BG = (250, 247, 240)
INK = (24, 24, 24)
SOFT = (150, 146, 138)
ACCENT = (190, 40, 40)  # solo para la llama de la vela y la alerta
OUT = Path(__file__).with_name("incels_torreon.mp4")
SRT = Path(__file__).with_name("subtitulos.srt")

FONT_SUB = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 50)
FONT_HAND = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 78)
FONT_SMALL = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 46)


# ---------- primitivas de boceto ----------

def seg(a, b, n=None):
    n = n or max(2, int(math.dist(a, b) / 12))
    return [(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n) for i in range(n + 1)]


def poly(pts, closed=False):
    pts = list(pts) + ([pts[0]] if closed else [])
    out = []
    for a, b in zip(pts, pts[1:]):
        out += seg(a, b)[:-1]
    out.append(pts[-1])
    return out


def rect(x, y, w, h):
    return poly([(x, y), (x + w, y), (x + w, y + h), (x, y + h)], closed=True)


def circle(cx, cy, r, a0=0, a1=360):
    n = max(12, int(abs(a1 - a0) / 6))
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)),
             cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]


def person(cx, cy, s=1.0, sitting=False):
    """Figura simple: cabeza, torso, brazos, piernas."""
    head = circle(cx, cy - 170 * s, 42 * s)
    body = poly([(cx, cy - 128 * s), (cx, cy + 20 * s)])
    arms = poly([(cx - 70 * s, cy - 40 * s), (cx, cy - 95 * s), (cx + 70 * s, cy - 40 * s)])
    if sitting:
        legs = poly([(cx - 60 * s, cy + 110 * s), (cx - 60 * s, cy + 20 * s), (cx, cy + 20 * s),
                     (cx + 60 * s, cy + 20 * s), (cx + 60 * s, cy + 110 * s)])
    else:
        legs = poly([(cx - 50 * s, cy + 160 * s), (cx, cy + 20 * s), (cx + 50 * s, cy + 160 * s)])
    return [head, body, arms, legs]


def school(cx, cy, s=1.0):
    x, y, w, h = cx - 260 * s, cy - 120 * s, 520 * s, 260 * s
    strokes = [rect(x, y, w, h),
               poly([(x - 30 * s, y), (cx, y - 140 * s), (x + w + 30 * s, y)]),
               rect(cx - 50 * s, y + h - 130 * s, 100 * s, 130 * s)]
    for i in range(3):
        strokes.append(rect(x + 40 * s + i * 160 * s, y + 50 * s, 90 * s, 70 * s))
    strokes.append(poly([(cx, y - 140 * s), (cx, y - 240 * s)]))
    strokes.append(poly([(cx, y - 240 * s), (cx + 80 * s, y - 220 * s), (cx, y - 200 * s)]))
    return strokes


def phone(cx, cy, s=1.0):
    w, h = 300 * s, 540 * s
    return [rect(cx - w / 2, cy - h / 2, w, h),
            rect(cx - w / 2 + 22 * s, cy - h / 2 + 50 * s, w - 44 * s, h - 120 * s),
            circle(cx, cy + h / 2 - 36 * s, 16 * s)]


def monitor(cx, cy, s=1.0):
    return [rect(cx - 280 * s, cy - 200 * s, 560 * s, 380 * s),
            rect(cx - 250 * s, cy - 170 * s, 500 * s, 320 * s),
            poly([(cx - 60 * s, cy + 180 * s), (cx - 90 * s, cy + 260 * s),
                  (cx + 90 * s, cy + 260 * s), (cx + 60 * s, cy + 180 * s)])]


def bubble(cx, cy, w, h):
    return [poly([(cx - w / 2, cy - h / 2), (cx + w / 2, cy - h / 2), (cx + w / 2, cy + h / 2),
                  (cx - w / 2 + 40, cy + h / 2), (cx - w / 2 + 10, cy + h / 2 + 35),
                  (cx - w / 2 + 15, cy + h / 2), (cx - w / 2, cy + h / 2)], closed=True)]


def heart(cx, cy, s):
    return [[(cx + s * 16 * math.sin(t) ** 3,
              cy - s * (13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)))
             for t in [i * 2 * math.pi / 40 for i in range(41)]]]


def scribble(cx, cy, w, h, seed):
    r = random.Random(seed)
    return [[(cx + r.uniform(-w, w) / 2, cy + r.uniform(-h, h) / 2) for _ in range(14)]]


def candle(cx, cy, s=1.0):
    return [rect(cx - 45 * s, cy - 40 * s, 90 * s, 260 * s),
            poly([(cx, cy - 40 * s), (cx, cy - 70 * s)])]


def flame(cx, cy, s, t):
    k = 1 + 0.08 * math.sin(t * 9)
    return [(cx + 26 * s * math.sin(a) * (1 - a / math.pi * 0.2),
             cy - 70 * s - 60 * s * k * (1 - math.cos(a)) / 2) for a in
            [i * 2 * math.pi / 30 for i in range(31)]]


def magnifier(cx, cy, s=1.0):
    return [circle(cx, cy, 110 * s), poly([(cx + 78 * s, cy + 78 * s), (cx + 200 * s, cy + 200 * s)])]


def globe(cx, cy, r):
    return [circle(cx, cy, r), poly([(cx - r, cy), (cx + r, cy)]),
            [(cx + r * 0.45 * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))) for a in range(-90, 271, 6)],
            poly([(cx - r * 0.87, cy - r * 0.5), (cx + r * 0.87, cy - r * 0.5)]),
            poly([(cx - r * 0.87, cy + r * 0.5), (cx + r * 0.87, cy + r * 0.5)])]


# ---------- escenas ----------
# Cada escena: (duración s, subtítulo, texto manuscrito superior, función de trazos, extras)

def sc_hook():
    s = phone(300, 820, 0.9)
    path = [(390 + i * 9, 760 - 120 * math.sin(i / 14) + i * 2) for i in range(45)]
    return s + [path] + school(800, 1000, 0.55)


def sc_origin():
    s = monitor(540, 820, 1.0)
    s += bubble(420, 730, 220, 90) + bubble(660, 860, 220, 90)
    s += heart(420, 730, 1.6) + heart(660, 860, 1.6)
    return s


def sc_turn():
    s = monitor(540, 820, 1.0)
    s += bubble(420, 730, 220, 90) + bubble(660, 860, 220, 90)
    s += scribble(420, 730, 150, 50, 3) + scribble(660, 860, 150, 50, 7)
    s += scribble(540, 470, 520, 120, 11)
    return s


def sc_world():
    s = globe(540, 840, 280)
    s.append(poly([(540, 470), (450, 620), (630, 620)], closed=True))
    return s


def sc_arrive():
    s = phone(540, 900, 1.0)
    for i in range(3):
        s.append(rect(430, 720 + i * 120, 220, 90))
    for i, (x, y) in enumerate([(160, 520), (920, 560), (150, 1180), (930, 1150)]):
        s.append(poly([(x, y), (540 + (x - 540) * 0.45, 900 + (y - 900) * 0.45)]))
    return s


def sc_room():
    s = person(470, 1000, 1.0, sitting=True)
    s += phone(600, 900, 0.25)
    s.append(rect(150, 1110, 780, 60))
    s.append(rect(760, 480, 200, 260))  # ventana
    s.append(poly([(860, 480), (860, 740)]))
    return s


def sc_cch():
    s = school(540, 900, 0.95)
    s += candle(540, 1290, 0.6)
    return s


def sc_date():
    s = [rect(330, 500, 420, 460), poly([(330, 600), (750, 600)]),
         circle(420, 500, 18), circle(660, 500, 18)]
    s += school(540, 1230, 0.6)
    return s


def sc_memory():
    s = candle(540, 960, 1.3)
    s.append(poly([(330, 1260), (750, 1260)]))
    for dx in (-210, 210):  # flores
        s.append(poly([(540 + dx, 1250), (540 + dx * 0.9, 1080)]))
        s.append(circle(540 + dx * 0.9, 1050, 34))
    return s


def sc_investigation():
    s = phone(470, 880, 0.9)
    s += magnifier(640, 780, 1.1)
    return s


def sc_lonely():
    s = person(540, 1020, 1.0)
    r = random.Random(5)
    for _ in range(4):
        s.append([(540 + r.uniform(-330, 330), 520 + r.uniform(-120, 160)) for _ in range(9)])
    return s


def sc_talk():
    s = person(380, 1040, 1.05) + person(700, 1060, 0.85)
    s += bubble(380, 600, 260, 100)
    s.append(poly([(450, 945), (610, 955)]))  # brazo sobre el hombro
    return s


def sc_end():
    return candle(540, 820, 1.0)


SCENES = [
    (4.0, "¿Cómo llega una idea nacida en foros de internet hasta una secundaria de Torreón?", "", sc_hook),
    (4.5, "En los años 90, «incel» era un sitio de apoyo en línea para personas solitarias.", "1997", sc_origin),
    (4.0, "Con los años, esos foros se llenaron de resentimiento… y de odio hacia las mujeres.", "", sc_turn),
    (4.0, "Ataques en EE. UU. y Canadá convirtieron esa subcultura en una alerta mundial.", "2014 · 2018", sc_world),
    (4.5, "A México no llegó en avión: llegó en memes, videos y algoritmos, ya en español.", "", sc_arrive),
    (4.0, "Especialistas notan que su visibilidad creció tras la pandemia, sobre todo entre jóvenes.", "", sc_room),
    (5.0, "Septiembre de 2025: en el CCH Sur asesinan a un alumno de 16 años. Analistas señalan códigos incel.", "CCH Sur", sc_cch),
    (3.5, "1 de octubre de 2026. Secundaria 13, ejido La Unión, Torreón.", "1 OCT 2026", sc_date),
    (5.0, "Dos exalumnos atacaron el plantel. Murió la subdirectora, Nery Edith Nevárez. Hubo cuatro heridos.", "", sc_memory),
    (4.5, "La Fiscalía investiga una posible afinidad con comunidades incel. El motivo no está confirmado.", "en investigación", sc_investigation),
    (4.5, "Ninguna ideología actúa sola: hay aislamiento, señales ignoradas y pantallas sin nadie del otro lado.", "", sc_lonely),
    (4.0, "Hablar con un joven a tiempo puede más que cualquier algoritmo.", "", sc_talk),
    (4.5, "", "", sc_end),
]

XFADE = 0.35  # segundos de fundido entre escenas

# Sincronía con la voz en off (ElevenLabs, voz «Joaquín», acelerada 1.25x -> voz.wav).
# Inicio de cada frase en el audio original, según la transcripción por palabra.
VOICE = Path(__file__).with_name("voz.wav")
TEMPO = 1.25
RAW_VOICE = VOICE.with_name("voz_raw.mp3")
if RAW_VOICE.exists() and not VOICE.exists():
    subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(RAW_VOICE), "-af", f"atempo={TEMPO}",
                    "-ar", "48000", "-ac", "2", str(VOICE)], check=True)
VOICE_STARTS = [0.0, 7.012, 14.582, 22.744, 31.312, 39.996, 48.309,
                61.811, 70.565, 80.724, 89.907, 99.555, 105.2]  # último = fin de voz + pausa
if VOICE.exists():
    marks = [t / TEMPO for t in VOICE_STARTS]
    SCENES = [(b - a, *rest) for a, b, (_, *rest) in zip(marks, marks[1:], SCENES)] + [SCENES[-1]]


# ---------- render ----------

def jitter(stroke, seed, amp=2.2):
    r = random.Random(seed)
    return [(x + r.uniform(-amp, amp), y + r.uniform(-amp, amp)) for x, y in stroke]


def wrap(text, font, maxw, draw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_scene(idx, t, dur):
    _, sub, hand, fn = SCENES[idx]
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    strokes = fn()
    # aparición progresiva del dibujo durante el primer 45 % de la escena
    prog = min(1.0, t / (dur * 0.45))
    total = sum(len(s) for s in strokes)
    budget = int(total * prog)
    zoom = 1.0 + 0.035 * (t / dur)
    cx, cy = W / 2, 880

    def z(p):
        return (cx + (p[0] - cx) * zoom, cy + (p[1] - cy) * zoom)

    for si, s in enumerate(strokes):
        if budget <= 1:
            break
        part = s[:budget]
        budget -= len(s)
        for pass_ in range(2):  # doble trazo = textura de lápiz
            pts = [z(p) for p in jitter(part, si * 31 + pass_ * 7 + idx * 101)]
            if len(pts) > 1:
                d.line(pts, fill=INK if pass_ == 0 else SOFT, width=6 if pass_ == 0 else 3, joint="curve")

    if fn in (sc_cch, sc_memory, sc_end) and prog >= 1.0:
        base = {sc_cch: (540, 1290, 0.6), sc_memory: (540, 960, 1.3), sc_end: (540, 820, 1.0)}[fn]
        d.polygon([z(p) for p in flame(*base, t)], fill=ACCENT)
    if fn is sc_world and prog >= 1.0:
        p = z((540, 585))
        d.text(p, "!", font=FONT_HAND, fill=ACCENT, anchor="mm")

    if hand:
        a = int(255 * min(1.0, max(0.0, (t - 0.3) / 0.5)))
        col = tuple(int(BG[i] + (INK[i] - BG[i]) * a / 255) for i in range(3))
        d.text((W / 2, 300), hand, font=FONT_HAND, fill=col, anchor="mm")

    if sub:
        lines = wrap(sub, FONT_SUB, 900, d)
        y = 1440
        for ln in lines:
            d.text((W / 2, y), ln, font=FONT_SUB, fill=INK, anchor="mm")
            y += 70

    if fn is sc_end:
        a = min(1.0, t / 0.8)
        col = tuple(int(BG[i] + (INK[i] - BG[i]) * a) for i in range(3))
        d.text((W / 2, 1260), "En memoria de", font=FONT_SMALL, fill=col, anchor="mm")
        d.text((W / 2, 1340), "Nery Edith Nevárez", font=FONT_HAND, fill=col, anchor="mm")
        d.text((W / 2, 1520), "¿Necesitas hablar con alguien?", font=FONT_SMALL, fill=col, anchor="mm")
        d.text((W / 2, 1590), "Línea de la Vida: 800 911 2000", font=FONT_SMALL, fill=col, anchor="mm")
    return img


def srt_time(s):
    ms = int(round(s * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


def main():
    starts, acc = [], 0.0
    for dur, *_ in SCENES:
        starts.append(acc)
        acc += dur
    total = acc

    with open(SRT, "w", encoding="utf-8") as f:
        n = 1
        for (dur, sub, *_), st in zip(SCENES, starts):
            if sub:
                f.write(f"{n}\n{srt_time(st)} --> {srt_time(st + dur)}\n{sub}\n\n")
                n += 1

    ff = subprocess.Popen([
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        *(["-i", str(VOICE), "-af", "apad"] if VOICE.exists()
          else ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo"]),
        "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(OUT)], stdin=subprocess.PIPE)

    for fi in range(int(total * FPS)):
        t = fi / FPS
        idx = max(i for i, st in enumerate(starts) if st <= t)
        lt, dur = t - starts[idx], SCENES[idx][0]
        frame = draw_scene(idx, lt, dur)
        if idx + 1 < len(SCENES) and dur - lt < XFADE:  # fundido al siguiente plano
            nxt = draw_scene(idx + 1, 0.0, SCENES[idx + 1][0])
            frame = Image.blend(frame, nxt, 1 - (dur - lt) / XFADE)
        ff.stdin.write(frame.tobytes())
    ff.stdin.close()
    ff.wait()
    print(f"{OUT.name}: {total:.1f} s")


if __name__ == "__main__":
    main()
