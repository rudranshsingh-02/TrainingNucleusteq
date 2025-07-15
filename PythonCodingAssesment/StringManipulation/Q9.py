def palindrome(s):
    return s == s[::-1]

def longest_palindromic_substring(text):
    n = len(text)
    longest = ""

    for i in range(n):
        for j in range(i + 1, n + 1):
            substr = text[i:j]
            if palindrome(substr) and len(substr) > len(longest):
                longest = substr

    return longest

print(longest_palindromic_substring("hhmadamhssa"))