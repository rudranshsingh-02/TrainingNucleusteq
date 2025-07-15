# 7. Write a script that encodes a string using Caesar cipher.

def caesar_cipher(text, shift):
    result = ""

    for char in text:
        if char >= 'a' and char <= 'z':
            new_char = chr((ord(char) - ord('a') + shift) % 26 + ord('a'))
            result += new_char
        elif char >= 'A' and char <= 'Z':
            new_char = chr((ord(char) - ord('A') + shift) % 26 + ord('A'))
            result += new_char
        else:
            result += char  

    return result

print(caesar_cipher("helloabc", 1))