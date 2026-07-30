from pathlib import Path
import os
import subprocess
import sys


DEPS = Path(__file__).resolve().parent / ".deps"
sys.path.insert(0, str(DEPS))

import imageio_ffmpeg  # noqa: E402


VIDEO_DIR = Path(__file__).resolve().parents[1] / "assets" / "videos"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


for source in sorted(VIDEO_DIR.glob("*.mp4")):
    temporary = source.with_name(f"{source.stem}.optimized.mp4")
    command = [
        FFMPEG,
        "-y",
        "-i",
        str(source),
        "-vf",
        "scale='min(720,iw)':-2:force_original_aspect_ratio=decrease",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "30",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        str(temporary),
    ]
    subprocess.run(command, check=True)
    original_size = source.stat().st_size
    optimized_size = temporary.stat().st_size
    if optimized_size >= original_size:
        temporary.unlink()
        print(f"{source.name}: se conservó el original ({original_size} bytes)")
        continue
    os.replace(temporary, source)
    print(f"{source.name}: {original_size} -> {optimized_size} bytes")
