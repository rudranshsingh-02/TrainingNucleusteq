# 3. Write a function that replaces all vowels in a string with '*' symbol.

def replace_vowels(text):
    vowels = "aeiouAEIOU"
    result = ""

    for char in text:
        if char in vowels:
            result += '*'
        else:
            result += char

    return result

print(replace_vowels("hello"))