def count_char_frequency(file_path):
    try:
        with open(file_path, 'r') as file:
            text = file.read()
            freq = {}
            for char in text:
                freq[char] = freq.get(char, 0) + 1
            for char, count in freq.items():
                print(f"'{char}': {count}")
    except FileNotFoundError:
        print("File not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

count_char_frequency("FileHandling/sample.txt")
