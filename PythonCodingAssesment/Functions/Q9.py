# 9. Write a function that flattens a nested list using recursion.

def flatten_list(nested_list):
    flat_list = []
    for item in nested_list:
        if isinstance(item, list):
            flat_list.extend(flatten_list(item)) 
        else:
            flat_list.append(item)  
    return flat_list

lists = [1,2,[3,3,4,5]]
print(flatten_list(lists))
