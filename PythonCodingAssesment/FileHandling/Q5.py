def remove_empty_lines(path):
    try:
        with open(path, 'r') as file:
            lines = file.readlines()
            non_empty_lines = [line for line in lines if line.strip()]
        with open(path, 'w') as file:
            file.writelines(non_empty_lines)
            print(f"Empty lines removed from '{path}'.")
    except FileNotFoundError:
        print("File not found. incorrect path")
    except Exception as e:
        print(f"An error occurred: {e}")
path = "PythonModules/glob.txt"
remove_empty_lines(path)