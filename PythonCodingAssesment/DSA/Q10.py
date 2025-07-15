def is_palindrome(lst):
    if lst == lst[::-1]:
        return "Is a palindrome"
    else:
        return "Not a palindrome"

print(is_palindrome([1, 2, 3, 2, 1]))    
print(is_palindrome([1, 2, 3, 4, 5]))     
print(is_palindrome(['a', 'b', 'b', 'a'])) 