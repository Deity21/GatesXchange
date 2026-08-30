import os

# Main project folder
project_name = "gates-exchange"

# Folder structure
folders = [
    project_name,
    f"{project_name}/css",
    f"{project_name}/js",
    f"{project_name}/assets",
    f"{project_name}/assets/icons",
]

# Files to create
files = [
    f"{project_name}/index.html",
    f"{project_name}/css/style.css",
    f"{project_name}/js/script.js",
    f"{project_name}/assets/logo.png",

    # Service icons
    f"{project_name}/assets/icons/paypal.svg",
    f"{project_name}/assets/icons/stripe.svg",
    f"{project_name}/assets/icons/wise.svg",
    f"{project_name}/assets/icons/bank.svg",
    f"{project_name}/assets/icons/euro-bank.svg",
    f"{project_name}/assets/icons/payoneer.svg",
    f"{project_name}/assets/icons/skrill.svg",
    f"{project_name}/assets/icons/revolut.svg",
    f"{project_name}/assets/icons/venmo.svg",
    f"{project_name}/assets/icons/zelle.svg",
]

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files
for file in files:
    if not os.path.exists(file):
        open(file, "w").close()

print("✅ Gates Exchange project created successfully!")
print()
print("Project structure:")
print("gates-exchange/")
print("├── index.html")
print("├── css/")
print("│   └── style.css")
print("├── js/")
print("│   └── script.js")
print("└── assets/")
print("    ├── logo.png")
print("    └── icons/")
print("        ├── paypal.svg")
print("        ├── stripe.svg")
print("        ├── wise.svg")
print("        ├── bank.svg")
print("        ├── euro-bank.svg")
print("        ├── payoneer.svg")
print("        ├── skrill.svg")
print("        ├── revolut.svg")
print("        ├── venmo.svg")
print("        └── zelle.svg")