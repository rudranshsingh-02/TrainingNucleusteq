# 5. Define a function to count the number of vowels in a given string.

def remove_duplicates(s):
    new_s = ""
    for char in s:
        if char not in new_s:
            new_s += char
    return new_s

def count_vowels(s):
    count = 0
    vowels = 'aeiouAEIOU'
    for char in s:
        if char in vowels:
            count += 1
    return count

s = input("Enter the String: ")
modified_s = remove_duplicates(s)
vowel_count = count_vowels(modified_s)
print("Number of vowels in the string:", vowel_count)
