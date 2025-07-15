words = ["level", "world", "radar", "python", "madam", "openai"]
palindromes = (word for word in words if word == word[::-1])

for word in palindromes:
    print(word)
