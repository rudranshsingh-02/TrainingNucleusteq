class CharIterable:
    def __init__(self, text):
        self.text = text

    def __iter__(self):
        self.index = 0
        return self

    def __next__(self):
        if self.index >= len(self.text):
            raise StopIteration
        char = self.text[self.index]
        self.index += 1
        return char

s = CharIterable("Hello")
for char in s:
    print(char)
