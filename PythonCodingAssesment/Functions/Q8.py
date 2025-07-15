# 8. Implement a function that uses variable-length arguments to sum any number of inputs.

def find_max(*args):
    if not args:
        return "No values provided"
    max= args[0]
    for num in args[1:]:
        if num > max:
            max = num
    return max

print(find_max(3, 7, 2, 10, 6))   
print(find_max(1))             
print(find_max())   