# 8. Write a function to find the intersection of two lists.

def find_intersection(list1, list2):
    intersection = []
    for item in list1:
        if item in list2 and item not in intersection:
            intersection.append(item)
    return intersection

list1 = [1,2,3,4,5]
list2 = [5,4,5,79,2,1]
print(find_intersection(list1,list2))