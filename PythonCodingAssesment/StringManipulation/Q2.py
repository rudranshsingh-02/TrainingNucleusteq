# 2. Create a program that finds all substrings of a given string.

def all_substrings(s):
    substrings = []
    n = len(s)

    for i in range(n):
        for j in range(i + 1, n + 1):
            sub = s[i:j]
            if ' ' not in sub: 
                substrings.append(sub)
    return substrings

print(all_substrings("hello world"))