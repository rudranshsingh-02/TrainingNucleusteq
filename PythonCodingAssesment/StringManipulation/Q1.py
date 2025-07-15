# 1. Write a function that capitalizes the first letter of each word in a string.

def capitalize_words(s):
    return ' '.join(word.capitalize() for word in s.split())

print(capitalize_words("hello world"))