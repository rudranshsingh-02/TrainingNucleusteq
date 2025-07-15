class FileManager:
    def __init__(self, file_path, mode):
        self.file_path = file_path
        self.mode = mode
        self.file = None

    def __enter__(self):
        try:
            self.file = open(self.file_path, self.mode)
            return self.file
        except Exception as e:
            print(f"Failed to open file: {e}")
            return None

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
            print("File closed.")
        if exc_type:
            print(f"An exception occurred: {exc_val}")
        return True  # suppress exceptions

with FileManager("FileHandling/sample.txt", "r") as f:
    if f:
        print(f.read())
