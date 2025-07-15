# 8. Develop a program that uses `os` and `sys` modules to list files and command-line args.

import os
import sys

print("Files and directories in current directory:")
for item in os.listdir():
    print(item)

print("\nCommand-line arguments passed to the script:")
for i, arg in enumerate(sys.argv):
    print(f"Argument {i}: {arg}")
