# 3. Develop a function that removes duplicate elements from a list.

def remove_duplicates(lst):
    new = []
    for item in lst:
        if item not in new:
            new.append(item)
    return new
    
old_list = [1, 2, 2, 3, 4, 4, 5, 1]
new_list = remove_duplicates(old_list)

print("Original:", old_list)
print("Without duplicates:", new_list)
