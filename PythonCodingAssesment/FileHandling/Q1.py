# 1. Write a script that reads a file and prints each line with line numbers.

def print_file(path):
    try:
        with open(path, 'r') as file:
            for idx, line in enumerate(file, start=1):
                print(f"{idx}: {line.strip()}")
    except FileNotFoundError:
        print("File not found. Incorrect path")
    except Exception as e:
        print(f"An error occurred: {e}")
path = "PythonModules/Q1.py"
print_file(path)