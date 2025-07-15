def read_lines(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line

def strip_lines(lines):
    return (line.strip() for line in lines)

def filter_non_empty(lines):
    return (line for line in lines if line)

def to_upper(lines):
    return (line.upper() for line in lines)

lines = read_lines("FileHandling/sample.txt")
stripped = strip_lines(lines)
non_empty = filter_non_empty(stripped)
uppercased = to_upper(non_empty)

for line in uppercased:
    print(line)
