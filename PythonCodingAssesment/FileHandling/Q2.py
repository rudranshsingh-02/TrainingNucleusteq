# 2. Create a function to count the number of words in a text file.

def count_words(path):
    try:
        with open(path, 'r') as file:
            text = file.read()
            words = text.split()
            word_count = len(words)
            print(f"Total number of words: {word_count}")
    except FileNotFoundError:
        print("File not found. Incorrect path")
    except Exception as e:
        print(f"An error occurred: {e}")
path = "PythonModules/glob.txt"
count_words(path)