def copy_file(source_path, destination_path):
    try:
        with open(source_path, 'r') as src_file:
            content = src_file.read()
        with open(destination_path, 'w') as dest_file:
            dest_file.write(content)
            print(f"File copied successfully from '{source_path}' to '{destination_path}'")
    except FileNotFoundError:
        print("Source file not found. Incorrect path")
    except Exception as e:
        print(f"An error occurred: {e}")
source = "PythonModules/glob.txt"
destination = "PythonModules/copy_glob.txt"
copy_file(source, destination)