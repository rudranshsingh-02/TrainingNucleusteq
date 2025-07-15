from contextlib import contextmanager

@contextmanager
def managed_file(file_path, mode):
    try:
        f = open(file_path, mode)
        yield f
    finally:
        f.close()
        print("File closed.")

with managed_file("FileHandling/sample.txt", "r") as file:
    print(file.read())
