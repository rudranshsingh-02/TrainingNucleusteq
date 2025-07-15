# 4. Develop a function that counts words, characters, and lines in a string.

def count(text):
    lines = text.split('\n')
    words = text.split()
    characters = len(text)

    return {
        "lines": len(lines),
        "words": len(words),
        "characters": characters
    }

text = """Hello world
My name is rudransh
"""
print(count(text))