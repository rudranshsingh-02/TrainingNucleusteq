# 10. Implement a Python script that uses `glob` to search for all `.txt` files in a directory.

import glob
import os

dir_path = input("Enter the directory path to search in: ")
search_pattern = os.path.join(dir_path, "*.txt")
txt_files = glob.glob(search_pattern)

if txt_files:
    print("\nText files found:")
    for file in txt_files:
        print(file)
else:
    print("\nNo .txt files found in the specified directory.")
