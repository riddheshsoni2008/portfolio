import os
import shutil
import glob

brain_dir = "/home/riddhesh/.gemini/antigravity/brain/438eecf4-2d6e-419e-aef2-f74c3971f30c"
public_dir = "/home/riddhesh/Desktop/portfolio/public"

files = glob.glob(os.path.join(brain_dir, "*.webp"))
for f in files:
    name = os.path.basename(f)
    if name.startswith("learnstack_demo"):
        shutil.copy(f, os.path.join(public_dir, "learnstack_demo.webp"))
    elif name.startswith("returno_demo"):
        shutil.copy(f, os.path.join(public_dir, "returno_demo.webp"))
    elif name.startswith("portfolio_demo"):
        shutil.copy(f, os.path.join(public_dir, "portfolio_demo.webp"))
    elif name.startswith("cricket_demo"):
        shutil.copy(f, os.path.join(public_dir, "cricket_demo.webp"))
    print(f"Copied {name}")
