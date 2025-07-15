import os
def merge_files(file_list, output_file):
    try:
        with open(output_file, 'w') as outfile:
            for file_name in file_list:
                if os.path.exists(file_name):
                    with open(file_name, 'r') as infile:
                        outfile.write(infile.read())
                        outfile.write('\n')
                else:
                    print(f"Warning: '{file_name}' does not exist. Skipping this file.")
                    print(f"Files merged successfully into '{output_file}'")
    except Exception as e:
        print(f"An error occurred: {e}")
files_to_merge = ["FileHandling/Q3.py", "any.txt", "PythonModules/glob.txt"]
output = "FileHandling/merged_file.txt"
merge_files(files_to_merge, output)