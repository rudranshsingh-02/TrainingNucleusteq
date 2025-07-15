# 2. Write a function to merge two dictionaries.

def merge_dictionaries(dict1, dict2):
    merged = {}
    for key in dictionary1:
        merged[key] = dictionary1[key]
    for key in dictionary2:
        merged[key] = dictionary2[key]
    return merged

dictionary1 = {"name": "Alice", "age": 25}
dictionary2 = {"age": 30, "city": "New York"}

merged_dictionary = merge_dictionaries(dictionary1, dictionary2)
print("Merged Dictionary:", merged_dictionary)
