# 2. Define a function that checks whether a string is a palindrome.

def is_palindrome(s):
    return s == s[::-1] # reverse string to match with original
    
string = input("Enter a string : ")
if(is_palindrome(string)):
    print("This string is a palindrome.")
else:
    print("This string is not a palindrome.")
