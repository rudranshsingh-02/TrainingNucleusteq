# 4. Create a function that counts the frequency of each word in a list.

def count_frequency(word_list):
    frequency = {}
    for word in word_list:
        if word in frequency:
            frequency[word] += 1
        else:
            frequency[word] = 1
    return frequency

words = ["apple", "banana", "apple", "orange", "banana", "apple"]
print("Word Frequency:", count_frequency(words))
