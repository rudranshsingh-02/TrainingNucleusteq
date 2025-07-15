def read_lines(file_path):
    try:
        with open(file_path, 'r') as file:
            for line in file:
                yield line.strip()
    except FileNotFoundError:
        print("File not found.")

for line in read_lines("FileHandling/sample.txt"):
    print(line)
